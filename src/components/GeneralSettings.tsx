import { SetStateAction } from "react";
import Button from "./UI/Button";
import ColorPicker from "./UI/ColorPicker";
import { GradientLayer } from "./gradientLayersReducer";
import Input from "./UI/Input";
import { style } from "../style";

type GeneralSettingsProps = {
  backgroundInvert: "1" | "0";
  setBackgroundInvert: React.Dispatch<SetStateAction<"1" | "0">>;
  backgroundColor: string;
  setBackgroundColor: React.Dispatch<SetStateAction<string>>;
  backgroundBlur: string;
  setBackgroundBlur: React.Dispatch<SetStateAction<string>>;
  backgroundOpacity: string;
  setBackgroundOpacity: React.Dispatch<SetStateAction<string>>;
  gradientLayers: GradientLayer[];
};

export default function GeneralSettings(props: GeneralSettingsProps) {
  const {
    backgroundBlur,
    setBackgroundBlur,
    backgroundOpacity,
    setBackgroundOpacity,
    backgroundInvert,
    setBackgroundInvert,
    backgroundColor,
    setBackgroundColor,
  } = props;

  const handleBackgroundChange = (backgroundColor: string) => {
    const timeout = setTimeout(() => {
      setBackgroundColor(backgroundColor);
    }, 0);
    return () => clearTimeout(timeout);
  };

  return (
    <div>
      <div className="flex flex-col flex-wrap justify-center pb-8">
        <h2 className={`${style.h2} ${style.button} select-none text-center`}>
          General Settings
        </h2>
        <div
          className={`flex flex-wrap items-start justify-center ${style.card}`}
        >
          {/**<Button
            text={`${!toggleTailwindCode ? "Tailwind" : "CSS"}`}
            onClick={() => setToggleTailwindCode((prev) => !prev)}
            buttonStyles={"normal"}
            buttonStylesHover={"normal"}
          />*/}
          <ColorPicker
            value={backgroundColor}
            onChange={(backgroundColor: string) =>
              handleBackgroundChange(backgroundColor)
            }
            text={`Background`}
          />
          <Input
            min={0}
            max={600}
            step={1}
            value={backgroundBlur}
            onChange={(e) => setBackgroundBlur(e)}
            text={`Blur ${backgroundBlur}px`}
            type={"range"}
            classNameText="w-[110px]"
          />
          <Input
            min={0}
            max={100}
            step={1}
            value={backgroundOpacity}
            onChange={(e) => setBackgroundOpacity(e)}
            text={`Opacity ${backgroundOpacity}%`}
            type={"range"}
            className="w-[130px]"
            classNameInput="w-[130px]"
          />
          <Button
            text={`${backgroundInvert === "0" ? "Invert" : "Normal"}`}
            onClick={() =>
              setBackgroundInvert((prev) => (prev === "1" ? "0" : "1"))
            }
            buttonStyles={"normal"}
            buttonStylesHover={"normal"}
          />
        </div>
      </div>
      <span className="mx-2 flex border-b border-black/25 pb-8" />
    </div>
  );
}
