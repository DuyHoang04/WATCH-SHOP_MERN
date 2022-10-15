import Order from "../model/Order.js";
import Cart from "../model/Cart.js";

export const CreateOrder = async (req, res, next) => {
  console.log(req.body);
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    const CartUpdate = await Cart.findOneAndUpdate(req.body.userId, {
      products: [],
    });
    res
      .status(200)
      .json({ status: true, msg: "Thanh Toán Thành Công", saveOrder });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json("Order đã deleted...");
  } catch (err) {
    next(err);
  }
};

export const getOrderUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const order = await Order.findOne({ userId });
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const getAllOrder = async (req, res, next) => {
  const queryNew = req.query.new;
  console.log(queryNew);
  try {
    let orders;
    if (queryNew) {
      orders = await Order.find().sort({ createdAt: -1 }).limit(5);
    } else {
      orders = await Order.find();
    }
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const getMonthLyInCome = async (req, res, next) => {
  // số lượng hàng bán ra trong tháng
  const productId = req.query.id;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { _id: productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
