const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User Not Found!" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Password" });
    }
    req.session.userID = user._id;
    res.status(200).redirect("/users/dashboard");
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(400).json({
      status: "failed",
      error: err.message,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const courses = await Course.find({ user: req.session.userID });
  const categories = await Category.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
  });
};
