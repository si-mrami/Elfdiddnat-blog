import User from "../Modules/users.js";

// sign up controller

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // checker data
    if (!username || !email || !password) {
      res
        .status(200)
        .json({ status: "ERROR", message: "All fields are required" });
    }
    // check password length
    if (password.length < 6) {
      res.status(200).json({
        status: "ERROR",
        message: "Password must be at least 6 characters",
      });
    }
    // check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(200).json({
        status: "ERROR",
        message: "User already exists",
      });
    }
    // create user
    const user = await User.create({
      username,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        status: "OK",
        message: "User created successfully",
      });
    } else {
      res.status(200).json({
        status: "ERROR",
        message: "Failed to create user",
      });
    }
  } catch (err) {
    next(err);
  }
};

// sign in controller
export const signin = async (req, res, next) => {};
