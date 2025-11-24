import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./Components/home/Dashboard";
import Navbar from "./Components/home/Navbar";
import User from "./components/users/User";


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
