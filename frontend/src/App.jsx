import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/users/Login";
import Signup from "./Components/users/Signup";
import ForgetPassword from "./Components/users/ForgetPassword" 
import ChangePassword from "./Components/users/ChangePassword"
import Dashboard from "./Components/home/Dashboard";
import User from "./Components/users/User";
import CategoryPage from "./Components/products/CategoryPage";
import Navbar from "./Components/home/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute"
import ProductSection from "./Components/products/ProductSection";
import Footer from "./Components/home/Footer";
import Cart from "./Components/Buy/Cart";
import Payment from "./Components/Buy/Payment";
import OrderSuccess from "./Components/Order/OrderSuccess";
import TrackOrder from "./Components/Order/TrackOrder";
import Support from "./Components/Order/Support";
import MyOrders from "./Components/Order/MyOrder";
import OrderDetails from "./Components/Order/OrderDetails";
import ProductItem from "./Components/products/Item";

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/products" element={<ProductSection/>} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductItem />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/forget_password" element={<ForgetPassword/>}/>
          <Route path="/change_password" element={<ChangePassword/>}/>
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<User/>} />
            <Route path="/payment" element={<Payment/>}></Route>
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/track-order/:orderId" element={<TrackOrder />} />
            <Route path="/support" element={<Support />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Route> 
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
