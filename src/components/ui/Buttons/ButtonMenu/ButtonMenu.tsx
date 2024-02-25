import { ButtonType } from "../ButtonTypes.ts";

type ButtonMenuProps = {
  children: React.ReactNode;
  type: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonMenu = ({children, type, onClick}: ButtonMenuProps) => {
  return (
    <button type={type} onClick={onClick} className='w-9 h-9 flex justify-center items-center bg-red-400 rounded-full'>
      {children}
    </button>
  );
};

export default ButtonMenu;