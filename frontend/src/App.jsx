import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Component
import Login from "./Components/users/Login";
import Signup from "./Components/users/Signup";
import ForgetPassword from "./Components/users/ForgetPassword" 
import ChangePassword from "./Components/users/ChangePassword"
import User from "./Components/users/User";
// Home Component
import Dashboard from "./Components/home/Dashboard";
import Footer from "./Components/home/Footer";
import Navbar from "./Components/home/Navbar";
// Security Componented
import ProtectedRoute from "./Components/ProtectedRoute"
// Product
import ProductSection from "./Components/products/ProductSection";
import CategoryPage from "./Components/products/CategoryPage";
import ProductItem from "./Components/products/Item";
import SearchResults from "./Components/products/SearchResult";
// Buy
import Cart from "./Components/Buy/Cart";
import Payment from "./Components/Buy/Payment";
// Order
import OrderSuccess from "./Components/Order/OrderSuccess";
import TrackOrder from "./Components/Order/TrackOrder";
import Support from "./Components/Order/Support";
import MyOrders from "./Components/Order/MyOrder";
import OrderDetails from "./Components/Order/OrderDetails";
import OrderSupport from "./Components/Order/OrderSupport";
// Common Componenet
import FAQ from "./Components/Common/FAQ";
import About from "./Components/Common/About";
import Contacts from "./Components/Common/Contacts";

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
          <Routes>
            {/* Dashboard and Cart */}
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/cart" element={<Cart/>}></Route>
            {/* Product */}
            <Route path="/products" element={<ProductSection/>} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductItem />} />
            <Route path="/search" element={<SearchResults />} />
            {/* Common */}
            <Route path="/faq" element={<FAQ/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contacts/>}/>
            {/* Authentication */}
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/forget_password" element={<ForgetPassword/>}/>
            <Route path="/change_password" element={<ChangePassword/>}/>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/user" element={<User/>} />
                <Route path="/payment" element={<Payment/>}></Route>
                <Route path="/order-success" element={<OrderSuccess/>} />
                <Route path="/orders/:orderId/track" element={<TrackOrder/>} />
                <Route path="/support" element={<Support/>} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
                <Route path="/support/:orderId" element={<OrderSupport />} />
              </Route>
          </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
