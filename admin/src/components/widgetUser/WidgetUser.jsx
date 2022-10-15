import React, { useState, useEffect } from "react";
import "./widgetUser.css";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { Avatar } from "@mui/material";

export default function WidgetUser() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get("users/?new=true", {
          headers: { token: `Bearer ${token}` },
        });
        setUsers(data);
      } catch {}
    };
    getUsers();
  }, []);

  return (
    <div className="widgetUser">
      <span className="widgetUserTitle">Người Dùng Mới</span>
      <ul className="widgetUserList">
        {users.map((user, index) => (
          <li className="widgetUserListItem" key={index}>
            <Avatar />
            <div className="widgetUserInfo">
              <span className="widgetUserInfoName">{user.username}</span>
              <span className="widgetUserInfoTitle">Software Engineer</span>
            </div>
            <button className="widgetUserButton">
              <Visibility className="widgetUserIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
