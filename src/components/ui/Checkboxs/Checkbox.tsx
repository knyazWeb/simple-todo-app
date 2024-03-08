import React, { useState } from 'react';
import css from './checkbox.module.scss'
import cx from 'classnames'
import Checksvg from './check.svg';
import { UseFormRegisterReturn } from "react-hook-form";


type CheckboxProps = {
  register: UseFormRegisterReturn;
  errorMessage?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  children?: React.ReactNode;
  clearErrors?: () => void;
};

const Checkbox = React.memo(({ register, errorMessage, children, isRequired, isDisabled, clearErrors }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  console.log(isChecked)
  return (
    <label className={`flex items-center text-gray-400 ${css.label}`}>
      <input
        disabled={isDisabled}
        className={css.blind_input}
        {...register}
        type='checkbox'
        required={isRequired}
        onChange={() => {
          setIsChecked(!isChecked);
          clearErrors?.()
        }}
      />
      <span
        className={cx(
          css.checkbox,
          isChecked ? css['checkbox-active'] : '',
          isDisabled ? css.disabled : '',
          errorMessage ? css.error : '',
        )}
        aria-hidden='true'
      >

        <Checksvg /> 
      </span>

      {children}
    </label>
  );
});

export default Checkbox