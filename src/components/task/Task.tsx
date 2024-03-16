import { useChangeTaskMutation, useRemoveTaskMutation } from "../../services/TasksService.ts";
import { MdDelete, MdOutlineDone } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

type TaskProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: string;
};

const Task = ({ id, title, description, date, status }: TaskProps) => {
  const [removeTask] = useRemoveTaskMutation();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [changeTask] = useChangeTaskMutation();
  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  
  // TODO: РЕШИТЬ ПРОБЛЕМЫ С ПЕРЕХОДОМ ОТ description к title инпутам 
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
    if (isEditingDescription && descriptionInputRef.current) {
      descriptionInputRef.current.focus();
    }
  }, [isEditingTitle, isEditingDescription]);

  const saveInputHandler = async () => {
    if (titleValue.trim() !== "" && descriptionValue.trim() !== "") {
      await changeTask({ id, title: titleValue, description: descriptionValue, date, status });
    }
  };
  return (
    <div className="relative w-full flex flex-col border-black border rounded-md p-3 break-words">
      {isEditingTitle ? (
        <input
          ref={titleInputRef}
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          onBlur={() =>
            setTimeout(() => {
              setIsEditingTitle(false);
              titleValue.trim() === "" && setTitleValue(title);
            }, 300)
          }
        />
      ) : (
        <h2 onClick={() => setIsEditingTitle(true)} className="text-xl">
          {titleValue}
        </h2>
      )}
      {isEditingDescription ? (
        <input
          ref={descriptionInputRef}
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          onBlur={() =>
            setTimeout(() => {
              setIsEditingDescription(false);
              descriptionValue.trim() === "" && setDescriptionValue(description);
            }, 300)}
        />
      ) : (
        <p onClick={() => setIsEditingDescription(true)} className="text-base text-gray-600">
          {descriptionValue}
        </p>
      )}
      <p className="text-indigo-900">{date}</p>
      <p className={status === "In progress" ? "text-green-600" : "text-red-700"}>{status}</p>
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

        <MdDelete
          onClick={() => removeTask(id)}
          size={25}
          className="text-red-600 cursor-pointer hover:text-red-800 transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Task;
