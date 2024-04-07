import RegistrationForm from "../../components/forms/RegistrationForm/RegistrationForm.tsx";
import { Navigate, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-dvh flex flex-col justify-start items-center w-full">
      <div className="w-full mt-9">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-sm mt-1 mb-8 text-gray-400">Please fill in the form to continue</p>
      </div>
      <RegistrationForm />
      <div>
        <p className="text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-300 tim ease-in-out">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
