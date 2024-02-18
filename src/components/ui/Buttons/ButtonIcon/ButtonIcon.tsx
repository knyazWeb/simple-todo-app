import { ButtonType } from '../ButtonTypes';

type ButtonIconProps = {
  children: React.ReactNode;
  type: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonIcon = ({children, type, onClick}: ButtonIconProps) => {
  return (
    <button type={type} onClick={onClick} className='w-9 h-9 flex justify-center items-center bg-gray-300 rounded-lg'>
      {children}
    </button>
  )
}

export default ButtonIcon