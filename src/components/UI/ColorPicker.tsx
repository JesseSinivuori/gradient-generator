import { style } from "../../style";
import { Color, Input } from "../index";

type ColorPickerProps = {
  value: Color["color"];
  text: string;
  className?: string;
  onChange: (e: string) => void;
};

{
  /**
const hexToRGBA = (hex: string, opacity = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
*/
}

export default function ColorPicker(props: ColorPickerProps) {
  const { text, value, onChange } = props;
  return (
    <div className={`flex flex-col`}>
      <Input
        value={value}
        onChange={onChange}
        text={text}
        type="color"
        classNameText={`${style.buttonHover} cursor-pointer`}
      >
        <input
          className={`my-4 flex w-full rounded-md border border-transparent
        bg-transparent py-2 text-center text-white outline-none
        focus:border-white ${style.buttonHover}
        transition-all duration-300`}
          type={text}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Input>
    </div>
  );
}
