import "./newProduct.css";
import { storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";

export default function NewProduct() {
  const [imageAsset, setImageAsset] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    desc: "",
    price: "",
    tag: "Nam",
  });
  const token = localStorage.getItem("token");

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const changeValue = (e) => {
    setProductData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `image/${Date.now()}-${imageFile?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const upLoad = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
        });
      }
    );
  };

  const handleValidation = () => {
    const { name, desc, price, tag } = productData;
    if (!name || !desc || !price || !imageAsset) {
      toast.error("Không được bỏ trống ô nào cả nha!", toastOptions);
      return false;
    } else if (!imageAsset) {
      toast.error("Chưa có ảnh", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { name, desc, price, tag } = productData;
      const res = await axios.post(
        `/products`,
        {
          name,
          desc,
          price,
          tag,
          image: imageAsset,
        },
        {
          headers: { token: `Bearer ${token}` },
        }
      );
      if (res.status !== 200) return toast.error(`Lỗi`, toastOptions);
      if (res.status === 200) {
        toast.success(`Tạo Thành Công`, toastOptions);
        setProductData({ name: "", desc: "", price: "", tag: "Nam" });
      }
    }
  };

  return (
    <>
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Image</label>
            <input type="file" id="file" onChange={uploadImage} />
          </div>
          <div className="addProductItem">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              placeholder="Product..."
              onChange={changeValue}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              type="text"
              name="desc"
              value={productData.desc}
              placeholder="Lorem..."
              onChange={changeValue}
            />
          </div>
          <div className="addProductItem">
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="..."
              value={productData.price}
              onChange={changeValue}
            />
          </div>
          <div className="addProductItem">
            <label>Tag</label>
            <select name="tag" id="tag" onChange={changeValue}>
              <option value="Nam">Tag</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <button className="addProductButton" onClick={handleSubmit}>
            Tạo
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
