import React, { useState, useEffect } from "react";
import "./cartContainer.scss";
import { ArrowBack, RemoveRedEye } from "@mui/icons-material";
import axios from "axios";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import EmptyImg from "../../img/emptyCart.svg";
import CartItem from "../CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { showCart, reloadData } from "../../redux/cartRedux";
import { selectCurrentUser } from "../../redux/userRedux";
import { useLocation, useNavigate } from "react-router-dom";

const CartContainer = ({ products }) => {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser.data._id;
  const { pathname } = useLocation();
  const newPath = pathname.slice(1, 10);

  const DeleteAll = async () => {
    const res = await axios.post(`carts/deleteAllItem/${userId}`);
    if (res.status === 200) {
      dispatch(reloadData());
    }
  };

  // GET TỔNG GIÁ VÀ LENGTH CART
  useEffect(() => {
    let totalPrice = products.reduce(function (accumulator, item) {
      return accumulator + item.quantity * item.price;
    }, 0);
    setTotal(totalPrice);
  }, [products]);

  const handleCartShow = () => {
    dispatch(showCart({ cartShow: false }));
  };

  const handlePayment = () => {
    navigate(`/thanhtoan/${currentUser?.data?._id}`, {
      state: {
        currentUser,
        products,
        total,
      },
    });
    dispatch(showCart({ cartShow: false }));
  };

  return (
    <>
      <motion.div
        className="cart__container"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
      >
        <div className="cart__container-top">
          <IconButton className="icon" onClick={handleCartShow}>
            <ArrowBack />
          </IconButton>
          {newPath === "thanhtoan" ? (
            <></>
          ) : (
            <>
              <p>Giỏ Hàng</p>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="clear-cart"
                onClick={DeleteAll}
              >
                Xóa hết <RemoveRedEye />
              </motion.button>
            </>
          )}
        </div>
        {products && products.length > 0 ? (
          <div className="cart-container-products">
            <div className="cart-item">
              {products.map((product, index) => (
                <CartItem key={index} product={product} path={newPath} />
              ))}
            </div>
            <div className="cart__container--payment">
              <div className="payment-info">
                <p className="title">Giá</p>
                <p className="price">${total}</p>
              </div>
              <div className="payment-info">
                <p className="title">Tiền Ship</p>
                <p className="price">Free</p>
              </div>
              <div className="divider"></div>
              <div className="payment-total">
                <div className="total-info">
                  <p className="title">Tổng</p>
                  <p className="price">$ {total}</p>
                </div>
                {newPath === "thanhtoan" ? (
                  <></>
                ) : (
                  <motion.button
                    className="btn-cart"
                    whileTap={{ scale: 0.8 }}
                    type="button"
                    onClick={handlePayment}
                  >
                    Thanh Toán
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="cart__container-empty">
            <img src={EmptyImg} alt="" className="empty-img" />
            <p className="empty-desc">Hãy thêm vài sản phẩm</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartContainer;
