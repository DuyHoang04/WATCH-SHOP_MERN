import React, { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import "./details.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reloadData } from "../../redux/cartRedux";
import { selectCurrentUser } from "../../redux/userRedux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Details = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.data?._id;
  const product = location.state;

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const setAmount = (action) => {
    if (action === "plus") {
      setQuantity(quantity + 1);
    }
    if (action === "minus") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const changeValue = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddCart = async () => {
    if (currentUser) {
      const res = await axios.post("/carts", {
        userId,
        product: { ...product, quantity },
      });
      if (res.status === 200) {
        dispatch(reloadData({}));
      }
    } else return toast.error("Vui Lòng Đăng Nhập", toastOptions);
  };

  return (
    <>
      <div className="details">
        <div className="details__img">
          <img src={product?.image} alt="" />
        </div>
        <div className="details__info">
          <div className="details__info--name">{product?.name}</div>
          <div className="details__info--divider"></div>
          <div className="details__info--price">
            <span>$</span>
            {product?.price}
          </div>
          <div className="details__info--desc">{product?.desc}</div>
          <ul className="details__info--stock">
            <li>Categories: Butter & Eggs, Cultured Butter</li>
            <li>Tag: {product?.tag}</li>
          </ul>
          <div className="details__info--cart">
            <div className="cart-form">
              <button className="icon" onClick={(e) => setAmount("minus")}>
                <Remove />
              </button>
              <input type="number" value={quantity} onChange={changeValue} />
              <button className="icon" onClick={(e) => setAmount("plus")}>
                <Add />
              </button>
            </div>
            <button className="add-cart" onClick={handleAddCart}>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
