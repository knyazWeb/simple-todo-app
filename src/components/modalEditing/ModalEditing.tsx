import { Dialog } from "@headlessui/react";
import css from "./ModalEditing.module.scss";
import ButtonIcon from "../ui/Buttons/ButtonIcon/ButtonIcon";
import { RxCross2 } from "react-icons/rx";
import CustomInput from "../ui/CustomInput/CustomInput";
import Textarea from "../ui/Textarea/Textarea";
import ButtonMain from "../ui/Buttons/ButtonMain/ButtonMain";
import { useAppSelector } from "../../hooks/redux";
import { useChangeTaskMutation } from "../../services/TasksService";
import { selectUser } from "../../store/reducers/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITask } from "../../store/types/store.types";

type ModalEditingProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  mainTitle: string;
  taskId: string;
  title: string;
  description: string;
  status: ITask["status"];
  date: string;
  children?: React.ReactNode;
};

const ModalEditing = ({
  isOpen,
  setIsOpen,
  mainTitle,
  taskId,
  title,
  description,
  status,
  date,
  children,
}: ModalEditingProps) => {
  const [changeTask, { isLoading }] = useChangeTaskMutation();
  const { userId } = useAppSelector(selectUser);
  const currentYear = new Date().getFullYear();
  //FIXME: СДЕЛАТЬ ПОЛНОЦЕННУЮ ДАТУ НА СЕРВЕРЕ
  const inputDate = new Date(`${date}`).toISOString().split("T")[0]
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    defaultValues: {
      title: title,
      description: description,
      date: inputDate,
      status: status,
    },
  });
  const selectedOption = watch("status");

  const submit: SubmitHandler<ITask> = async (data) => {
    const date = new Date(data.date).toLocaleDateString("en-GB", {
      month: "short",
      day: "2-digit",
    });
    const changedTask = {
      date,
      title: data.title,
      description: data.description,
      status: data.status,
    };

    if (userId) {
      await changeTask({ userId, taskId, task: changedTask });
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 flex w-full items-center justify-center p-4">
          <Dialog.Panel className={`${css.popup}`}>
            <div className="flex items-center justify-between mb-2">
              <Dialog.Title className="text-xl font-bold ">{mainTitle}</Dialog.Title>
              <ButtonIcon onClick={() => setIsOpen(false)} type="button" color="bg-gray-200" borderRadius="rounded-lg">
                <RxCross2 color="black" />
              </ButtonIcon>
            </div>
            <form className="flex justify-center items-start w-full flex-col gap-5" onSubmit={handleSubmit(submit)}>
              <CustomInput
                type="text"
                placeholder="Task Title"
                {...register("title", {
                  validate: (value) => {
                    return !!value.trim() || "Title field is empty";
                  },
                })}
              />
              {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
              <Textarea
                rows={3}
                placeholder="Add your task details"
                {...register("description", {
                  validate: (value) => {
                    return !!value.trim() || "Title field is empty";
                  },
                })}
              />
              {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
              <CustomInput
                type="date"
                value={inputDate}
                style={{ color: "rgb(64 64 64)", cursor: "pointer" }}
                {...register("date", {
                  required: "Choose a date",
                  validate: (value) => {
                    const currentYear = value.split("-")[0];
                    return (currentYear.length === 4 && +currentYear[0] === 2) || "Choose a correct date";
                  },
                })}
              />
              {errors.date && <p className="text-xs text-red-400">{errors.date.message}</p>}

              <select
                {...register("status")}
                className={`border ${selectedOption === "On going" ? "bg-blue-400" : selectedOption === "In process" ? "bg-yellow-500" : selectedOption === "Completed" ? "bg-teal-500" : selectedOption === "Canceled" ? "bg-red-400" : ""} text-white text-center text-xs font-normal pr-1 pl-2 py-1 leading-none rounded-full`}
                defaultValue={status}>
                <option value="On going">On going</option>
                <option value="In process">In process</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>

              <ButtonMain className="mt-4" type="submit" disabled={false}>
                {isLoading ? "Loading" : "Change task"}
              </ButtonMain>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalEditing;
