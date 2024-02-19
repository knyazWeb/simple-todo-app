import { ButtonType } from "../ButtonTypes"

type ButtonMainProps = {
  type: ButtonType;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonMain = ({type, children, onClick}: ButtonMainProps) => {
  return (
    <button  className="max-w-64 w-full bg-red-400 text-white rounded-xl py-3.5 px-2" type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default ButtonMain