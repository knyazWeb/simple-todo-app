import { Dialog } from "@headlessui/react";
import DatePicker from "react-datepicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from "../../../hooks/redux";
import { useChangeTaskMutation } from "../../../services/TasksService";
import { selectUser } from "../../../store/reducers/authSlice";
import { ITask } from "../../../store/types/store.types";
import { regDate } from "../../forms/regDate";
import ButtonIcon from "../../ui/Buttons/ButtonIcon/ButtonIcon";
import ButtonMain from "../../ui/Buttons/ButtonMain/ButtonMain";
import CustomInput from "../../ui/CustomInput/CustomInput";
import Textarea from "../../ui/Textarea/Textarea";
import css from "./ModalEditing.module.scss";
import { formatLocalDate } from "../../helpers/formatLocalDate";

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
    formState: { errors, isDirty },
  } = useForm<ITask>({
    defaultValues: {
      title: title,
      date: formatLocalDate(new Date(date)),
      description: description,
      status: status,
    },
  });
  const selectedOption = watch("status");
  const submit: SubmitHandler<ITask> = async (data) => {
    if (!isDirty) {
      setIsOpen(false);
      return;
    }
    const date = formatLocalDate(new Date(`${data.date}`));
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
                  pattern: {
                    value: regDate,
                    message: "Choose a correct date",
                  },
                  validate: (value) => {
                    const currentYear = new Date(value).getFullYear();
                    return (currentYear >= 2000 && currentYear <= 2099) || "Choose a correct date";
                  },
                }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    onFocus={(e) => {
                      e.target.readOnly = true;
                      e.target.blur();
                    }}
                    dateFormat="d-MM-yyyy"
                    placeholderText="dd-mm-yyyy"
                    fixedHeight
                  />
                )}
              />
              {errors.date && <p className="text-xs text-red-400">{errors.date.message}</p>}

              <select
                {...register("status")}
                onChange={(e) => {
                  register("status").onChange(e);
                  e.currentTarget.blur();
                }}
                className={`border ${selectedOption === "On going" ? "bg-blue-400" : selectedOption === "In process" ? "bg-yellow-500" : selectedOption === "Completed" ? "bg-teal-500" : selectedOption === "Canceled" ? "bg-red-400" : ""} text-white text-center text-xs font-normal pr-1 pl-2 py-1 leading-none rounded-full mt-2`}>
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
