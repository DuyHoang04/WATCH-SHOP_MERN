import React, { useEffect } from "react";
import CountUp from "react-countup";
import "./introduce.scss";
import { commits } from "../../data";
import ContentImg from "../../img/about-us_bg.jpg";
import BannerCounter from "../../img/banner-portfolio.jpg";
import { counterUp, evaluates } from "../../data";

export const Introduce = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="introduce">
        <div className="content">
          <img src={ContentImg} alt="" className="content-img" />
          <div className="content-desc">
            <div className="desc-title">Giới thiệu về Watch</div>
            <div className="desc-main">
              “Cùng với sự phát triển không ngừng của thời trang thế giới, rất
              nhiều thương hiệu cho ra đời những mẫu đồng hồ nam chính hãng đa
              dạng về phong cách, kiểu dáng, màu sắc, kích cỡ… Một chiếc đồng hồ
              nam cao cấp chính hãng khắc họa một giá trị đích thực khi nói đến
              phụ kiện xa xỉ dành cho phái mạnh. Hiện nay, đồng hồ là phụ kiện
              thời trang thiết yếu đối với những người đàn ông hiện đại ngày
              nay. Trên cổ tay của những người đàn ông thành đạt luôn dành vị
              trí cho một chiếc đồng hồ nam cao cấp.”
            </div>
          </div>
        </div>
        <div className="commits">
          {commits.map((commit, index) => (
            <div className="commit" key={index}>
              {commit.icon}
              <div className="commit-content">
                <div className="title">{commit.title}</div>
                <div className="desc">{commit.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="counter-up"
          style={{ backgroundImage: `url(${BannerCounter})` }}
        >
          <div className="blur"></div>
          {counterUp.map(({ end, title }) => (
            <div key={title} className="counter">
              <CountUp end={end} duration={1.5} />
              <p>{title}</p>
            </div>
          ))}
        </div>
        <div className="evaluates">
          {evaluates.map(({ img, name, cmt }) => (
            <div key={name} className="evaluate">
              <img src={img} alt="" />
              <div className="name">{name}</div>
              <div className="cmt">{cmt}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
