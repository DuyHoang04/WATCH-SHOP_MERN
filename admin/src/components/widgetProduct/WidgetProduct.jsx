import React, { useState, useEffect } from "react";
import "./widgetProduct.css";
import axios from "axios";
import { format } from "timeago.js";
import { Avatar } from "@mui/material";

export default function WidgetProduct() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get("orders?new=true", {
          headers: { token: `Bearer ${token}` },
        });
        setOrders(data);
      } catch {}
    };
    getOrders();
  }, []);

  return (
    <div className="widgetProduct">
      <h3 className="widgetProductTitle">Giao Dịch Mới</h3>
      <table className="widgetProductTable">
        <thead>
          <tr className="widgetProductTr">
            <th className="widgetProductTh">Khách Hàng</th>
            <th className="widgetProductTh">Ngày</th>
            <th className="widgetProductTh">Tổng</th>
            <th className="widgetProductTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr className="widgetProductTr" key={index}>
              <td className="widgetProductUser">
                <Avatar />
                <span className="widgetProductName">{orders?.username}</span>
              </td>
              <td className="widgetProductDate">{format(order?.createdAt)}</td>
              <td className="widgetProductAmount">${order?.amount}</td>
              <td className="widgetProductStatus">
                <button className="widgetProductSuccess">Success</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
