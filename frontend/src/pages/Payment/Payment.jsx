import React, { useEffect, useState } from "react";
import "./payment.scss";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reloadData } from "../../redux/cartRedux";

export const Payment = () => {
  const [infoUser, setInfoUser] = useState({
    username: null,
    phoneNumber: null,
    address: null,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = location.state.currentUser.data._id;
  const products = location.state.products;
  const total = location.state.total;

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

  const changeValue = (e) => {
    setInfoUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const ValidateForm = () => {
    const { username, phoneNumber, address } = infoUser;
    if (!username & !phoneNumber || !address) {
      toast.error("Không được bỏ trống ô nào cả nha!", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ValidateForm()) {
      const { data } = await axios.post("/orders", {
        userId,
        username: infoUser.username,
        phoneNumber: infoUser.phoneNumber,
        products,
        amount: total,
        address: infoUser.address,
      });
      if (data.status === true) {
        toast.success(data.msg, toastOptions);
        setTimeout(() => {
          dispatch(reloadData());
          navigate("/");
        }, 2000);
      } else {
        toast.error("Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      <div className="payment">
        <form>
          <div className="paymentTitle">
            <h1>Thanh Toán</h1>
            <div className="subTitle">Tổng của bạn là ${total}</div>
          </div>
          <input
            type="text"
            placeholder="Họ tên của bạn"
            name="username"
            id="username"
            onChange={changeValue}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            name="phoneNumber"
            id="phoneNumber"
            onChange={changeValue}
          />
          <input
            type="text"
            placeholder="Địa chỉ nhận hàng"
            name="address"
            id="address"
            onChange={changeValue}
          />
          <button type="submit" onClick={handleSubmit}>
            Hoàn Tất
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
