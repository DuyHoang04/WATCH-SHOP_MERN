import React from "react";
import "./cartItem.scss";
import { HighlightOff } from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reloadData } from "../../redux/cartRedux";
import { selectCurrentUser } from "../../redux/userRedux";

const CartItem = ({ product, path }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser.data._id;
  console.log(path);

  const handleDeleteItem = async () => {
    if (currentUser) {
      const res = await axios.post("carts/deleteItem", {
        userId,
        IdCartItem: product._id,
      });
      console.log(res);
      if (res.status === 200) {
        dispatch(reloadData());
      }
    }
  };

  return (
    <div className="cartItem">
      <img src={product?.image} alt="" className="cartItem__img" />
      <div className="cartItem__info">
        <div className="cartItem__info--name">{product?.name}</div>
        <div className="cart__info-total">
          <span className="qty">{product?.quantity}</span> x{" "}
          <span className="price">${product?.price}</span>
        </div>
      </div>
      {path === "thanhtoan" ? (
        <></>
      ) : (
        <div className="cartItem__remove" onClick={handleDeleteItem}>
          <HighlightOff />
        </div>
      )}
    </div>
  );
};

export default CartItem;
