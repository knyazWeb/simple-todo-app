import { GoPlus } from "react-icons/go";

import ButtonMenu from "../ui/Buttons/ButtonMenu/ButtonMenu.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { BsFileEarmarkCheck } from "react-icons/bs";

import { IoPersonOutline } from "react-icons/io5";

import { GoHome } from "react-icons/go";
import { useEffect, useState } from "react";

const MenuPanel = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [htmlPaddingRight, setHtmlPaddingRight] = useState(0);

  useEffect(() => {
    const updatePaddingRight = () => {
      const paddingRight = window.getComputedStyle(document.documentElement).getPropertyValue("padding-right");
      setHtmlPaddingRight(parseInt(paddingRight, 10));
    };

    const observer = new MutationObserver(updatePaddingRight);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });

    updatePaddingRight();

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className={`fixed bottom-0 right-1/2 translate-x-1/2 w-full h-16 bg-white border-t border-black pl-8 ${htmlPaddingRight == 15 ? 'pr-[47px]' : 'pr-8' }`}>
      <div className="flex justify-between items-center h-full max-w-md mx-auto my-0 ">
        <ButtonMenu
          onClick={() => navigate("/")}
          type="button"
          title="Home"
          disabled={currentLocation.pathname === "/"}>
          <GoHome size={25} />
        </ButtonMenu>
        <ButtonMenu
          onClick={() => navigate("/calendar")}
          type="button"
          title="Table"
          disabled={currentLocation.pathname === "/calendar"}>
          <CiCalendar size={25} />
        </ButtonMenu>
        <ButtonMenu
          onClick={() => navigate("/createTask")}
          type="button"
          title="Create task"
          disabled={currentLocation.pathname === "/createTask"}>
          <div className="rounded-full p-2 bg-red-400">
            <GoPlus size={25} color="white" />
          </div>
        </ButtonMenu>
        <ButtonMenu
          onClick={() => navigate("/completed")}
          type="button"
          title="Tasks"
          disabled={currentLocation.pathname === "/completed"}>
          <BsFileEarmarkCheck size={25} />
        </ButtonMenu>
        <ButtonMenu
          onClick={() => navigate("/profile")}
          type="button"
          title="Profile"
          disabled={currentLocation.pathname === "/profile"}>
          <IoPersonOutline size={25} />
        </ButtonMenu>
      </div>
    </div>
  );
};

export default MenuPanel;
