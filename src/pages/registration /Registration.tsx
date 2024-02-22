import RegistrationForm from "../../components/forms/RegistrationForm/RegistrationForm.tsx";
import ButtonIcon from "../../components/ui/Buttons/ButtonIcon/ButtonIcon.tsx";
import { IoIosArrowBack } from "react-icons/io";

const Registration = () => {

  return (
    <div className="h-dvh flex flex-col justify-start items-center w-full max-w-64 mx-auto mt-12">
      <div className="w-full mb-7">
        <ButtonIcon type="button">
          <IoIosArrowBack size={25} />
        </ButtonIcon>
      </div>
      <div className='w-full'>
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-sm mt-1 mb-8 text-gray-400">Please fill in the form to continue</p>
      </div>
      <RegistrationForm />
    </div>
  );
};

export default Registration;