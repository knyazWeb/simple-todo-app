import ButtonIcon from "../../components/ui/Buttons/ButtonIcon/ButtonIcon.tsx";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import NewTaskForm from "../../components/forms/NewTaskForm/NewTaskForm.tsx";

const NewTask = () => {

  const nagivate = useNavigate()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <ButtonIcon onClick={() => nagivate("/home")} type="button" color="bg-gray-200" borderRadius="rounded-lg">
          <RxCross2 color="black" />
        </ButtonIcon>
      </div>
      <h1 className="text-2xl font-bold">New task</h1>
      <NewTaskForm />
    </div>
  );
};

export default NewTask;