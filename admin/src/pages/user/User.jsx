import "./user.css";
import {
  CalendarToday,
  LineAxisOutlined,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { reLoadData, selectLoadData } from "../../redux/loadDataRedux.js";
import { Avatar } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User() {
  const [infoUser, setInfoUser] = useState([]);
  const [updateData, setUpdateData] = useState({
    username: "",
    email: "",
  });
  const loadData = useSelector(selectLoadData);
  const dispatch = useDispatch();
  const userId = useLocation().state;
  const token = localStorage.getItem("token");

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const getInfoUser = async () => {
      const { data } = await axios.get(`/users/find/${userId}`, {
        headers: { token: `Bearer ${token}` },
      });
      setInfoUser(data);
    };
    getInfoUser();
  }, [loadData]);

  const changeValue = (e) => {
    setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { username, email } = updateData;
    const res = await axios.put(
      `/users/${userId}`,
      {
        username,
        email,
      },
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    if (res.status === 200) {
      dispatch(reLoadData());
      setUpdateData({ username: "", email: "" });
      toast.success("Update Thành Công", toastOptions);
    }
  };

  return (
    <>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <button className="BtnUserUpdate" onClick={handleUpdate}>
            Update
          </button>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <Avatar />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{infoUser.username}</span>
                <span className="userShowUserTitle">Software Engineer</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{infoUser.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">01.01.1999</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">0123456789</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{infoUser.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">Việt Nam</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên Đăng Nhập</label>
                  <input
                    type="text"
                    name="username"
                    value={updateData.username}
                    placeholder={infoUser.username}
                    className="userUpdateInput"
                    onChange={changeValue}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={updateData.email}
                    placeholder={infoUser.email}
                    className="userUpdateInput"
                    onChange={changeValue}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
