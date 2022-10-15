import React, { useState, useEffect } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from "axios";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getIncome = async () => {
      try {
        const { data } = await axios.get("orders/income", {
          headers: { token: `Bearer ${token}` },
        });
        setIncome(data);
        setPerc((data[0].total * 100) / data[1].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Doanh Thu</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[0]?.total}</span>
          <span className="featuredMoneyRate">
            {Math.floor(perc)}%{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">So Với Tháng Trước</span>
      </div>
    </div>
  );
}
