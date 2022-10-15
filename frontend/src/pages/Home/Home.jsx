import React, { useEffect } from "react";
import { Banner } from "../../components/Banner/Banner";
import { Product } from "../../components/Product/Product";
import { Section } from "../../components/Section/Section";
import Trend from "../../components/Trend/Trend";
import { trends } from "../../data";
import "./home.scss";

export const Home = () => {
  const FirstTrend = trends[0];
  const SecondTrend = trends[1];

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="home">
        <Banner />
        <Trend trends={FirstTrend} />
        <Section />
        <Trend trends={SecondTrend} />
        <Product />
      </div>
    </>
  );
};
