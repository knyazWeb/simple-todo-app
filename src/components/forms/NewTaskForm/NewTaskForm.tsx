import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
import DatePicker from "react-datepicker";

const NewTaskForm = () => {
  const navigate = useNavigate();
  const [addTask, { isLoading, isSuccess, isError }] = useAddTaskMutation();
  const { userId } = useAppSelector(selectUser);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      status: "In process",
    },
  });

  const submit: SubmitHandler<ITask> = async (data) => {
    const date = new Date(data.date).toISOString().split("T")[0];
    const newTask = {
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

        <ButtonMain className="mt-7" type="submit" disabled={false}>
          {isLoading ? "Loading" : "Create task"}
        </ButtonMain>
      </form>
    </>
  );
};

export default NewTaskForm;
