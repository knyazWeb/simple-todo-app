import { ButtonType } from "../ButtonType.ts";
import css from './ButtonMenu.module.scss';

type ButtonMenuProps = {
  children: React.ReactNode;
  type: ButtonType;
  title?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonMenu = ({children, type, title, disabled, onClick}: ButtonMenuProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      title={title}
      onClick={onClick}
      className={`w-fit h-fit flex justify-center items-center  rounded-full ${disabled ? css.active : css.default}`}>
      {children}
    </button>
  );
};

export default ButtonMenu;