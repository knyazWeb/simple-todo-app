import { Dialog } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../../store/reducers/authSlice";
import ButtonIcon from "../../ui/Buttons/ButtonIcon/ButtonIcon";
import ButtonMain from "../../ui/Buttons/ButtonMain/ButtonMain";
import css from './ModalConfirm.module.scss';

type ModalConfirmProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  mainTitle: string;
};

const ModalConfirm = ({ isOpen, setIsOpen, mainTitle }: ModalConfirmProps) => {
  const dispatch = useAppDispatch();
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
            <div>
              <div className="flex justify-between gap-5">
                <ButtonMain onClick={() => {
                  dispatch(logout());
                }} sizePadding="px-6 py-2" type="button" disabled={false}>
                  Yes
                </ButtonMain>
                <ButtonMain onClick={() => {
                  setIsOpen(false);
                }} sizePadding="px-6 py-2" type="button" disabled={false}>
                  No
                </ButtonMain>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalConfirm;
