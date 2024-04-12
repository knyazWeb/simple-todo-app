import { forwardRef } from "react";
import css from "./CustomInput.module.scss";

const CustomInput = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`py-1.5 px-3 w-full text-base rounded-xl border border-solid border-black ${css.shadow}`}
  />
));

export default CustomInput;
