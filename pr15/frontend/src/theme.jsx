import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => {
		const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
		if (saved === "light" || saved === "dark") return saved;
		if (typeof window !== "undefined") {
			return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		return "light";
	});

	useEffect(() => {
		const root = document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	const value = useMemo(() => ({
		theme,
		toggleTheme: () => setTheme(prev => (prev === "dark" ? "light" : "dark"))
	}), [theme]);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}


