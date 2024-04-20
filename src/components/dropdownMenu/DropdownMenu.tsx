import { IoEllipsisVertical } from "react-icons/io5";

type DropdownMenuProps = {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
};

const DropdownMenu = ({ isActive, setIsActive }: DropdownMenuProps) => {
  return (
    <div>
      <button
        onClick={() => setIsActive(!isActive)}
        className="w-7 h-7 flex justify-center items-center rounded-md bg-gray-200 hover:brightness-95 ease-in-out duration-300"
        type="button">
        <IoEllipsisVertical size={20} />
      </button>
    </div>
  );
};

export default DropdownMenu;
