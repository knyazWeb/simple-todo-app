import { ButtonType } from '../ButtonTypes';

type ButtonIconProps = {
  children: React.ReactNode;
  type: ButtonType;
  color: string;
  borderRadius: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonIcon = ({children, type, color, borderRadius, onClick}: ButtonIconProps) => {
  return (
    <button type={type} onClick={onClick} className={`w-9 h-9 flex justify-center items-center ${color} ${borderRadius}`}>
      {children}
    </button>
  )
}

export default ButtonIcon