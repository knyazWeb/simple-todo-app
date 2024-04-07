import { FaPlus } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";

import ButtonIcon from "../ui/Buttons/ButtonIcon/ButtonIcon.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux.ts";
import { logout } from "../../store/reducers/authSlice.ts";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";

const MenuPanel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentLocation = useLocation();

  return (
    <div className="fixed bottom-0 right-1/2 translate-x-1/2  w-full  h-16 bg-white border-t border-black px-8">
      <div className="flex justify-around items-center h-full max-w-md mx-auto my-0 ">
        <ButtonIcon
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          type="button"
          color="bg-red-400"
          title="Logout"
          borderRadius="rounded-full">
          <RiLogoutBoxLine color="white" />
        </ButtonIcon>
        <ButtonIcon
          onClick={() => navigate("/createTask")}
          type="button"
          title="Create task"
          color="bg-red-400"
          disabled={currentLocation.pathname === "/createTask"}
          borderRadius="rounded-full">
          <FaPlus color="white" />
        </ButtonIcon>
        <ButtonIcon
          onClick={() => navigate("/")}
          type="button"
          color="bg-red-400"
          title="Home"
          disabled={currentLocation.pathname === "/"}
          borderRadius="rounded-full">
          <GoHome size={25} color="white" />
        </ButtonIcon>
        <ButtonIcon
          onClick={() => navigate("/completed")}
          type="button"
          color="bg-red-400"
          title="Completed tasks"
          disabled={currentLocation.pathname === "/completed"}
          borderRadius="rounded-full">
          <IoCheckmarkDoneCircleOutline size={25} color="white" />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default MenuPanel;
