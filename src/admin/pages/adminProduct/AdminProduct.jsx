import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import "./AdminProduct.css";
import { Publish } from "@mui/icons-material";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../../requestMethods";
import { updateProduct } from "../../../redux/apiCalls";
import { updateProductSuccess } from "../../../redux/productRedux";

//from firebase: refer https://firebase.google.com/docs/storage/web/upload-files
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";

const AdminProduct = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[3];
  const [pStats, setPStats] = useState([]);
  const [input, setInput] = useState({});
  const [cat, setCat] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products.singleProduct);
  // console.log(product)

  useEffect(() => {
    const getProduct = async () => {
      const res = await userRequest.get(`/products/find/${productId}`);
      dispatch(updateProductSuccess(res.data));
    };
    getProduct();
  }, [productId]);

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleArray = (e) => {
    setCat((prev) => {
      return { ...prev, [e.target.name]: e.target.value.split(",") };
    });
  };

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
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedProduct = {};
    if (file) {
      const fileName = new Date().getTime() + file.name; //making our uploading img's name unique.
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updatedProduct = { ...input, ...cat, img: downloadURL };
            // console.log(updatedProduct);
            updateProduct(productId, updatedProduct, dispatch); 
          });
        }
      );
    } else {
      updatedProduct = { ...input, ...cat };
      // console.log(updatedProduct);
      updateProduct(productId, updatedProduct, dispatch); 
    }

   
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/admin/newProduct">
              <button className="productAddButton">Create</button>
            </Link>
          </div>
          <div className="productTop">
            <div className="productTopLeft">
              <Chart
                data={pStats}
                dataKey1="name"
                dataKey2="Sales"
                title="Sales Performance"
              />
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img src={product.img} alt="" className="productInfoImg" />
                <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">Id: </span>
                  <span className="productInfoValue">{product._id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Price: </span>
                  <span className="productInfoValue">$ {product.price}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Sales: </span>
                  <span className="productInfoValue">6313</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">In Stock: </span>
                  <span className="productInfoValue">
                    {product.inStock}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                <label>Product Name</label>
                <input
                  name="title"
                  type="text"
                  placeholder={product.title}
                  onChange={handleChange}
                />
                <label>Description</label>
                <input
                  name="desc"
                  type="text"
                  placeholder={product.desc}
                  onChange={handleChange}
                />
                <label>Price</label>
                <input
                  name="price"
                  type="number"
                  placeholder={"$ " + product.price}
                  onChange={handleChange}
                />
                <label>In Stock</label>
                <select name="inStock" onChange={handleChange}>
                  <option disabled selected>
                    Select
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <label>Categories</label>
                <input
                  name="categories"
                  type="text"
                  placeholder={product.categories}
                  onChange={handleArray}
                />
                <label>Size</label>
                <input
                  name="size"
                  type="text"
                  placeholder={product.size}
                  onChange={handleArray}
                />
                <label>Color</label>
                <input
                  name="color"
                  type="text"
                  placeholder={product.color}
                  onChange={handleArray}
                />
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img src={product.img} alt="" className="productUploadImg" />
                  <label for="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <button type="submit" className="productButton">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
