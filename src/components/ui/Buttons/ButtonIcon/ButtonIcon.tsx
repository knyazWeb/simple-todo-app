import { ButtonType } from "../ButtonType.ts";
import css from "./ButtonIcon.module.scss";

type ButtonIconProps = {
  children: React.ReactNode;
  type: ButtonType;
  borderRadius: string;
  disabled?: boolean;
  color?: string;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonIcon = ({ children, type, color, borderRadius, disabled, title, onClick }: ButtonIconProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      title={title}
      className={`w-9 h-9 flex justify-center items-center ${borderRadius} ${color || ''} ${disabled ? css.active : css.default}`}>
      {children}
    </button>
  );
};

export default ButtonIcon;
