import { SubmitHandler, useForm } from "react-hook-form";
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

const NewTaskForm = () => {
  const navigate = useNavigate();
  const [addTask, { isLoading, isSuccess, isError }] = useAddTaskMutation();
  const { userId } = useAppSelector(selectUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITask>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      status: "In process",
    },
  });

  const submit: SubmitHandler<ITask> = async (data) => {
    const date = new Date(data.date).toLocaleDateString("en-GB", {
      month: "short",
      day: "2-digit",
    });
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
          rows={5}
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

        <ButtonMain className="mt-7" type="submit" disabled={false}>
          {isLoading ? "Loading" : "Create task"}
        </ButtonMain>
      </form>
    </>
  );
};

export default NewTaskForm;
