import { FaPlus } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";

import ButtonIcon from "../ui/Buttons/ButtonIcon/ButtonIcon.tsx";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux.ts";
import { logout } from "../../store/reducers/authSlice.ts";

const MenuPanel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="fixed bottom-0 right-1/2 translate-x-1/2 w-full flex justify-between items-center h-16 bg-white border-t border-black px-8">
      <ButtonIcon
        onClick={() => {
          dispatch(logout());
          navigate("/");
        }}
        type="button"
        color="bg-red-400"
        borderRadius="rounded-full">
        <RiLogoutBoxLine color="white" />
      </ButtonIcon>

      <ButtonIcon onClick={() => navigate("/createTask")} type="button" color="bg-red-400" borderRadius="rounded-full">
        <FaPlus color="white" />
      </ButtonIcon>
    </div>
  );
};

export default MenuPanel;
