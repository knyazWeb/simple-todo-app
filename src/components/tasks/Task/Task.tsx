import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

import { useAppSelector } from "../../../hooks/redux.ts";
import { useChangeTaskMutation, useRemoveTaskMutation } from "../../../services/TasksService.ts";
import { selectUser } from "../../../store/reducers/authSlice.ts";
import { ITask } from "../../../store/types/store.types.ts";
import DropdownMenu from "../../dropdownMenu/DropdownMenu.tsx";
import DateTag from "../../ui/Tags/DateTag/DateTag.tsx";
import StatusTag from "../../ui/Tags/StatusTag/StatusTag.tsx";
import css from "./Task.module.scss";
import ButtonDone from "../../ui/Buttons/ButtonDone/ButtonDone.tsx";

type TaskProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: ITask["status"];
};

const Task = ({ id, title, description, date, status }: TaskProps) => {
  const [removeTask, { isLoading: removeIsLoading, isSuccess: removeIsSuccess }] =
    useRemoveTaskMutation();
  const [changeTask, { isLoading: changeIsLoading, isSuccess: changeIsSuccess }] =
    useChangeTaskMutation();
  const { userId } = useAppSelector(selectUser);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  return (
    <div
      style={{ boxShadow: "0px 11px 4px -7px rgba(0, 0, 0, 1)" }}
      className={`relative w-full flex flex-col bg-white border-black border rounded-md p-3 break-words shadow-black shadow overflow-hidden ${removeIsLoading ? css.delete : ""} ${removeIsSuccess ? "hidden" : ""}`}>
      <h2 className="text-lg leading-none mb-2 mr-6">{title}</h2>
      <p className="text-sm text-gray-600 mb-4 leading-none">{description}</p>
      <div className="flex flex-col justify-center items-start gap-1.5">
        <DateTag date={date} />
        <StatusTag status={status} />
      </div>
      {(status === "In process" || status === "On going") && (
        <div className={`flex justify-center items-center absolute bottom-1.5 right-1.5 `}>
          <ButtonDone
            onClick={() =>
              changeTask({ userId, taskId: id, task: { status: "Completed" } as ITask })
            }
            status={status}
            isLoading={changeIsLoading}
            isSuccess={changeIsSuccess}
          />
        </div>
      )}

      <div className="absolute top-1.5 right-1.5">
        <DropdownMenu isDropdownActive={isDropdownActive} setIsDropdownActive={setIsDropdownActive}>
          <button
            onClick={() => {
              setIsDropdownActive(false);
            }}
            className="flex w-full gap-0.5 items-center justify-start text-blue-400 transition-all duration-300 ease-in-out hover:brightness-90 border-b border-neutral-400 py-1 pr-4 pl-1"
            style={{ backgroundColor: "#f6f6f6" }}>
            <MdEdit size={15} className="inline " />
            <span className="inline leading-none">Edit</span>
          </button>

          <button
            onClick={() => {
              setIsDropdownActive(false);
              removeTask({ userId, taskId: id });
            }}
            className="flex w-full gap-0.5 items-center justify-start text-red-400 transition-all duration-300 ease-in-out hover:brightness-90 py-1 pr-4 pl-1"
            style={{ backgroundColor: "#f6f6f6" }}>
            <MdDelete size={15} className="inline " />
            <span className="inline leading-none">Delete</span>
          </button>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Task;
