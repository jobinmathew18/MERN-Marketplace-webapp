import { Upload } from "@mui/icons-material";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./newProduct.css";

const NewProduct = () => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="addProductTitle">New Product</h1>
          <form className="addProductForm">
            <div className="addProductItem">
              <div className="uploadProduct">
                <label>Upload Product: </label>
                <label for="file">
                  {" "}
                  <Upload style={{ cursor: "pointer" }} />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
            </div>
            <div className="addProductItem">
              <label>Name</label>
              <input type="text" placeholder="Apple Airpods" />
            </div>
            <div className="addProductItem">
              <label>Stock</label>
              <input type="text" placeholder="123" />
            </div>
            <div className="addProductItem">
              <label>Active</label>
              <select name="active" id="active">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button className="addProductButton">Create</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
