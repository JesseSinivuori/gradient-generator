import { style } from "../../style";

type ButtonProps = {
  onClick: () => void;
  text?: string;
  className?: string;
  classNameButton?: string;
  buttonStyles: "normal" | "danger" | "";
  buttonStylesHover: "normal" | "danger" | "";
  children?: React.ReactNode;
};

export default function Button(props: ButtonProps) {
  const {
    onClick,
    text,
    className,
    classNameButton,
    buttonStyles,
    buttonStylesHover,
    children,
  } = props;

  const buttonClass = `${buttonStyles === "normal" && style.button}
    ${buttonStyles === "danger" && style.buttonDanger}
    ${buttonStyles === "" && ""}`;

  const buttonClassHover = `${
    buttonStylesHover === "normal" && style.buttonHover
  }
    ${buttonStylesHover === "danger" && style.buttonHoverDanger}
    ${buttonStylesHover === "" && ""}`;

  return (
    <div className={`${className}`}>
      <button
        type="button"
        onClick={onClick}
        className={`${buttonClass} ${buttonClassHover} ${classNameButton} select-none`}
      >
        {text}
        {children}
      </button>
    </div>
  );
}
