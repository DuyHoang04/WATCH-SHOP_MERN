import Cart from "../model/Cart.js";
import User from "../model/User.js";

export const CreateCart = async (req, res, next) => {
  try {
    const { userId, product } = req.body;
    const cartUser = await Cart.findOne({ userId });
    if (cartUser) {
      const { products } = cartUser;
      const productAlready = products.find(({ _id }) => _id === product._id);
      if (!productAlready) {
        const newCart = await Cart.findByIdAndUpdate(
          cartUser._id,
          {
            products: [...products, product],
          },
          { new: true }
        );
        return res.status(200).json(newCart);
      } else {
        cartUser.update(
          {
            "products._id": productAlready._id,
          },
          {
            $set: {
              "products.$.quantity": parseFloat(
                (productAlready.quantity += parseFloat(product.quantity))
              ),
            },
          }
        );
        const newCart = await Cart.findByIdAndUpdate(cartUser._id, {
          $set: cartUser,
        });
        return res.status(200).json(newCart);
      }
    } else {
      const cart = await Cart.create({
        userId,
        products: product,
      });
      return res.status(200).json(cart);
    }
  } catch (err) {
    next(err);
  }
};

export const updateCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    next(err);
  }
};

export const deleteAll = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cartUser = await Cart.findOne({ userId });
    if (cartUser) {
      await Cart.findByIdAndUpdate(cartUser._id, {
        products: [],
      });
      return res.status(200).json("Cart deleted successfully");
    } else return res.status(404).json("User not found");
  } catch (err) {
    next(err);
  }
};

export const getCartUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

export const getAllCart = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    next(err);
  }
};

export const DeleteItemCart = async (req, res, next) => {
  try {
    const { userId, IdCartItem } = req.body;
    const cartUser = await Cart.findOne({ userId });
    if (cartUser) {
      const { products } = cartUser;
      const ProductIndex = products.findIndex(({ _id }) => _id === IdCartItem);
      if (!ProductIndex && ProductIndex < 0) {
        return res.status(400).json({ msg: "Product not found!" });
      }
      products.splice(ProductIndex, 1);
      const newCartUser = await Cart.findByIdAndUpdate(
        cartUser._id,
        {
          products: products,
        },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json({ msg: "Product deleted successfully!", newCartUser });
    } else return res.status(404).json({ msg: "User not found!" });
  } catch (err) {
    res.status(500).json(err);
  }
};
