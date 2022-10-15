import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import UserList from "./pages/userList/UserList";
import NewUser from "./pages/newUser/NewUser";
import User from "./pages/user/User";
import { Login } from "./pages/login/Login";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/userRedux";

function App() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Router>
      <Routes>
        <Route path="/dangnhap" element={<Login />} />
      </Routes>
      {currentUser ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sanpham" element={<ProductList />} />
              <Route path="/sanpham/:id" element={<Product />} />
              <Route path="/themsanpham" element={<NewProduct />} />
              <Route path="/nguoidung" element={<UserList />} />
              <Route path="/nguoidung/:id" element={<User />} />
              <Route path="/themnguoidung" element={<NewUser />} />
            </Routes>
          </div>
        </>
      ) : (
        <div className="login">
          <div>Là Admin Thì Hãy Đăng Nhập Không Thì Mời Rời Khỏi</div>
          <button>
            <Link to="/dangnhap">Đăng Nhập</Link>
          </button>
        </div>
      )}
    </Router>
  );
}

export default App;
