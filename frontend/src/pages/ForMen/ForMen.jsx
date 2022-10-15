import React, { useState } from "react";
import "./formen.scss";
import { SectionCard } from "../../components/SectionCard/SectionCard";
import { useEffect } from "react";
import axios from "axios";

export const ForMen = () => {
  const [productsForMen, setProductsForMen] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    const getProductsForMen = async () => {
      const { data } = await axios.get("/products?tag=Nam");
      setProductsForMen(data);
    };
    getProductsForMen();
  }, []);

  return (
    <>
      <div className="ForMen">
        {productsForMen.map((product, index) => (
          <SectionCard key={index} product={product} />
        ))}
      </div>
    </>
  );
};
