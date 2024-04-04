import { Outlet, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout, selectUser } from "../store/reducers/authSlice";
import { useGetUserQuery } from "../services/AuthService";
import {  useRef } from "react";

const RequireAuth = () => {
  const token = useRef(localStorage.getItem("token") || "");
  const {user, isAuth}= useAppSelector(selectUser)
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useGetUserQuery(token.current, { skip: !token });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    dispatch(logout());
  }

  if (user && isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/registration" replace />;
  }
};

export default RequireAuth;
