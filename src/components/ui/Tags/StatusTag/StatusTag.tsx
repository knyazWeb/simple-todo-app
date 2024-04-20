import { ITask } from "../../../../store/types/store.types";

type StatusTagProps = {
  status: ITask["status"];
};

const statusColors = {
  "In process": "bg-yellow-500",
  "Completed": "bg-teal-500",
  "On going": "bg-blue-400",
  "Canceled": "bg-red-400",
};

const StatusTag = ({ status }: StatusTagProps) => {
  
  return (
    <div className={`inline w-fit py-1 px-2 leading-none rounded-full ${statusColors[status]} text-white text-xs font-normal`}>
      {status}
    </div>
  );
};

export default StatusTag;
