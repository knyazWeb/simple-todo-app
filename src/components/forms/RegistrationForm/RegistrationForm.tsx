import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import ButtonMain from "../../ui/Buttons/ButtonMain/ButtonMain";
import Input from "../../ui/input/Input";
import { regExpEmail } from "./regExpEmail";

type RegistrationForm = {
  name: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    defaultValues: {},
  });

  const submit: SubmitHandler<RegistrationForm> = data => {
    console.log(data);
  };

  const error: SubmitErrorHandler<RegistrationForm> = data => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(submit, error)}
      className="flex justify-center items-center flex-col gap-5">
      <Input type="text" placeholder="Name" {...register("name", {
        required: true, minLength: {
          value: 2,
          message: "Write the correct name",
        },
      })} />
      {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}

      <Input
        type="text"
        placeholder="E-mail"
        {...register("email", {
          required: "Enter your email",
          pattern: {
            value: regExpEmail,
            message: "Wrong e-mail, enter a correct e-mail",
          },
        })} />
      {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}

      <Input placeholder="Password" type="password" {...register("password", {
        required: "Create a password",
        minLength: {
          value: 5,
          message: "Minimum password length is 5",
        },
      })} />
      {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
      <ButtonMain type="submit" disabled={false}>Submit</ButtonMain>
    </form>
  );
};

export default RegistrationForm;
