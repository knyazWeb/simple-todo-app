import { ButtonType } from "../ButtonType.ts";

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
      className={`w-9 h-9 flex justify-center items-center hover:brightness-95 ease-in-out duration-300 ${borderRadius} ${color || ''}`}>
      {children}
    </button>
  );
};

export default ButtonIcon;
