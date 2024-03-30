import { Route, Routes } from "react-router-dom";
import Registration from "../pages/registration /Registration.tsx";
import Login from "../pages/login/Login.tsx";
import Home from "../pages/home/Home.tsx";
import RequireAuth from "../components/RequireAuth.tsx";


export const Router = () => (
  <Routes>
    
    {/* Protected routes */}
    <Route path="/" element={<RequireAuth />}>
      <Route index element={<Home />} />
    </Route>
    
    {/* Public routes */}
    <Route path="/registration" element={<Registration />} />
    <Route path="/login" element={<Login />} />
    
  </Routes>
);
