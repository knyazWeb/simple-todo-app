import { Navigate, Outlet } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useGetUserQuery } from "../../services/AuthService";
import { logout, selectUser } from "../../store/reducers/authSlice";

const RequireAuth = () => {
  const token = localStorage.getItem("token") ?? "";
  const {user, isAuth}= useAppSelector(selectUser)
  const dispatch = useAppDispatch();
  
  const { isLoading, isError } = useGetUserQuery(token, { skip: !token || !!user || !!isAuth });
  
  if (isLoading) {
    return <Loading />
  } else if (isError) {
    dispatch(logout());
  }
  return (
    (user && isAuth) ? <Outlet /> : <Navigate to="/registration" replace />
  )
};

export default RequireAuth;