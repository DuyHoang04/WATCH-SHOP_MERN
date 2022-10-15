import React from "react";
import "./trend.scss";
import { motion } from "framer-motion";

const Trend = ({ trends }) => {
  return (
    <div>
      <div className="trend">
        {trends.map((trend, index) => (
          <motion.div
            className={`banner-trend ${
              trend.title === "Smart Watch" || trend.title === "Cổ điển"
                ? "style"
                : ""
            }`}
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img src={trend.img} alt="" />
            <div className="info">
              <h1 className="info-title">{trend.title}</h1>
              <div className="divider"></div>

              <p className="info-desc">{trend.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Trend;
