import React from "react";
import "./Footer.scss";
import {
  Place,
  LocalPhone,
  Drafts,
  Facebook,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Footer = () => {
  const links = [
    { name: "Giới thiệu", link: "/gioithieu" },
    { name: "Đồng hồ nam", link: "/donghonam" },
    { name: "Đồng hồ nữ", link: "/donghonu" },
    { name: "Liên Hệ", link: "/lienhe" },
  ];

  const supports = [
    "Hướng dẫn mua hàng",
    "Hướng dẫn thanh toán",
    "Chính sách bảo hành",
    "Chính sách đổi trả",
    "Tư vấn khách hàng",
  ];

  return (
    <>
      <div className="footer">
        <div className="footer-left">
          <div className="contact">
            <div className="title">THÔNG TIN LIÊN HỆ</div>
            <div className="contact-address">
              <Place /> Dục Tú-Đông Anh- Hà Nội
            </div>
            <div className="contact-phone">
              <LocalPhone />
              0123456789
            </div>
            <div className="contact-email">
              <Drafts />
              duyhoang2209@gmail.com
            </div>
            <div className="social">
              <Facebook />
              <Instagram />
              <YouTube />
            </div>
          </div>
          <div className="links">
            <div className="title">LIÊN KẾT</div>
            {links.map(({ link, name }) => (
              <Link key={name} className="link" to={link}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-right">
          <div className="supports">
            <div className="title">HỖ TRỢ</div>
            {supports.map((sup, index) => (
              <p key={index} className="support">
                {sup}
              </p>
            ))}
          </div>
          <div className="download">
            <div className="title">TẢI ỨNG DỤNG TRÊN</div>
            <div className="desc">
              Ứng dụng Watch hiện có sẵn trên Google Play & App Store. Tải nó
              ngay.
            </div>
            <img
              src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-googleplay.jpg"
              alt=""
              className="download-img"
            />
            <img
              src="https://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-appstore.jpg"
              alt=""
              className="download-img"
            />
          </div>
        </div>
      </div>
    </>
  );
};
