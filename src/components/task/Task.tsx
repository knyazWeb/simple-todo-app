import { useChangeTaskMutation, useRemoveTaskMutation } from "../../services/TasksService.ts";
import { MdDelete, MdOutlineDone } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/redux.ts";
import { selectUser } from "../../store/reducers/authSlice.ts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { ITask } from "../../store/types/store.types.ts";

type TaskProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
};

const Task = ({ id, title, description, date, status }: TaskProps) => {
  const [removeTask] = useRemoveTaskMutation();
  const { userId } = useAppSelector(selectUser);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [changeTask] = useChangeTaskMutation();
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

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
      className="relative w-full flex flex-col border-black border rounded-md p-3 break-words shadow-black shadow">
      {isEditingTitle ? (
        <input
          ref={titleInputRef}
          value={titleValue}
          style={{ backgroundColor: "#F6F6F6" }}
          className="text-xl"
          onChange={(e) => setTitleValue(e.target.value)}
          onBlur={() => {
            setIsEditingTitle(false);
            titleValue.trim() === "" && setTitleValue(title);
          }}
        />
      ) : (
        <h2 onClick={(e) => setIsEditingTitle(true)} className="text-xl">
          {titleValue}
        </h2>
      )}
      {isEditingDescription ? (
        <input
          ref={descriptionInputRef}
          value={descriptionValue}
          style={{ backgroundColor: "#F6F6F6" }}
          onChange={(e) => setDescriptionValue(e.target.value)}
          onBlur={() => {
            setIsEditingDescription(false);
            descriptionValue.trim() === "" && setDescriptionValue(description);
          }}
        />
      ) : (
        <p onClick={(e) => setIsEditingDescription(true)} className="text-base text-gray-600">
          {descriptionValue}
        </p>
      )}
      <p className="text-indigo-900">{date}</p>
      <p className={status === "In progress" ? "text-green-600" : "text-cyan-700"}>{status}</p>
      <div className="absolute bottom-2 right-2 flex gap-1">
        {(isEditingTitle || isEditingDescription || titleValue !== title || description !== descriptionValue) && (
          <MdOutlineDone
            onClick={(e) => {
              (titleValue !== title || descriptionValue !== description) && saveInputHandler();
            }}
            size={25}
            className="text-blue-500 cursor-pointer hover:text-blue-700 transition-all duration-300 ease-in-out"
          />
        )}
        <IoCheckmarkDoneCircleOutline
          onClick={() => changeTask({ userId, taskId: id, task: { status: "Completed" } as ITask })}
          size={25}
          className="text-green-600 cursor-pointer hover:text-green-800 transition-all duration-300 ease-in-out"
        />
        <MdDelete
          onClick={() => removeTask({ userId, taskId: id })}
          size={25}
          className="text-red-600 cursor-pointer hover:text-red-800 transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Task;
