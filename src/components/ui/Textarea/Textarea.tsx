import { forwardRef } from "react";
import css from './textarea.module.scss';


const Textarea = forwardRef<HTMLTextAreaElement, React.HTMLProps<HTMLTextAreaElement>>((props, ref) => (
  <textarea
    ref={ref}
    {...props}
    className={`py-1.5 pl-3  w-full  text-base rounded-xl border border-solid border-black ${css.shadow} resize-none ${css.scrollbar} `}
  />
));


export default Textarea