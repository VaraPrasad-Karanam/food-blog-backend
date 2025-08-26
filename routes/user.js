// backend/routes/user.js
const express = require("express");
const router = express.Router();
const { userLogin, userSignUp, getUser } = require("../controller/user");
const verifyToken = require("../middleware/verifyToken");

router.post("/signUp", userSignUp);
router.post("/login", userLogin);
router.get("/user/:id", verifyToken, getUser); // ✅ protected route

module.exports = router;
