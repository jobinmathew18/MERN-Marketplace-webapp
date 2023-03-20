import "./adminProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../../redux/apiCalls";

export default function AdminProductList() {
  const dispatch = useDispatch()
  const products = useSelector(state=> state.products.product)
  // console.log(products)  

  useEffect(()=>{
    getProducts(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    deleteProduct(id, dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "product",
      headerName: "Product",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "InStock", width: 90 }, 
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/product/" + params.row._id}>
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
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="productList">
          <DataGrid
            rows={products}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            getRowId={(row)=> row._id}                //because we are providing our own id.
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </>
  );
}
