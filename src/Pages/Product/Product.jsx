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
import { updateProductSuccess } from "../../Redux/Slices/productSlice.jsx";

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
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [inStock, setInStock] = useState(false);
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
        console.log(res.data);
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

  const handleClick = async (e) => {
    e.preventDefault();

    if (file) {
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
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            console.log(product);
            console.log("product upar hai");

            const updatedProduct = {
              img: downloadURL && downloadURL,
              title: name ? name : product.title,
              price: price ? price * 1 : product.price,
              desc: desc ? desc : product.desc,
              categories: cat.length > 0 ? cat : product.categories,
              color: colors.length > 0 ? colors : product.color,
              size: sizes.length > 0 ? sizes : product.size,
              inStock: inStock ? inStock : product.inStock,
            };
            console.log(updatedProduct);

            const res = await userRequest
              .put("/products/" + productId, updatedProduct)
              // update
              .then((res) => {
                console.log(res);
                alert("Product updated");
                navigate("/products");
                dispatch(updateProductSuccess({ productId, product }));
              })
              .catch((err) => {
                console.log(err);
                alert(err);
              });
          });
        }
      );
    } else {
      console.log(product);
      console.log("product upar hai");
      const updatedProduct = {
        title: name ? name : product.title,
        price: price ? price * 1 : product.price,
        desc: desc ? desc : product.desc,
        categories: cat.length > 0 ? cat : product.categories,
        color: colors.length > 0 ? colors : product.color,
        size: sizes.length > 0 ? sizes : product.size,
        inStock: inStock ? inStock : product.inStock,
      };
      console.log(updatedProduct);
      const res = await userRequest
        .put("/products/" + productId, updatedProduct)
        // update
        .then((res) => {
          console.log(res);
          alert("Product updated");
          navigate("/products");
          dispatch(updateProductSuccess({ productId, product }));
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
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
          {pStats.length === 0 ? (
            <h3 style={{ color: "red", textAlign: "center" ,justifyContent:"center", height:"100%", display:"flex", alignItems:"center",
             }}>
              NO SALE OF THIS PRODUCT
            </h3>
          ) : (
            <Chart
              grid
              data={pStats}
              dataKey="Sales"
              title="Sales Performance"
            />
          )}
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product?.img} alt="" className="productInfoImg" />
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
              onChange={(e) => setName(e.target.value)}
              placeholder={product.title}
            />
            <label>Product Description</label>
            <input
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              placeholder={product.desc}
            />
            <label>Price</label>
            <input
              type="text"
              onChange={(e) => setPrice(e.target.value)}
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
            <label>Sizes</label>
            <input
              type="text"
              onChange={handleSizes}
              placeholder={product.size}
            />
            <label>In Stock</label>
            <select
              name="inStock"
              id="idStock"
              onChange={(e) => setInStock(e.target.value)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
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
