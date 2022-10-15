import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  isAuthPage,
  loginError,
  loginSuccess,
  selectCurrentUser,
} from "../../redux/userRedux";

export const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: null,
    password: null,
  });
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(isAuthPage({ isAuth: true }));
    if (token && currentUser) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const ValidateForm = () => {
    const { password, username } = credentials;
    if (!password & !username) {
      toast.error("Không được bỏ trống ô nào cả nha!", toastOptions);
    } else if (!username) {
      toast.error("Phải có UserName vs Password", toastOptions);
      return false;
    } else if (!password) {
      toast.error("Phải có UserName vs Password", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ValidateForm()) {
      try {
        const { data } = await axios.post("/auth/login", credentials);
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem("token", data.token);
          dispatch(isAuthPage({ isAuth: false }));
          navigate("/");
        } else {
          toast.error("Please try again.", toastOptions);
        }
        dispatch(loginSuccess({ data }));
      } catch (err) {
        dispatch(loginError());
      }
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="Login">
        <form>
          <div className="brand">
            <h1>Đăng nhập</h1>
          </div>
          <input
            type="text"
            placeholder="UserName"
            name="username"
            id="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
          <span>
            Do not have an account ? <Link to="/dangki">Đăng kí</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
