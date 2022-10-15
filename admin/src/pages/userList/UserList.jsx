import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { reLoadData, selectLoadData } from "../../redux/loadDataRedux.js";
import { Avatar } from "@mui/material";

export default function UserList() {
  const [dataUser, setDataUser] = useState([]);
  const dispatch = useDispatch();
  const loadData = useSelector(selectLoadData);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/users", {
        headers: { token: `Bearer ${token}` },
      });
      setDataUser(data);
    };
    getUser();
  }, [loadData]);

  const handleDelete = async (id) => {
    const res = await axios.delete(`/users/${id}`, {
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
      field: "user",
      headerName: "User",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <Avatar />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },

    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/nguoidung/" + params.row._id} state={params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={dataUser}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
