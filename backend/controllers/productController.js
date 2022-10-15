import Product from "../model/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const saveProduct = await product.save();
    res.status(200).json(saveProduct);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).send("DELETE THANH CONG");
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getProduct = await Product.findById(id);
    res.status(200).json(getProduct);
  } catch (err) {
    next(err);
  }
};

export const getAllProduct = async (req, res, next) => {
  const queryNew = req.query.new;
  const queryTag = req.query.tag;
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryTag) {
      products = await Product.find({
        tag: {
          $in: [queryTag],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
