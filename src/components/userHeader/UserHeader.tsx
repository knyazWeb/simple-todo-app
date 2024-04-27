import { useAppSelector } from "../../hooks/redux";
import { selectUser } from "../../store/reducers/authSlice";
import Avatar from "../ui/Avatar/Avatar";

const UserHeader = () => {
  const { userName } = useAppSelector(selectUser);
  return (
    <div className="flex justify-start items-center gap-3">
      <Avatar />
      <div>
        <span className="text-2xl font-bold block">
          Hi, <span className="capitalize break-all">{userName}</span> &#x1F44B;
        </span>
        <span className="block text-gray-400 text-sm">Your daily adventure starts now</span>
      </div>
    </div>
  );
};

export default UserHeader;
