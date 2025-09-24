import express from "express";
import session from "express-session";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Setup session
app.use(session({
  secret: "mysecretkey123",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true only with HTTPS
}));

// Login route
app.post("/api/login", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ msg: "Name is required" });

  req.session.user = { name, loginTime: new Date() };
  res.json({ msg: "Login successful", user: req.session.user });
});

// Profile route
app.get("/api/profile", (req, res) => {
  if (!req.session.user) return res.status(401).json({ msg: "Not logged in" });
  res.json(req.session.user);
});

// Logout route
app.post("/api/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ msg: "Error logging out" });
    res.clearCookie("connect.sid");
    res.json({ msg: "Logged out successfully" });
  });
});

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
