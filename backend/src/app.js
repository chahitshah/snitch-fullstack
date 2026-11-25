import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from "./config/config.js";

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
  // For this example, we'll just return the profile
  return done(null, profile);
}));



app.use(
  cors({
    origin: "http://localhost:5173", // Must be your exact frontend URL (cannot use "*" when credentials is true)
    credentials: true, // Allows cookies (your JWT token) to be sent & received
  })
);

app.use("/api/auth",authRoutes)


export default app