import { Dialog } from "@headlessui/react";
import ButtonIcon from "../../ui/Buttons/ButtonIcon/ButtonIcon";
import { RxCross2 } from "react-icons/rx";
import ButtonMain from "../../ui/Buttons/ButtonMain/ButtonMain";
import { selectUser, updateUserName } from "../../../store/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import CustomInput from "../../ui/CustomInput/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./ModalEditProfile.module.scss";
import { useUpdateNameMutation } from "../../../services/AuthService";

type ModalEditProfileProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  mainTitle: string;
};

type EditProfileForm = {
  name: string;
};

const ModalEditProfile = ({ isOpen, setIsOpen, mainTitle }: ModalEditProfileProps) => {
  const { userName } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const idToken = localStorage.getItem("token") ?? "";
  const [updateName, { isLoading: updateIsLoading, isSuccess }] = useUpdateNameMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<EditProfileForm>({
    defaultValues: {
      name: userName || "",
    },
  });
  const submit: SubmitHandler<EditProfileForm> = async (data) => {
    await updateName({ name: data.name, idToken: idToken })
      .unwrap()
      .then(() => {
        dispatch(updateUserName(data.name));
      });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 flex w-full items-center justify-center pr-4">
          <Dialog.Panel className={`${css.popup}`}>
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-xl font-bold ">{mainTitle}</Dialog.Title>
              <ButtonIcon onClick={() => setIsOpen(false)} type="button" color="bg-gray-200" borderRadius="rounded-lg">
                <RxCross2 color="black" />
              </ButtonIcon>
            </div>
            <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-start gap-6 w-full">
              <div>
                <CustomInput
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
                {errors.name && <p className="mt-2 text-xs text-red-400">{errors.name.message}</p>}
              </div>
              <div>
                <div className="flex justify-between gap-5">
                  <ButtonMain onClick={() => {}} sizePadding="px-6 py-2" type="submit" disabled={false}>
                    {updateIsLoading ? "Updating" : "Change"}
                  </ButtonMain>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalEditProfile;
