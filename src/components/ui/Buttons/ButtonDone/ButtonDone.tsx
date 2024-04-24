import { ITask } from "../../../../store/types/store.types";
import { MdDone } from "react-icons/md";

type ButtonDoneProps = {
  status: ITask["status"];
  isLoading: boolean;
  isSuccess: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const statusColors = {
  "In process": "bg-yellow-500 border-yellow-500",
  "Completed": "bg-teal-500 border-teal-500",
  "On going": "bg-blue-400 border-blue-400",
  "Canceled": "bg-red-400 border-red-400",
};

const ButtonDone = ({ status, isLoading, isSuccess, onClick }: ButtonDoneProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center ${statusColors[status]} border-2 rounded-full bg-opacity-40 w-6 h-6 hover:[&>*]:opacity-100`}>
      <MdDone
        className={`${isLoading || isSuccess ? 'opacity-100' : 'opacity-0'} duration-150 ease-linear transition-opacity`}
        color="gray"
        size={18}
      />
    </button>
  );
};

export default ButtonDone;
