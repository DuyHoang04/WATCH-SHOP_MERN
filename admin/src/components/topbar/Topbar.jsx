import React from "react";
import "./topbar.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut, selectCurrentUser } from "../../redux/userRedux";
import { isAuthPage } from "../../redux/loadDataRedux";

export default function Topbar() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
    localStorage.clear();
    navigate("/dangnhap");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          {currentUser && <button onClick={handleLogOut}>Đăng xuất</button>}
        </div>
      </div>
    </div>
  );
}
