import React from "react";
import "./banner.scss";
import Slider from "react-slick";
import SliderBg1 from "../../img/slide-bg-1.jpg";
import SliderBg2 from "../../img/slide-bg-2.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

export const Banner = () => {
  const settings = {
    dots: true,
    infinity: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const banners = [{ img: SliderBg1 }, { img: SliderBg2 }];

  return (
    <div style={{ overflow: "hidden" }}>
      <Slider {...settings} className="slider">
        {banners.map((banner, index) => (
          <div key={index} className="banner">
            <img src={banner.img} alt="" />
            <motion.div
              className="intro"
              initial={{ x: 130, y: -130, opacity: 0 }}
              animate={{ x: -230, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="logo">Watch</h1>
              <p className="title">Đồng hồ Classion</p>
              <p className="desc">
                Cùng với sự phát triển không ngừng của thời trang thế giới, rất
                nhiều thương hiệu cho ra đời những mẫu đồng hồ nam chính hãng đa
                dạng về phong cách, kiểu dáng, màu sắc, kích cỡ…
              </p>
              <button className="btn">Xem sản phẩm</button>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
