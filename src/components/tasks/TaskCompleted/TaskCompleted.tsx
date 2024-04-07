import { MdDelete } from "react-icons/md";
import { selectUser } from "../../../store/reducers/authSlice";
import { useAppSelector } from "../../../hooks/redux";
import { useRemoveTaskMutation } from "../../../services/TasksService";

type TaskCompletedProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
};

const TaskCompleted = ({ id, title, description, date, status }: TaskCompletedProps) => {
  const [removeTask] = useRemoveTaskMutation();
  const { userId } = useAppSelector(selectUser);
  return (
    <div
      style={{ boxShadow: "0px 11px 4px -7px rgba(0, 0, 0, 1)" }}
      className="relative w-full flex flex-col border-black border rounded-md p-3 break-words shadow-black shadow bg-gray-300">
      <h2 className="text-xl">{title}</h2>

      <p className="text-base text-gray-600">{description}</p>
      <p className="text-indigo-900 text-sm">{date}</p>
      <p className={"text-cyan-700 font-bold text-sm"}>{status}</p>
      <div className="absolute bottom-2 right-2 flex gap-1">
        <MdDelete
          onClick={() => removeTask({ userId, taskId: id })}
          size={25}
          className="text-red-600 cursor-pointer hover:text-red-800 transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};

export default TaskCompleted;
