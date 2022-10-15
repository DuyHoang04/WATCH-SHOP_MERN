import React, { useState, useEffect, useMemo } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetUser/WidgetUser";
import WidgetProduct from "../../components/widgetProduct/WidgetProduct";
import axios from "axios";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const token = localStorage.getItem("token");

  const months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await axios.get("/users/stats", {
          headers: { token: `Bearer ${token}` },
        });
        data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: months[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [months]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetProduct />
      </div>
    </div>
  );
}
