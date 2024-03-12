import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ButtonMain from "../../ui/Buttons/ButtonMain/ButtonMain";
import Checkbox from "../../ui/Checkboxs/Checkbox.tsx";
import Input from "../../ui/Input/Input.tsx";
import { regExpEmail } from "./regExpEmail";

type RegistrationForm = {
  name: string;
  email: string;
  password: string;
  checkbox: boolean;
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<RegistrationForm>({
    defaultValues: {},
  });

  const submit: SubmitHandler<RegistrationForm> = (data) => {
    navigate("/home");
  };
  // @ts-ignore
  const error: SubmitErrorHandler<RegistrationForm> = (data) => {};
  return (
    <form
      onSubmit={handleSubmit(submit, error)}
      className="flex justify-center items-start w-full max-w-64 flex-col gap-5 text-">
      <Input
        type="text"
        placeholder="Name"
        {...register("name", {
          required: "Write your name",
          minLength: {
            value: 2,
            message: "Write the correct name",
          },
        })}
      />
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
        })}
      />
      {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}

      <Input
        placeholder="Password"
        type="password"
        {...register("password", {
          required: "Create a password",
          minLength: {
            value: 5,
            message: "Minimum password length is 5",
          },
        })}
      />
      {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
      {/*TODO FIX PROBLEM IN SAFARI*/}
      <Checkbox
        clearErrors={() => clearErrors("checkbox")}
        errorMessage={errors.checkbox?.message}
        register={register("checkbox", { required: "Accept" })}>
        <span className="ml-3 text-sm cursor-pointer underline">I agree to privacy policy & terms</span>{" "}
      </Checkbox>
      <ButtonMain className="mt-7" type="submit" disabled={false}>
        Submit
      </ButtonMain>
    </form>
  );
};

export default RegistrationForm;
