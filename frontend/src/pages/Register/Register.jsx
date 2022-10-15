import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     navigate("/");
  //   }
  // }, []);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = credentials;
    if (!password || !confirmPassword || !username || !email) {
      toast.error("Không được bỏ trống ô nào cả nha!", toastOptions);
    } else if (password !== confirmPassword) {
      toast.error(
        "Mật khẩu với xác nhận mật khẩu không giống nhau",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error("UserName không được it hơn 3 kí tự", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password phải có hơn 8 kí tự", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = credentials;
      const { data } = await axios.post(`/auth/register`, {
        username,
        email,
        password,
      });
      if (data.status === false)
        return toast.error(`${data.msg}`, toastOptions);
      if (data.status === true) {
        toast.success(`${data.msg}`, toastOptions);
        setTimeout(() => {
          navigate("/dangnhap");
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="Register">
        <form>
          <div className="brand">
            <h1>Đăng kí</h1>
          </div>
          <input
            type="text"
            placeholder="UserName"
            name="username"
            id="username"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            id="confirmPassword"
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Create User
          </button>
          <span>
            Already have an account ? <Link to="/dangnhap">Đăng nhập</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
