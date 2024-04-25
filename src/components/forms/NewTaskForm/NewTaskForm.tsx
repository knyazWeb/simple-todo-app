import DatePicker from "react-datepicker";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux.ts";
import { useAddTaskMutation } from "../../../services/TasksService.ts";
import { selectUser } from "../../../store/reducers/authSlice.ts";
import { ITask } from "../../../store/types/store.types";
import Error from "../../error/Error.tsx";
import Success from "../../success/Success.tsx";
import ButtonMain from "../../ui/Buttons/ButtonMain/ButtonMain";
import CustomInput from "../../ui/CustomInput/CustomInput.tsx";
import Textarea from "../../ui/Textarea/Textarea";
import { regDate } from "../regDate.ts";

const NewTaskForm = () => {
  const navigate = useNavigate();
  const [addTask, { isLoading, isSuccess, isError }] = useAddTaskMutation();
  const { userId } = useAppSelector(selectUser);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      status: "On going",
    },
  });
  const selectedOption = watch("status");

  const submit: SubmitHandler<ITask> = async (data) => {
    const date = new Date(data.date).toISOString().split("T")[0];
    const newTask: ITask = {
      date,
      title: data.title,
      description: data.description,
      status: data.status,
    };
    if (userId) {
      await addTask({ newTask: newTask, userId });
      setTimeout(() => {
        navigate("/");
      }, 1200);
    }
  };


  return (
    <>
      {(isSuccess && <Success />) || (isError && <Error />)}
      <form className="flex justify-center items-start w-full flex-col" onSubmit={handleSubmit(submit)}>
        <CustomInput
          style={{ marginBottom: errors.title ? "10px" : "20px" }}
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
          rows={5}
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
                e.target.readOnly = true
                e.target.blur()
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
          className={`border ${selectedOption === "On going" ? "bg-blue-400" : selectedOption === "In process" ? "bg-yellow-500" : selectedOption === "Completed" ? "bg-teal-500" : selectedOption === "Canceled" ? "bg-red-400" : ""} text-white text-center text-xs font-normal pr-1 pl-2 py-1 leading-none rounded-full mt-2`}>
          <option value="On going">On going</option>
          <option value="In process">In process</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>

        <ButtonMain className="mt-7" type="submit" disabled={false}>
          {isLoading ? "Loading" : "Create task"}
        </ButtonMain>
      </form>
    </>
  );
};

export default NewTaskForm;
