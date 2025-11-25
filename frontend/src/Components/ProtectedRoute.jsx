import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Components/home/Navbar";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <main className="p-4">
        <Outlet />  
      </main>
    </>
  );
};

export default ProtectedRoute;