import { useRef } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { Transition } from "react-transition-group";

type DropdownMenuProps = {
  isDropdownActive: boolean;
  setIsDropdownActive: (value: boolean) => void;
  children: React.ReactNode;
};

const DropdownMenu = ({ isDropdownActive, setIsDropdownActive, children }: DropdownMenuProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => {
    if (isDropdownActive) {
      setIsDropdownActive(false);
    }
  });
  return (
    <div className="relative flex flex-col gap-0.5 items-end" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownActive(!isDropdownActive)}
        className="w-6 h-6 flex justify-center items-center border border-gray-400 rounded-md bg-gray-200 hover:brightness-95 ease-in-out duration-300"
        type="button">
        <IoEllipsisVertical size={18} />
      </button>
      <Transition nodeRef={dropdownMenuRef} in={isDropdownActive} timeout={200} unmountOnExit={true}>
        {(state) => (
          <div
            ref={dropdownMenuRef}
            className={`relative ${
              state === "entering" || state === "entered" ? "opacity-100" : "opacity-0"
            } text-black border-black border rounded-md text-xs  transition-opacity ease-in-out duration-200 flex flex-col items-start overflow-hidden`}>
            {children}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default DropdownMenu;
