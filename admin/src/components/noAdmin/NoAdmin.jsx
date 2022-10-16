import React from "react";
import "./noAdmin.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAuthPage } from "../../redux/loadDataRedux";

export const NoAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(isAuthPage({ isAuth: true }));
    navigate("/dangnhap");
  };

  return (
    <div className="login">
      <div>Là Admin Thì Hãy Đăng Nhập Không Thì Mời Rời Khỏi</div>
      <button onClick={handleLogin}>Đăng Nhập</button>
    </div>
  );
};
