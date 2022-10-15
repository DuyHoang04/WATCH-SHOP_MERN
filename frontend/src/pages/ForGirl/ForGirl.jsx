import React, { useState, useEffect } from "react";
import "./forgirl.scss";
import axios from "axios";
import { SectionCard } from "../../components/SectionCard/SectionCard";

export const ForGirl = () => {
  const [productsForGirl, setProductsForGirl] = useState([]);

  useEffect(() => {
    const getProductsForGirl = async () => {
      const { data } = await axios.get("/products?tag=Nu");
      setProductsForGirl(data);
    };
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    getProductsForGirl();
  }, []);
  return (
    <>
      <div className="ForGirl">
        {productsForGirl.map((product, index) => (
          <SectionCard key={index} product={product} />
        ))}
      </div>
    </>
  );
};
