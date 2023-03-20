import { Upload } from "@mui/icons-material";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./newProduct.css";

//from firebase: refer https://firebase.google.com/docs/storage/web/upload-files
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import { addNewProduct } from "../../../redux/apiCalls";
import { useDispatch } from "react-redux";

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState({});
  const dispatch = useDispatch()

  // console.log({...inputs, ...cat})         //merging two objects
  // console.log(file)

  //handling multiple inputs in one state
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }; //note: the name should be exactly same as in database
    });
  };

  const handleArray = (e) => {
    setCat((prev) => {
      return { ...prev, [e.target.name]: e.target.value.split(",") };
    });
  };


  //FIREBASE FILE/IMAGE UPLOADING CODE
  //images stored in: https://console.firebase.google.com/u/0/project/marketplace-bbebf/storage/marketplace-bbebf.appspot.com/files
  const handleSubmit = (e) => {
    e.preventDefault();
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

          console.log({...inputs, ...cat, img:downloadURL});      //our new product

          //adding new product 
          const product = {...inputs, ...cat, img:downloadURL};
          addNewProduct(product, dispatch)

        });
      }
    );
  };

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="addProductTitle">New Product</h1>
          <form className="addProductForm" onSubmit={handleSubmit}>
            <div className="addProductItem">
              <div className="uploadProduct">
                <label>Upload Product: </label>
                <label for="file">
                  {" "}
                  <Upload style={{ cursor: "pointer" }} />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>
            </div>
            <div className="addProductItem">
              <label>Name</label>
              <input
                name="title"
                type="text"
                placeholder="Ex: Apple Airpods"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                name="desc"
                type="text"
                placeholder="Info about product"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addProductItem">
              <label>Price</label>
              <input
                name="price"
                type="number"
                placeholder="In $"
                onChange={handleChange}
                required
              />
            </div>
            <div className="addProductItem">
              <label>Categories</label>
              <input
                type="text"
                name="categories"
                placeholder="Enter each category after giving a comma"
                onChange={handleArray}
                required
              />
            </div>
            <div className="addProductItem">
              <label>Size</label>
              <input
                type="text"
                name="size"
                placeholder="Enter each size after giving a comma"
                onChange={handleArray}
                required
              />
            </div>
            <div className="addProductItem">
              <label>Color</label>
              <input
                type="text"
                name="color"
                placeholder="Enter each color after giving a comma"
                onChange={handleArray}
                required
              />
            </div>
            <div className="addProductItem">
              <label>In Stock</label>
              <select name="inStock" onChange={handleChange} required>
                <option disabled selected>
                  Select
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <button type="submit" className="addProductButton">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
