import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./config/passport";
import { connectToDB } from "./config/db";
import propertyRoutes from "./routers/property-router";
import agentRoutes from "./routers/agent-routers";
import bannerRoutes from "./routers/banner-router";


import { authMiddleware } from "./helpers/validation/auth-middleware";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5005;

// Connect to MongoDB
connectToDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use("/api/agent", agentRoutes);
app.use("/api/property", authMiddleware, propertyRoutes);
app.use("/api", bannerRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
