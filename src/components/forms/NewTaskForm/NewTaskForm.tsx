import { useForm } from "react-hook-form";
import ButtonMain from "../../ui/Buttons/ButtonMain/ButtonMain";
import Input from "../../ui/Input/Input";
import Textarea from "../../ui/Textarea/Textarea";
import { useNavigate } from "react-router-dom";

type NewTaskForm = {
  title: string;
  date: string;
  text: string;
};

const NewTaskForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTaskForm>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  // @ts-ignore
  const submit: SubmitHandler<NewTaskForm> = (data) => {
    navigate('/home')
  };
  // @ts-ignore
  const error: SubmitErrorHandler<NewTaskForm> = (data) => {
  };

  return (
    <form
      className="flex justify-center items-start w-full max-w-64 flex-col gap-5"
      onSubmit={handleSubmit(submit, error)}>
      <Input
        type="text"
        placeholder="Task Title"
        {...register("title", {
          validate: (value) => {
            return !!value.trim() || "Title field is empty";
          },
        })}
      />
      {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
      <Input type="date" style={{ color: "rgb(64 64 64)" }} {...register("date")} />
      <Textarea
        placeholder="Add your task details"
        {...register("text", {
          validate: (value) => {
            return !!value.trim() || "Title field is empty";
          },
        })}
      />
      {errors.text && <p className="text-xs text-red-400">{errors.text.message}</p>}
      <ButtonMain className="mt-7" type="submit" disabled={false}>
        Create task
      </ButtonMain>
    </form>
  );
};

export default NewTaskForm;
