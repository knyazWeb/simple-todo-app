import { ButtonType } from "../ButtonType.ts";

type ButtonIconProps = {
  children: React.ReactNode;
  type: ButtonType;
  color: string;
  borderRadius: string;
  disabled?: boolean;
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
      className={`w-9 h-9 flex justify-center items-center ${borderRadius} ${disabled ? 'bg-cyan-900' : color}`}>
      {children}
    </button>
  );
};

export default ButtonIcon;
