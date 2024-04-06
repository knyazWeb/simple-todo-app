import { Route, Routes } from "react-router-dom";
import Registration from "../pages/registration /Registration.tsx";
import Login from "../pages/login/Login.tsx";
import Home from "../pages/home/Home.tsx";
import RequireAuth from "../components/RequireAuth.tsx";
import NewTask from "../pages/newTask/NewTask.tsx";
import Completed from "../pages/completed/Completed.tsx";
import Layout from "../pages/layout/Layout.tsx";

export const Router = () => (
  <Routes>
    {/* Protected routes */}
    <Route path="/" element={<RequireAuth />}>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/createTask" element={<NewTask />} />
        <Route path="/completed" element={<Completed />} />
      </Route>
    </Route>

    {/* Public routes */}
    <Route path="/registration" element={<Registration />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);
