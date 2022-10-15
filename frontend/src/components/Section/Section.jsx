import React, { useState, useEffect } from "react";
import "./section.scss";
import { cards } from "../../data";
import { SectionCard } from "../SectionCard/SectionCard";
import axios from "axios";

export const Section = () => {
  const [selling, setSelling] = useState([]);

  useEffect(() => {
    const getSelling = async () => {
      const { data } = await axios.get("/products?new=true");
      setSelling(data.slice(0, 4));
    };
    getSelling();
  }, []);

  return (
    <>
      <div className="section">
        <div className="title">Sản phẩm bán chạy</div>
        <div className="section-container">
          {selling.map((card, index) => (
            <SectionCard key={index} product={card} />
          ))}
        </div>
      </div>
    </>
  );
};
