import { forwardRef } from "react";
import css from "./Input.module.scss";


const Input = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>((props, ref) => (
  <input ref={ref} {...props}
         className={`py-1.5 px-3 w-full max-w-64 text-base rounded-xl border border-solid border-black ${css.shadow}`} />
));

export default Input;
