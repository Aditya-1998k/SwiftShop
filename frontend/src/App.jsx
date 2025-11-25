import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/users/Login";
import Signup from "./Components/users/Signup";
import ForgetPassword from "./Components/users/ForgetPassword" 
import ChangePassword from "./Components/users/ChangePassword"
import Dashboard from "./Components/home/Dashboard";
import User from "./Components/users/User";
import Navbar from "./Components/home/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute"

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/forget_password" element={<ForgetPassword/>}/>
          <Route path="/change_password" element={<ChangePassword/>}/>
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<User/>} />  
            <Route path="/dashboard" element={<Dashboard />} />
          </Route> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
