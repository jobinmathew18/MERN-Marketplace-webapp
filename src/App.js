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
import { useSelector } from "react-redux";
import AdminHome from './admin/pages/adminHome/AdminHome';
import UserList from './admin/pages/userList/UserList';
import User from './admin/pages/user/User';
import NewUser from './admin/pages/newUser/NewUser';
import AdminProduct from './admin/pages/adminProduct/AdminProduct';
import AdminProductList from './admin/pages/adminProductList/AdminProductList';
import NewProduct from './admin/pages/newProduct/NewProduct';

function App() {
  let user = null
  if ((JSON.parse(localStorage.getItem("persist:root")))) {
    if (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser) {
      user = !JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin
    } 
  }

  console.log("user is: " + user)  
 
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" replace={true}/> } />
        <Route exact path="/register" element={user ? <Navigate to="/" replace={true} /> : <Register />} />
        <Route exact path="/login" element={user ? <Navigate to="/" replace={true} /> : <Login />} />
        <Route exact path="/products/:category" element={<ProductList />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/success" element={<Success />} />

        {/* ADMIN */}
        <Route exact path="/admin" element={<AdminHome />}></Route>
        <Route exact path="/admin/users" element={<UserList />}></Route>
        <Route exact path="/admin/user/:userId" element={<User />}></Route>
        <Route exact path="/admin/newUser" element={<NewUser />}></Route>
        <Route exact path="/admin/products" element={<AdminProductList />}></Route>
        <Route exact path="/admin/product/:productId" element={<AdminProduct />}></Route>
        <Route exact path="/admin/newProduct" element={<NewProduct />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
