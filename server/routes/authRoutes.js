import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email: email.toLowerCase(), password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    let { email } = req.body;
    console.log(email.email,' hey backend ',email.password)
    let password = email.password;
    email = email.email;
    console.log(email,' hey backend i',password)

    if (!email || !password) {
      console.log("No email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password doesn't match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // res.json({ token, user: { id: user._id, email: user.email } });
    // console.log("User logged in");
     // Generate token
     const token = jwt.sign(
      { id: user._id, role: user.role }, // Include role in the token payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response with user details (including role)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role, // Ensure role is included
      },
    });

    console.log("User logged in successfully:", user.email, "Role:", user.role);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Current User (Protected)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
