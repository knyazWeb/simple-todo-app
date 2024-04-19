import avatarIMG from './Avatar.jpg'

const Avatar = () => {
  
  return (
    <div className=" w-14 h-14">
      <img className="rounded-full" src={avatarIMG} alt="Avatar" />
    </div>
  );
}

export default Avatar