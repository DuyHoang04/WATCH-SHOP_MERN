import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Introduce } from "./pages/Introduce/Introduce";
import { ForMen } from "./pages/ForMen/ForMen";
import { ForGirl } from "./pages/ForGirl/ForGirl";
import { Contact } from "./pages/Contact/Contact";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Details } from "./components/Details/Details.jsx";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import CartContainer from "./components/CartContainer/CartContainer";
import { useSelector, useDispatch } from "react-redux";
import { selectCartShow, selectReloadData } from "./redux/cartRedux";
import axios from "axios";
import { isAuthPage, selectCurrentUser, selectIsAuth } from "./redux/userRedux";
import { Payment } from "./pages/Payment/Payment";

function App() {
  const cartShow = useSelector(selectCartShow);
  const reloadData = useSelector(selectReloadData);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.data?._id;

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const {
          data: { products },
        } = await axios.get(`/carts/find/${userId}`);
        setProducts(products);
      };
      getData();
    }
    dispatch(isAuthPage({ isAuth: false }));
  }, [cartShow, reloadData, currentUser]);

  return (
    <Router>
      <Routes>
        <Route path="/dangki" element={<Register />} />
        <Route path="/dangnhap" element={<Login />} />
      </Routes>
      {!isAuth && (
        <div className="App">
          <Header products={products} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gioithieu" element={<Introduce />} />
            <Route path="/donghonam" element={<ForMen />} />
            <Route path="/donghonu" element={<ForGirl />} />
            <Route path="/lienhe" element={<Contact />} />
            <Route path="/sanpham" element={<Details />} />
            <Route path="/thanhtoan/:userId" element={<Payment />} />
          </Routes>
          <Footer />
          {cartShow && <CartContainer products={products} />}
        </div>
      )}
    </Router>
  );
}

export default App;
