import React, { useEffect, useState } from "react";
import "./product.scss";
import { SectionCard } from "../../components/SectionCard/SectionCard";
import axios from "axios";

export const Product = () => {
  const [selectedLink, setSelectedLink] = useState(0);
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState(false);

  const links = [{ title: "Sản phẩm phổ biến" }, { title: "Sản phẩm mới" }];

  const selected = (index, link) => {
    setSelectedLink(index);
    console.log(link.title);
    if (link.title === "Sản phẩm mới") {
      setNewProducts(true);
    } else return setNewProducts(false);
  };

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get(
        `/products?new=${newProducts ? "true" : ""}`
      );
      setProducts(data.slice(0, 10));
    };
    getProducts();
  }, [selectedLink]);

  useEffect(() => {});

  return (
    <div className="product">
      <div className="title">
        {links.map((link, index) => (
          <h1
            key={index}
            onClick={(e) => selected(index, link)}
            className={`title-link ${selectedLink === index ? "selected" : ""}`}
          >
            {link.title}
          </h1>
        ))}
      </div>
      <div className="product-container">
        {products.map((product, index) => (
          <SectionCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};
