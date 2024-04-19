import css from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className='absolute z-10 w-screen h-screen top-0 left-0 bg-opacity-35 bg-black'>
      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-red-400 flex items-center justify-center ">
        <div
          className={`  absolute top-1/2 left-1/2 w-28 h-28 bg-transparent border-4 border-t-transparent  border-white rounded-full ${css.anim}`}></div>
      </div>
    </div>
  );
};

export default Loading;
