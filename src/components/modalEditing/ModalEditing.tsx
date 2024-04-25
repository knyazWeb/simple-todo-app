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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ITask } from "../../store/types/store.types";
import DatePicker from "react-datepicker";

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
}: ModalEditingProps) => {
  const [changeTask, { isLoading }] = useChangeTaskMutation();
  const { userId } = useAppSelector(selectUser);
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    defaultValues: {
      title: title,
      date: new Date(date).toISOString().split("T")[0],
      description: description,
      status: status,
    },
  });
  const selectedOption = watch("status");
  const submit: SubmitHandler<ITask> = async (data) => {
    const date = new Date(`${data.date}`).toISOString().split("T")[0];

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
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 flex w-full items-center justify-center p-4">
          <Dialog.Panel className={`${css.popup}`}>
            <div className="flex items-center justify-between mb-2">
              <Dialog.Title className="text-xl font-bold ">{mainTitle}</Dialog.Title>
              <ButtonIcon onClick={() => setIsOpen(false)} type="button" color="bg-gray-200" borderRadius="rounded-lg">
                <RxCross2 color="black" />
              </ButtonIcon>
            </div>
            <form className="flex justify-center items-start w-full flex-col" onSubmit={handleSubmit(submit)}>
              <CustomInput
                style={{ marginBottom: errors.title ? "10px" : "15px" }}
                type="text"
                placeholder="Task Title"
                {...register("title", {
                  validate: (value) => {
                    return !!value.trim() || "Title field is empty";
                  },
                })}
              />
              {errors.title && <p className="text-xs text-red-400 mb-3">{errors.title.message}</p>}

              <Textarea
                style={{ marginBottom: errors.description ? "10px" : "20px" }}
                rows={3}
                placeholder="Add your task details"
                {...register("description", {
                  validate: (value) => {
                    return !!value.trim() || "Title field is empty";
                  },
                })}
              />
              {errors.description && <p className="text-xs text-red-400 mb-3">{errors.description.message}</p>}
              <Controller
                control={control}
                name="date"
                rules={{
                  required: "Choose a date",
                  validate: (value) => {
                    const currentYear = new Date(value).getFullYear();
                    return (currentYear >= 2000 && currentYear <= 2099) || "Choose a correct date";
                  },
                }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="d-MM-yyyy"
                  />
                )}
              />
              {errors.date && <p className="text-xs text-red-400">{errors.date.message}</p>}

              <select
                {...register("status")}
                className={`border ${selectedOption === "On going" ? "bg-blue-400" : selectedOption === "In process" ? "bg-yellow-500" : selectedOption === "Completed" ? "bg-teal-500" : selectedOption === "Canceled" ? "bg-red-400" : ""} text-white text-center text-xs font-normal pr-1 pl-2 py-1 leading-none rounded-full mt-2`}
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
