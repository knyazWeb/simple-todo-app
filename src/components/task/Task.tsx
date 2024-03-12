import { useRemoveTaskMutation } from "../../services/TasksService.ts";
import { MdDelete } from "react-icons/md";

type TaskProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: string;
};

const Task = ({ id, title, description, date, status }: TaskProps) => {
  const [removeTask] = useRemoveTaskMutation();
  return (
    <div className="relative w-full flex flex-col border-black border rounded-md p-3">
      <h2 className="text-xl">{title}</h2>
      <p className="text-base text-gray-600">{description}</p>
      <p className="text-indigo-900">{date}</p>
      <p className={status === "In progress" ? "text-green-600" : "text-red-700"}>{status}</p>

      <MdDelete onClick={() => removeTask(id)} size={25} className="absolute bottom-2 right-2 text-red-700 cursor-pointer" />
    </div>
  );
};

export default Task;
