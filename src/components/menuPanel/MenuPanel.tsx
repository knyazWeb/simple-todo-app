import { RiLogoutBoxLine } from "react-icons/ri";
import { GoPlus } from "react-icons/go";

import ButtonIcon from "../ui/Buttons/ButtonIcon/ButtonIcon.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux.ts";
import { CiCalendar } from "react-icons/ci";
import { TbCheckupList } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";

import { GoHome } from "react-icons/go";

const MenuPanel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentLocation = useLocation();

  return (
    <div className="fixed bottom-0 right-1/2 translate-x-1/2 w-full h-16 bg-white border-t border-black px-8">
      <div className="flex justify-between items-center h-full max-w-md mx-auto my-0 ">
        <ButtonIcon
          onClick={() => navigate("/")}
          type="button"
          title="Home"
          disabled={currentLocation.pathname === "/"}
          borderRadius="rounded-full">
          <GoHome size={25} />
        </ButtonIcon>

        {/*TODO: название table под вопросом*/}
        <ButtonIcon
          onClick={() => navigate("/table")}
          type="button"
          title="Table"
          disabled={currentLocation.pathname === "/table"}
          borderRadius="rounded-full">
          <CiCalendar size={25} />
        </ButtonIcon>
        <ButtonIcon
          onClick={() => navigate("/createTask")}
          type="button"
          title="Create task"
          disabled={currentLocation.pathname === "/createTask"}
          borderRadius="rounded-full">
          <div style={{ backgroundColor: "#F26E56" }} className="rounded-full p-2">
            <GoPlus size={25} color="white" />
          </div>
        </ButtonIcon>
        <ButtonIcon
          onClick={() => navigate("/tasks")}
          type="button"
          title="Tasks"
          disabled={currentLocation.pathname === "/tasks"}
          borderRadius="rounded-full">
          <TbCheckupList size={25} />
        </ButtonIcon>
        <ButtonIcon
          onClick={() => navigate("/profile")}
          type="button"
          title="Profile"
          disabled={currentLocation.pathname === "/profile"}
          borderRadius="rounded-full">
          <IoPersonOutline size={25} />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default MenuPanel;
