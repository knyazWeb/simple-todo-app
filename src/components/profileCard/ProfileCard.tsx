import React from "react";
import { MdNavigateNext } from "react-icons/md";
import ButtonIcon from "../ui/Buttons/ButtonIcon/ButtonIcon";

type ProfileCardProps = {
  IconSVG: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }>;
  name: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ProfileCard = ({ IconSVG, name, onClick }: ProfileCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex border p-2 border-black border-solid rounded-lg items-center justify-between ease-in-out duration-300 hover:bg-gray-200">
      <div className="flex items-center gap-2">
        <ButtonIcon type="button" color="bg-gray-200" borderRadius="rounded-lg">
          <IconSVG size={25} />
        </ButtonIcon>
        <div>{name}</div>
      </div>

      <div>
        <MdNavigateNext size={25} />
      </div>
    </button>
  );
};

export default ProfileCard;
