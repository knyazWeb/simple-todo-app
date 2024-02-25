import { FaPlus } from "react-icons/fa6";
import ButtonIcon from "../ui/Buttons/ButtonIcon/ButtonIcon.tsx";
import { useNavigate } from "react-router-dom";


const MenuPanel = () => {

  const navigate = useNavigate()

  return (
    <div className='fixed bottom-0 right-1/2 translate-x-1/2 w-full flex justify-center items-center h-16 bg-white border-t border-black px-8'>
      <ButtonIcon onClick={() => navigate('/createTask')} type='button' color='bg-red-400' borderRadius='rounded-full'>
        <FaPlus color='white'/>
      </ButtonIcon>
    </div>
  );
};

export default MenuPanel;