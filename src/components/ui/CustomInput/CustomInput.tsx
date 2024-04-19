import { forwardRef, useState } from "react";
import css from "./CustomInput.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CustomInput = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(({ type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full rounded-xl">
      <input
        ref={ref}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...props}
        className={` py-1.5 px-3 w-full text-base rounded-xl border border-solid border-black ${css.shadow}`}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
          {showPassword ? (
            <FaEyeSlash size={18} color="rgb(248, 88, 88)" />
          ) : (
            <FaEye size={18} color="rgb(248, 88, 88)" />
          )}
        </button>
      )}
    </div>
  );
});

export default CustomInput;
