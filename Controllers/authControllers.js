const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
    const register = async (req, res, next) => {
      try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: "User already exists" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          name,
          email,
          password: hashedPassword,
        });

        await user.save();

        const userToReturn = {
          name: user.name,
          email: user.email,
          _id: user._id,
          role: user.role,
        };

        res
          .status(201)
          .json({ message: "User created successfully", user: userToReturn });
        next();
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
    };
    return res.status(500).json({ message: error.message });
  }
};
