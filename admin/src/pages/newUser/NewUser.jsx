import { useState } from "react";
import "./newUser.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function NewUser() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const changeValue = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = credentials;
    if (!password || !username || !email) {
      toast.error("Không được bỏ trống ô nào cả nha!", toastOptions);
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
      if (data.status === false) return toast.error(`Lỗi`, toastOptions);
      if (data.status === true) {
        toast.success(`Tạo Thành Công`, toastOptions);
        setCredentials({
          username: "",
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
      <div className="newUser">
        <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Username</label>
            <input
              type="text"
              value={credentials.username}
              name="username"
              placeholder="UserName"
              onChange={changeValue}
            />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input
              type="email"
              value={credentials.email}
              name="email"
              placeholder="Email"
              onChange={changeValue}
            />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              name="password"
              placeholder="Password"
              onChange={changeValue}
            />
          </div>
          <button className="newUserButton" onClick={handleSubmit}>
            Tạo
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
