import { ButtonType } from "../ButtonType.ts";

type ButtonIconProps = {
  children: React.ReactNode;
  type: ButtonType;
  color: string;
  borderRadius: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonIcon = ({ children, type, color, borderRadius, disabled, onClick }: ButtonIconProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`w-9 h-9 flex justify-center items-center ${borderRadius} ${disabled ? 'bg-cyan-900' : color}`}>
      {children}
    </button>
  );
};

export default ButtonIcon;
