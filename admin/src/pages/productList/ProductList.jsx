import { useEffect, useState } from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { reLoadData, selectLoadData } from "../../redux/loadDataRedux.js";

export default function ProductList() {
  const [dataProducts, setDataProducts] = useState([]);
  const dispatch = useDispatch();
  const loadData = useSelector(selectLoadData);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("/products");
      setDataProducts(data);
    };
    getProducts();
  }, [loadData]);

  const handleDelete = async (id) => {
    const res = await axios.delete(`/products/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
    console.log(res);
    if (res.status === 200) {
      dispatch(reLoadData());
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.image} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/sanpham/" + params.row._id} state={params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={dataProducts}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
