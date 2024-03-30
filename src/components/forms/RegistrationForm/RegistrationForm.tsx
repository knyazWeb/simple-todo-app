import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { useSignUpMutation, useUpdateNameMutation } from "../../../services/AuthService.ts";
import { login } from "../../../store/reducers/authSlice.ts";
import ButtonMain from "../../ui/Buttons/ButtonMain/ButtonMain";
import Checkbox from "../../ui/Checkboxs/Checkbox.tsx";
import Input from "../../ui/Input/Input.tsx";
import { regExpEmail } from "../regExpEmail.ts";

type RegistrationForm = {
  name: string;
  email: string;
  password: string;
  checkbox: boolean;
};

const RegistrationForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [userName, setUserName] = useState("");

  const [signUp, { data: responseData, isLoading, isSuccess }] = useSignUpMutation();

  const [updateName, { data: responseDataWithName }] = useUpdateNameMutation();

  useEffect(() => {
    if (isSuccess && responseData) {
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("refreshToken", responseData.refreshToken);
      updateName({ name: userName, idToken: responseData.idToken });
    }
  }, [isSuccess, responseData]);

  useEffect(() => {
    if (responseDataWithName) {
      //TODO: переписать если возможно через extraReducer
      dispatch(login({ user: responseDataWithName.displayName, isAuth: true }));
      navigate("/");
    }
  }, [responseDataWithName]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<RegistrationForm>({
    defaultValues: {},
  });

  const submit: SubmitHandler<RegistrationForm> = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    setUserName(data.name);
    await signUp(user);
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
      <ButtonMain className="mt-5" type="submit" disabled={false}>
        {isLoading ? "Loading..." : "Sign up"}
      </ButtonMain>
    </form>
  );
};

export default RegistrationForm;
