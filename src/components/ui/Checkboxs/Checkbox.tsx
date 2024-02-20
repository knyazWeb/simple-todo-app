import { useState } from 'react';
import css from './Checkbox.module.scss'
import cx from 'classnames'
import Checksvg from './check.svg';

type CheckboxProps = {
  isDisabled?: boolean;
  children?: React.ReactNode;
};

const Checkbox = ({ children, isDisabled }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <label className={css.label}>
      <input
        disabled={isDisabled}
        className={css.blind_input}
        type='checkbox'
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <span
        className={cx(
          css.checkbox,
          isChecked ? css['checkbox-active'] : '',
          isDisabled ? css.disabled : ''
        )}
        aria-hidden='true'
      >
        <Checksvg /> 
      </span>

      {children}
    </label>
  );
};

export default Checkbox