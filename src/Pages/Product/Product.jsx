import "./Product.css";
import PublishIcon from "@mui/icons-material/Publish";
import Chart from "../../Components/Chart/Chart.jsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethod.js";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../Redux/apiCalls.jsx";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const dispatch = useDispatch();

  const MONTHS = useMemo(
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
    console.log(file);
  }, [file]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
        console.log(pStats);
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleColors = (e) => {
    const colorsArray = e.target.value.split(",");
    setColors(colorsArray.map((color) => color.trim()));
  };

  const handleSizes = (e) => {
    const sizesArray = e.target.value.split(",");
    setSizes(sizesArray.map((size) => size.trim()));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: cat,
            color: colors,
            size: sizes,
          };
          updateProduct(productId, product, dispatch)
            .then((res) => {
              console.log(res);
              navigate("/products");
            })
            .catch((err) => {
              console.log(err);
              alert(err);
            });
        });
      }
    );
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart grid data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">{product?.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Color:</span>
              <span className="productInfoValue">
                {product?.color?.map((item) => item + " ")}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Size:</span>
              <span className="productInfoValue">
                {product?.size?.map((item) => item + " ")}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product.inStock === true ? "Yes" : "No"}
              </span>
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
              onChange={handleChange}
              placeholder={product.title}
            />
            <label>Product Description</label>
            <input
              type="text"
              onChange={handleChange}
              placeholder={product.desc}
            />
            <label>Price</label>
            <input
              type="text"
              onChange={handleChange}
              placeholder={product.price}
            />
            <label>Categories</label>
            <input
              type="text"
              onChange={handleCat}
              placeholder={product.categories}
            />
            <label>Color</label>
            <input
              type="text"
              onChange={handleColors}
              placeholder={product.color}
            />
            <label>Size</label>
            <input
              type="text"
              onChange={handleSizes}
              placeholder={product.size}
            />
            <label>In Stock</label>
            <select name="inStock" onChange={handleChange} id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={file ? URL?.createObjectURL(file) : product.img}
                alt=""
                style={{ border: "1px solid gray" }}
                className="productUploadImg"
              />
              <label for="file">
                <PublishIcon />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
