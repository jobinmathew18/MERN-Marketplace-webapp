import './App.css'
import Cart from "./pages/Cart";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import AdminHome from './admin/pages/adminHome/AdminHome';
import UserList from './admin/pages/userList/UserList';
import User from './admin/pages/user/User';
import NewUser from './admin/pages/newUser/NewUser';
import AdminProduct from './admin/pages/adminProduct/AdminProduct';
import AdminProductList from './admin/pages/adminProductList/AdminProductList';
import NewProduct from './admin/pages/newProduct/NewProduct';
import { useEffect } from 'react';
import { existingProduct } from './redux/cartRedux';
import { test, userRequest } from './requestMethods';
import { loginSuccess } from './redux/userRedux';

function App() {
  const dispatch = useDispatch()
  let user = useSelector(state=> state.user.currentUser) 
  const id = useSelector(state=> state.user.currentUser?._id) 
  
  let admin = null
  if(user){
    admin = user.isAdmin
    // user = !user.isAdmin 
  } 

  console.log( "user is: " + user)
  console.log("admin is: "+ admin)  

  useEffect(()=>{
    console.log("first")
    const getCartItems = async ()=>{
      const currentUser = await userRequest.get('/users/currentuser')
      dispatch(loginSuccess(currentUser.data))
      const res =  await userRequest.get(`/carts/find/${id}`)     
      // console.log(res.data) 
      dispatch(existingProduct(res.data))  
    }
    getCartItems()
  }, [id,dispatch])  

 
  return ( 
    <Router>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route exact path="/register" element={user ? <Navigate to="/" replace={true} /> : <Register />} /> 
        <Route exact path="/login" element={ <Login />} />
        <Route exact path="/products/:category" element={<ProductList />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/success" element={<Success />} />

        {/* ADMIN */}
        {
          admin &&
          <>
          <Route exact path="/admin" element={<AdminHome />}></Route>
          <Route exact path="/admin/users" element={<UserList />}></Route>
          <Route exact path="/admin/user/:userId" element={<User />}></Route>
          <Route exact path="/admin/newUser" element={<NewUser />}></Route>
          <Route exact path="/admin/products" element={<AdminProductList />}></Route>
          <Route exact path="/admin/product/:productId" element={<AdminProduct />}></Route>
          <Route exact path="/admin/newProduct" element={<NewProduct />}></Route>
          </> 
        }

      </Routes>
    </Router>
  );
} 

export default App; 
