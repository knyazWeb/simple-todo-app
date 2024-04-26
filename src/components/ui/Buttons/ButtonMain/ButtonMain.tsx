import { ButtonType } from "../ButtonType.ts";

type ButtonMainProps = {
  type: ButtonType;
  children: React.ReactNode;
  disabled: boolean;
  sizePadding?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonMain = ({ type, children, disabled, sizePadding, className, onClick }: ButtonMainProps) => {
  return (
    <button
      disabled={disabled}
      className={`w-full text-white rounded-xl ${sizePadding ? sizePadding : "py-3.5 px-2"} ${className ? className : ""} ${disabled ? "bg-gray-500" : "bg-red-400"} hover:bg-red-500 transition-colors duration-500`}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonMain;
