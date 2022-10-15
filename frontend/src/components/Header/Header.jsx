import React, { useEffect, useRef, useState } from "react";
import "./header.scss";
import {
  LocationOn,
  LocalPhone,
  Facebook,
  Instagram,
  YouTube,
  Search,
  ShoppingCart,
  Clear,
  Reorder,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reloadData, showCart, selectReloadData } from "../../redux/cartRedux";
import { isAuthPage, logOut, selectCurrentUser } from "../../redux/userRedux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Header = ({ products }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [quantityCart, setQuantityCart] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reload = useSelector(selectReloadData);
  const currentUser = useSelector(selectCurrentUser);
  const username = currentUser?.data?.username;
  const { pathname } = useLocation();

  const navRef = useRef();

  const showHeader = () => {
    navRef.current.classList.toggle("responsive");
  };

  const links = [
    { name: "Trang Chủ", link: "/" },
    { name: "Giới thiệu", link: "/gioithieu" },
    { name: "Đồng hồ nam", link: "/donghonam" },
    { name: "Đồng hồ nữ", link: "/donghonu" },
  ];
  const active = links.findIndex((e) => e.link === pathname);

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset <= 200 ? false : true);
    return () => (window.onscroll = null);
  };

  useEffect(() => {
    if (currentUser) {
      const quantityCart = products.reduce(function (accumulator, item) {
        return accumulator + item.quantity;
      }, 0);
      setQuantityCart(quantityCart);
    } else return setQuantityCart(0);
  }, [reload, products]);

  // console.log("fjdgj");

  const handleCartShow = () => {
    if (currentUser) {
      dispatch(showCart({ cartShow: true }));
    } else return toast.error("Vui Lòng Đăng Nhập", toastOptions);
  };

  const handlelogOut = () => {
    dispatch(logOut());
    localStorage.clear();
    dispatch(reloadData({}));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dangnhap");
    dispatch(isAuthPage({ isAuth: true }));
  };

  return (
    <>
      <div ref={navRef} className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="top-bar">
          <div className="address">
            <span>
              <LocationOn className="icon-address" /> Dục Tú - Đông Anh - Hà Nội
            </span>
            <span>
              <LocalPhone className="icon-phone" />
              0123456789
            </span>
          </div>
          <div className="social">
            <Facebook />
            <Instagram />
            <YouTube />
          </div>
        </div>
        <div className="masthead">
          <Clear className="icon-clear" onClick={showHeader} />
          <Reorder className="icon-list" onClick={showHeader} />
          <Link to="/">
            <h1 className="logo">WATCH</h1>
          </Link>
          <div className="search">
            <input type="text" placeholder="Tìm Kiếm" />
            <button>
              <Search />
            </button>
          </div>
          <div className="right">
            {currentUser ? (
              <div className="rightUser">
                <button className="logOut" onClick={handlelogOut}>
                  Đăng Xuất
                </button>
                <button className="username">Hi! {username}</button>
              </div>
            ) : (
              <button className="login" onClick={handleLogin}>
                Đăng nhập
              </button>
            )}

            <div className="cart" onClick={handleCartShow}>
              <ShoppingCart />
              <span>{quantityCart}</span>
            </div>
          </div>
        </div>
        <div className="nav">
          <ul className="links">
            {links.map(({ link, name }, index) => {
              return (
                <li
                  key={name}
                  className={`${index === active ? "active" : ""}`}
                  onClick={showHeader}
                >
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
            {currentUser ? (
              <>
                <button className="login" onClick={handlelogOut}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <button className="login">
                <Link to="/dangnhap">Đăng nhập</Link>
              </button>
            )}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
