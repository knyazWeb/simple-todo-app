import { IoIosArrowBack } from "react-icons/io"
import ButtonIcon from "../../components/ui/Buttons/ButtonIcon/ButtonIcon"
import { Navigate, useNavigate } from 'react-router-dom';
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import { useEffect } from "react";




const Login = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  
  if (token) {
    return <Navigate to="/" replace />
  }
 
  return (
     <div className="h-dvh flex flex-col justify-start items-center w-full">
      <div className="w-full mb-7">
        <ButtonIcon onClick={() => navigate(-1)}  type="button" color="bg-gray-200" borderRadius="rounded-lg">
          <IoIosArrowBack size={25} />
        </ButtonIcon>
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-bold">Log in to your account  </h1>
        <p className="text-sm mt-1 mb-8 text-gray-400">Please fill in the form to continue</p>
      </div>
      <LoginForm />
    </div>
  )
}

export default Login