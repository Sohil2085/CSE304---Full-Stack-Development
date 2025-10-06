import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToasterProvider/>");
  return ctx;
}

let idCounter = 0;

export function ToasterProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((message, options = {}) => {
    const id = ++idCounter;
    const toast = {
      id,
      message,
      type: options.type || "info",
      duration: options.duration ?? 2500,
    };
    setToasts((prev) => [...prev, toast]);
    if (toast.duration > 0) {
      setTimeout(() => remove(id), toast.duration);
    }
    return id;
  }, [remove]);

  const value = useMemo(() => ({ show, remove }), [show, remove]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              `min-w-64 max-w-96 px-4 py-3 rounded-lg shadow-lg border text-sm flex items-start gap-3 ` +
              (t.type === "success"
                ? "bg-emerald-600 text-white border-emerald-500"
                : t.type === "error"
                ? "bg-rose-600 text-white border-rose-500"
                : t.type === "warning"
                ? "bg-amber-600 text-white border-amber-500"
                : "bg-slate-800 text-white border-slate-700")
            }
            role="status"
          >
            <span className="font-medium">{t.type.toUpperCase()}</span>
            <span className="opacity-90">{t.message}</span>
            <button
              onClick={() => remove(t.id)}
              className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded hover:bg-black/10"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}


