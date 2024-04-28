import React from "react";
import { MdNavigateNext } from "react-icons/md";

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
      <div className="flex items-center gap-2 ">
        <div className="rounded-lg bg-gray-200 w-9 h-9 flex justify-center items-center">
          <IconSVG size={25} />
        </div>

        <div>{name}</div>
      </div>

      <div>
        <MdNavigateNext size={25} />
      </div>
    </button>
  );
};

export default ProfileCard;
