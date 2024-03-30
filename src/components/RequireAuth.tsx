import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { selectUser } from "../store/reducers/authSlice";
import { useVerifyTokenQuery } from "../services/AuthService";

const RequireAuth = () => {
  const token = localStorage.getItem("token") ?? "";
  const [user, isAuth] = useAppSelector(selectUser);
  const {data, isLoading } = useVerifyTokenQuery(token, { skip: !token });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuth && user) {
    return <Outlet />;
  } else {
    return <Navigate to="/registration" replace />;
  }
};

export default RequireAuth;
