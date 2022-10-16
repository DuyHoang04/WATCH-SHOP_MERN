import { useState, useEffect, useMemo } from "react";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { reLoadData, selectLoadData } from "../../redux/loadDataRedux.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
  const [infoProduct, setInfoProduct] = useState([]);
  const [updateData, setUpdateData] = useState({
    name: "",
    desc: "",
    price: "",
    tag: "Nam",
  });
  const [productsStats, setProductStats] = useState([]);
  const loadData = useSelector(selectLoadData);
  const dispatch = useDispatch();
  const productId = useLocation().state;
  const token = localStorage.getItem("token");

  const months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await axios.get(`/orders/income?id=${productId}`, {
          headers: { token: `Bearer ${token}` },
        });
        const list = data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: months[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, months]);

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const changeValue = (e) => {
    setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getInfoProduct = async () => {
      const { data } = await axios.get(`/products/find/${productId}`);
      setInfoProduct(data);
    };
    getInfoProduct();
  }, [loadData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, desc, price, tag } = updateData;
    const res = await axios.put(
      `/products/${productId}`,
      {
        name,
        desc,
        price,
        tag,
      },
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    if (res.status === 200) {
      dispatch(reLoadData());
      setUpdateData({ name: "", desc: "", price: "", tag: "Nam" });
      toast.success("Update Thành Công", toastOptions);
    }
  };

  return (
    <>
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Product</h1>
          <button className="productUpdateButton" onClick={handleUpdate}>
            Create
          </button>
        </div>
        <div className="productTop">
          <div className="productTopLeft">
            <Chart
              data={productsStats}
              dataKey="Sales"
              title="Sales Performance"
            />
          </div>
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={infoProduct.image} alt="" className="productInfoImg" />
              <span className="productName">{infoProduct.name}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue">{infoProduct._id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">price:</span>
                <span className="productInfoValue">{infoProduct.price}$</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={updateData.name}
                placeholder={infoProduct.name}
                onChange={changeValue}
              />
              <label>Description</label>
              <input
                type="text"
                name="desc"
                value={updateData.desc}
                placeholder={infoProduct.desc}
                onChange={changeValue}
              />
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={updateData.price}
                placeholder={infoProduct.price}
                onChange={changeValue}
              />
              <label>Tag</label>
              <select name="tag" id="tag" onChange={changeValue}>
                <option value="Nam">Tag</option>
                <option value="Nam">Nam</option>
                <option value="Nu">Nu</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
