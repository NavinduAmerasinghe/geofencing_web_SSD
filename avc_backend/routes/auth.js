const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  logout,
  singleUser,
  userProfile,
  allUsers,
} = require("../controllers/auth");
const { isAuthenticated } = require("../middleware/auth");
const rateLimit = require("express-rate-limit");

// Set up rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 4, // Max 5 requests per windowMs
  message: "Too many login attempts from this IP, please try again later.",
});

router.post("/signup", signup);
router.post("/signin", limiter, signin);
router.get("/logout", logout);
router.get("/getme", isAuthenticated, userProfile);
router.get("/user/:id", singleUser);
router.get("/users", allUsers);

module.exports = router;
