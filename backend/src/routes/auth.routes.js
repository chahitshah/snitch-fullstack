import {Router} from "express"
import {registerUserRules,loginUserRules} from "../validator/auth.validator.js"
import { registeruser,loginuser, googleCallback } from "../controllers/auth.controller.js"
import passport from 'passport'; 
const router = Router()

router.post("/register",registerUserRules,registeruser)
router.post("/login",loginUserRules,loginuser)

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
//   (req, res) => {
//     // Generate a JWT for the authenticated user
//     const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     // Send the token to the client
//     res.json({ token });
//   }
googleCallback
);

export default router