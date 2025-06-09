const user = require("../Models/userModels");

module.exports = async (req, res, next) => {
  try {
    const user = await user.findById(req.user.id);
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};
