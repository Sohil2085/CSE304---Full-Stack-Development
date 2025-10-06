import express from "express";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://sohil:sohil123@cluster0.p6lpjqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Prevent buffering requests when DB is down; fail fast instead
mongoose.set("bufferCommands", false);

let isDbConnected = false;

// Mongo connection
mongoose.connect(MONGO_URI).then(() => {
  isDbConnected = true;
  console.log("✅ MongoDB connected");
}).catch(err => {
  isDbConnected = false;
  console.error("❌ MongoDB connection error", err);
});

mongoose.connection.on("disconnected", () => {
  isDbConnected = false;
  console.error("⚠️ MongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  isDbConnected = true;
  console.log("✅ MongoDB reconnected");
});

// Session model
const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, index: true, required: true },
  name: { type: String, required: true },
  loginTime: { type: Date, required: true },
  loginTimeStr: { type: String },
  logoutTime: { type: Date },
  logoutTimeStr: { type: String }
}, { timestamps: true });

const SessionModel = mongoose.model("Session", sessionSchema);

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

function formatTimeHHmm(date) {
  try {
    return new Date(date).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  } catch (_) {
    return "";
  }
}

// Login route
app.post("/api/login", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ msg: "Name is required" });

  const loginTime = new Date();
  const loginTimeStr = formatTimeHHmm(loginTime);
  req.session.user = { name, loginTime, loginTimeStr };

  if (isDbConnected) {
    try {
      // Upsert session document keyed by session id
      await SessionModel.findOneAndUpdate(
        { sessionId: req.sessionID },
        { sessionId: req.sessionID, name, loginTime, loginTimeStr, $unset: { logoutTime: 1, logoutTimeStr: 1 } },
        { upsert: true, new: true }
      );
    } catch (e) {
      console.error("Failed to persist login session:", e);
    }
  }

  res.json({ msg: "Login successful", user: req.session.user });
});

// Profile route
app.get("/api/profile", (req, res) => {
  if (!req.session.user) return res.status(401).json({ msg: "Not logged in" });
  res.json(req.session.user);
});

// Logout route
app.post("/api/logout", async (req, res) => {
  const sessionId = req.sessionID;
  if (isDbConnected) {
    try {
      const logoutTime = new Date();
      const logoutTimeStr = formatTimeHHmm(logoutTime);
      await SessionModel.findOneAndUpdate(
        { sessionId },
        { logoutTime, logoutTimeStr },
        { new: true }
      );
    } catch (e) {
      console.error("Failed to persist logout time:", e);
    }
  }

  req.session.destroy(err => {
    if (err) return res.status(500).json({ msg: "Error logging out" });
    res.clearCookie("connect.sid");
    res.json({ msg: "Logged out successfully" });
  });
});

app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
