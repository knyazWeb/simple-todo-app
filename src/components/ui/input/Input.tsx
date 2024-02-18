import {  forwardRef } from 'react';
import css from './Input.module.scss';


const Input = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>((props, ref) => (
  <input ref={ref} {...props} className={`py-3 px-3 w-full max-w-64  rounded-xl border border-solid border-black ${css.shadow}`} />
));

export default Input;
