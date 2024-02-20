import { ButtonType } from "../ButtonTypes"

type ButtonMainProps = {
  type: ButtonType;
  children: React.ReactNode;
  disabled: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonMain = ({type, children, disabled, onClick}: ButtonMainProps) => {
  return (
    <button disabled={disabled}  className={`max-w-64 w-full text-white rounded-xl py-3.5 px-2 ${disabled ? 'bg-gray-500' : 'bg-red-400'}`} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default ButtonMain