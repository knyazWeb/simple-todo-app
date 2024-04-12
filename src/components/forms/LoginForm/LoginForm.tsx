import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../../services/AuthService";
import ButtonMain from "../../ui/Buttons/ButtonMain/ButtonMain";
import CustomInput from "../../ui/CustomInput/CustomInput";
import { regExpEmail } from "../regExpEmail";

type LoginForm = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {},
  });

  const [signIn, { data: responseData, isLoading, isSuccess }] = useSignInMutation();

  useEffect(() => {
    if (isSuccess && responseData) {
      navigate("/");
    }
  }, [isSuccess, responseData]);

  const submit: SubmitHandler<LoginForm> = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    await signIn(user);
  };
  // @ts-ignore
  const error: SubmitErrorHandler<RegistrationForm> = (data) => {};

  return (
    <form
      onSubmit={handleSubmit(submit, error)}
      className="flex justify-center items-start w-full max-w-64 flex-col gap-5 text-">
      <CustomInput
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

      <CustomInput
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

      <ButtonMain className="mt-5" type="submit" disabled={false}>
        {isLoading ? "Loading..." : "Log in"}
      </ButtonMain>
    </form>
  );
};

export default LoginForm;
