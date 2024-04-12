
import css from './Error.module.scss'
import { RxCross1 } from "react-icons/rx";


const Error = () => {
  return (
    <div className="absolute z-10 w-screen h-screen top-0 left-0 bg-opacity-35 bg-black">
      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-red-400 flex items-center justify-center ">
        <div className={css.arrowWrapper}>
          <RxCross1 size={50} color="white" />
        </div>
      </div>
    </div>
  );
}

export default Error