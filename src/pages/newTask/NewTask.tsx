import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import NewTaskForm from "../../components/forms/NewTaskForm/NewTaskForm.tsx";
import ButtonIcon from "../../components/ui/Buttons/ButtonIcon/ButtonIcon.tsx";


const NewTask = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        
        <ButtonIcon onClick={() => navigate("/")} type="button" color="bg-gray-200" borderRadius="rounded-lg">
          <RxCross2 color="black" />
        </ButtonIcon>
      </div> 
      {/*TODO: WRITE A MESSAGE*/}
      <h1 className=" text-2xl font-bold">New task</h1>
      <NewTaskForm />
    </div>
  );
};

export default NewTask;