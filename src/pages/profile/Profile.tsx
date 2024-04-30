import { useState } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BsQuestionOctagon } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { GoVerified } from "react-icons/go";
import { IoIosArrowBack, IoMdNotificationsOutline } from "react-icons/io";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "../../components/modals/modalConfirm/ModalConfirm";
import ProfileCard from "../../components/profileCard/ProfileCard";
import Avatar from "../../components/ui/Avatar/Avatar";
import ButtonIcon from "../../components/ui/Buttons/ButtonIcon/ButtonIcon";
import ButtonMain from "../../components/ui/Buttons/ButtonMain/ButtonMain";
import { useAppSelector } from "../../hooks/redux";
import { useGetTasksQuery } from "../../services/TasksService";
import { selectUser } from "../../store/reducers/authSlice";
import ModalEditProfile from "../../components/modals/modalEditProfile/ModalEditProfile";


const Profile = () => {
  const navigate = useNavigate();
  const { isAuth, userId, userName } = useAppSelector(selectUser);
  
  const { data } = useGetTasksQuery(userId, { skip: !isAuth });
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const rank = "Beginner";

  const tasksStatus = {
    inProcess: 0,
    completed: 0,
  };
  if (data) {
    for (const key in data) {
      if (data[key].status === "In process") {
        tasksStatus.inProcess += 1;
      }
      if (data[key].status === "Completed") {
        tasksStatus.completed += 1;
      }
    }
  }
  
 

  return (
    <div className="w-full pb-20 flex flex-col">
      <div className="mb-4">
        <ButtonIcon onClick={() => navigate(-1)} type="button" color="bg-gray-200" borderRadius="rounded-lg">
          <IoIosArrowBack size={25} />
        </ButtonIcon>
      </div>
      <div className="flex items-center justify-center gap-3 mb-3.5">
        <div className="flex justify-center items-center flex-col ">
          <span className="block font-bold text-sm">{tasksStatus.inProcess}</span>
          <span className="block text-center text-gray-400 text-xs">In Process tasks</span>
        </div>
        <div>
          <Avatar size="w-24 h-24" />
        </div>
        <div className="flex justify-center items-center flex-col">
          <span className="block font-bold text-sm">{tasksStatus.completed}</span>
          <span className="block text-center text-xs text-gray-400">Completed tasks</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5 mb-8">
        <div className="text-center">
          <span className=" text-2xl font-bold capitalize leading-none">{userName}</span>
        </div>
        <div className="text-center mb-4">
          <span className="bg-gray-200 py-1 px-5 text-gray-500 rounded-lg">{rank}</span>
        </div>
        <div className="w-fit">
          <ButtonMain onClick={() => setShowEditProfile(true)} sizePadding={"px-6 py-2"} type="button" disabled={false}>
            Edit Profile
          </ButtonMain>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <ProfileCard IconSVG={IoMdNotificationsOutline} name="Notifications" />
        <ProfileCard IconSVG={AiOutlineSafetyCertificate} name="Security" />
        <ProfileCard IconSVG={CiGlobe} name="Language and Region" />
        <ProfileCard IconSVG={GoVerified} name="Go Premium" />
        <ProfileCard IconSVG={BsQuestionOctagon} name="Help Center" />
        <ProfileCard IconSVG={IoExitOutline} name="Exit" onClick={() => setShowExitConfirm(true)} />
      </div>
      {showEditProfile && (
        <ModalEditProfile mainTitle="Edit profile name" isOpen={showEditProfile} setIsOpen={setShowEditProfile} />
      )}
      {showExitConfirm && (
        <ModalConfirm mainTitle="Do you want to leave?" isOpen={showExitConfirm} setIsOpen={setShowExitConfirm} />
      )}
    </div>
  );
};

export default Profile;
