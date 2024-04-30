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
    resetField,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {},
  });

  const [signIn, { data: responseData, isLoading, isSuccess, isError, error }] = useSignInMutation();

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
    await signIn(user)
      .unwrap()
      .catch(() => {
        resetField("password", { keepError: true });
      });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex justify-center items-start w-full flex-col gap-5">
      <div className="w-full">
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
        {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>}
      </div>
      <div className="w-full">
        <CustomInput
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Create a password",
            minLength: {
              value: 6,
              message: "Minimum password length is 6",
            },
          })}
        />
        {errors.password && <p className="mt-2 text-xs text-red-400">{errors.password.message}</p>}
      </div>
      <div className="w-full">
        <ButtonMain className="mt-5" type="submit" disabled={false}>
          {isLoading ? "Loading..." : "Log in"}
        </ButtonMain>
        {isError && (
          <span className="block w-full mt-2 text-center text-xs text-red-400">
            Error: {(error as any).data.error.message}
          </span>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
