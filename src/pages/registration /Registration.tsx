import RegistrationForm from "../../components/forms/RegistrationForm/RegistrationForm.tsx";
import { Navigate, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-full flex flex-col justify-start items-center w-full">
      <div className="w-full mt-9">
        <h1 className="text-2xl font-bold">Create Account &#x1F44B;</h1>
        <p className="text-sm mt-5 mb-5 text-gray-400">
          Please fill in the form to continue using our app
        </p>
      </div>
      <RegistrationForm />
      <div>
        <p onClick={() => navigate("/login")} className="cursor-pointer text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <span className="text-red-400 hover:text-red-500 underline transition-colors duration-300 ease-in-out">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
