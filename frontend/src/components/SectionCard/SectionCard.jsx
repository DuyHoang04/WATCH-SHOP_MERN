import React, { useState } from "react";
import "./sectionCard.scss";
import { Favorite, ArrowForward } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reloadData, showCart } from "../../redux/cartRedux";
import axios from "axios";
import { selectCurrentUser } from "../../redux/userRedux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SectionCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showBtnCart, setShowBtnCart] = useState(false);
  const [load, setLoad] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.data?._id;

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleAddCart = async () => {
    if (currentUser) {
      setLoad(true);
      const res = await axios.post("/carts", {
        userId,
        product: { ...product, quantity: 1 },
      });
      if (res.status === 200) {
        dispatch(reloadData());
        setLoad(false);
        setShowBtnCart(true);
      }
    } else return toast.error("Vui Lòng Đăng Nhập", toastOptions);
  };

  const handleShowCart = () => {
    dispatch(showCart({ cartShow: true }));
  };

  return (
    <div>
      <div className="section-card">
        <Link to="/sanpham" state={product}>
          <div className="card-img">
            <img src={product?.image} alt="" />
            <div className="favorite">
              <Favorite />
            </div>
          </div>
        </Link>
        <div className="info">
          <div className="info-name">{product?.name}</div>
          <div className="info-price">
            <span>$</span> {product?.price}
          </div>
          <>
            {showBtnCart ? (
              <button className="btn-cart" onClick={handleShowCart}>
                Xem Giỏ Hàng <ArrowForward />
              </button>
            ) : (
              <>
                {load ? (
                  <CircularProgress sx={{ color: "#a07a61" }} />
                ) : (
                  <button className="info-btn" onClick={handleAddCart}>
                    Thêm vào giỏ
                  </button>
                )}
              </>
            )}
          </>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
