import { Navigate, Route, Routes } from "react-router-dom";
import Completed from "../pages/completed/Completed.tsx";
import Home from "../pages/home/Home.tsx";
import Layout from "../pages/layout/Layout.tsx";
import Login from "../pages/login/Login.tsx";
import NewTask from "../pages/newTask/NewTask.tsx";
import Registration from "../pages/registration /Registration.tsx";
import RequireAuth from "../pages/requireAuth/RequireAuth.tsx";
import Profile from "../pages/profile/Profile.tsx";

export const Router = () => (
  <Routes>
    {/* Protected routes */}
    <Route path="/" element={<RequireAuth />}>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/createTask" element={<NewTask />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Route>

    {/* Public routes */}
    <Route path="/registration" element={<Registration />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);
