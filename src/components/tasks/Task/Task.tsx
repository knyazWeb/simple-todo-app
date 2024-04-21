import { useEffect, useRef, useState } from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";

import { useAppSelector } from "../../../hooks/redux.ts";
import { useChangeTaskMutation, useRemoveTaskMutation } from "../../../services/TasksService.ts";
import { selectUser } from "../../../store/reducers/authSlice.ts";
import { ITask } from "../../../store/types/store.types.ts";
import DropdownMenu from "../../dropdownMenu/DropdownMenu.tsx";
import DateTag from "../../ui/Tags/DateTag/DateTag.tsx";
import StatusTag from "../../ui/Tags/StatusTag/StatusTag.tsx";
import css from "./Task.module.scss";

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
  const { userId } = useAppSelector(selectUser);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [changeTask] = useChangeTaskMutation();
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      return titleInputRef.current.focus();
    }
    if (isEditingDescription && descriptionInputRef.current) {
      return descriptionInputRef.current.focus();
    }
  }, [isEditingTitle, isEditingDescription]);

  const saveInputHandler = async () => {
    if (titleValue.trim() !== "" && descriptionValue.trim() !== "") {
      await changeTask({
        userId,
        taskId: id,
        task: { title: titleValue, description: descriptionValue } as ITask,
      });
    }
  };

  return (
    <div
      style={{ boxShadow: "0px 11px 4px -7px rgba(0, 0, 0, 1)" }}
      className={`relative w-full flex flex-col bg-white border-black border rounded-md p-3 break-words shadow-black shadow ${removeIsLoading ? css.delete : ""} ${removeIsSuccess ? "hidden" : ""}`}>
      {isEditingTitle ? (
        <input
          ref={titleInputRef}
          value={titleValue}
          style={{ backgroundColor: "#F6F6F6" }}
          className="text-lg leading-tight mb-2 mr-6"
          onChange={(e) => setTitleValue(e.target.value)}
          onBlur={() => {
            setIsEditingTitle(false);
            titleValue.trim() === "" && setTitleValue(title);
          }}
        />
      ) : (
        <h2 onClick={() => setIsEditingTitle(true)} className="text-lg leading-none mb-2 mr-6">
          {titleValue}
        </h2>
      )}
      {isEditingDescription ? (
        <input
          ref={descriptionInputRef}
          value={descriptionValue}
          style={{ backgroundColor: "#F6F6F6" }}
          className="leading-none mb-2 text-sm"
          onChange={(e) => setDescriptionValue(e.target.value)}
          onBlur={() => {
            setIsEditingDescription(false);
            descriptionValue.trim() === "" && setDescriptionValue(description);
          }}
        />
      ) : (
        <p
          onClick={() => setIsEditingDescription(true)}
          className="text-sm text-gray-600 mb-4 leading-none">
          {descriptionValue}
        </p>
      )}
      <div className="flex flex-col justify-center items-start gap-1.5">
        <DateTag date={date} />
        <StatusTag status={status} />
      </div>
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
            }}
            className="flex w-full gap-0.5 items-center justify-start text-teal-500 transition-all duration-300 ease-in-out hover:brightness-90 border-b border-neutral-400 py-1 pr-4 pl-1"
            style={{ backgroundColor: "#f6f6f6" }}>
            <IoCheckmarkDoneCircleOutline size={15} className="inline " />
            <span className="inline leading-none">Complete</span>
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
