import { style } from "../../style";
import styles from "./Input.module.css";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: string;
  onChange: (e: string) => void;
  text: string;
  type: string;
  className?: string;
  classNameText?: string;
  classNameInput?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function Input(props: SliderProps) {
  const {
    min,
    max,
    step,
    value,
    onChange,
    text,
    type,
    className,
    classNameText,
    classNameInput,
    children,
    disabled,
  } = props;

  return (
    <div className="items-center justify-start px-2">
      <div className={`${className} select-none flex-col`}>
        <label>
          <div className="relative flex w-full flex-col items-center text-center">
            <p className={`${style.button} ${styles} ${classNameText} w-full`}>
              {text}
            </p>
            <input
              className={`${classNameInput} m-2 flex w-full
              rounded-md bg-transparent bg-opacity-50
              text-center text-white outline-none`}
              type={type}
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
            />
            {children && children}
          </div>
        </label>
      </div>
    </div>
  );
}
