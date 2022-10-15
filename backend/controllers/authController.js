import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    // const newUser = new User({
    //   username,
    //   password,
    // });
    // const user = newUser.save();
    // res.json({ status: true, msg: "Đăng kí thành công" });
    const userCheck = await User.findOne({ username });
    if (userCheck)
      return res.json({ status: false, msg: "Tài khoản đã tồn tại" });
    const user = await User.create({
      username,
      email,
      password,
    });
    return res.json({ status: true, msg: "Đăng kí thành công" });
  } catch (err) {
    next(err);
  }
};

export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user &&
      res
        .status(401)
        .json({ msg: "Mật khẩu hoặc Tài khoản không tồn tại", status: false });
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !passwordCheck &&
      res
        .status(401)
        .json({ msg: "Mật khẩu hoặc Tài khoản không tồn tại", status: false });
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      {
        expiresIn: "7d",
      }
    );
    const { password, ...more } = user._doc;
    return res.json({
      msg: "Đăng nhập thành công",
      status: true,
      ...more,
      token,
    });
  } catch (err) {
    next(err);
  }
};
