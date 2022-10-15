import User from "../model/User.js";

export const UpdateUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
};

export const DeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json(deleteUser);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id);
    const { password, ...more } = getUser._doc;
    res.status(200).json({ ...more });
  } catch (err) {
    next(err);
  }
};

export const getAllUser = async (req, res, next) => {
  if (req.user.isAdmin) {
    const queryNew = req.query.new;
    try {
      let user;
      if (queryNew) {
        user = await User.find().sort({ createdAt: -1 }).limit(5);
      } else {
        user = await User.find();
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
};

export const getUserStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
