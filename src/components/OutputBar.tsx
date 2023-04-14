import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import {
  AnimationSettings,
  Gradient,
  GradientLayer,
  Button,
  GradientLayers,
} from "./index";
import ReactDOMServer from "react-dom/server";

type OutputBarProps = {
  backgroundBlur: string;
  backgroundOpacity: string;
  backgroundInvert: string;
  layer: GradientLayer;
  index: number;
  animationSettings: AnimationSettings[];
  gradientLayers: GradientLayer[];
  outputAllLayers: boolean;
};

export default function OutputBar(props: OutputBarProps) {
  const {
    backgroundBlur,
    backgroundOpacity,
    backgroundInvert,
    animationSettings,
    index,
    layer,
    gradientLayers,
    outputAllLayers,
  } = props;

  const gradientCode = (
    <Gradient
      layer={layer}
      index={index}
      animationSettings={animationSettings[index]}
      backgroundBlur={backgroundBlur}
      backgroundOpacity={backgroundOpacity}
      backgroundInvert={backgroundInvert}
    />
  );

  const gradientCodeAllLayers = (
    <GradientLayers
      animationSettings={animationSettings}
      gradientLayers={gradientLayers}
      backgroundBlur={backgroundBlur}
      backgroundOpacity={backgroundOpacity}
      backgroundInvert={backgroundInvert}
    />
  );

  const gradientCodeAsString = (gradientCode: JSX.Element) => {
    const gradientCodeAsString =
      ReactDOMServer.renderToStaticMarkup(gradientCode);
    const formattedGradientCodeAsString = gradientCodeAsString
      .replace(/class="/g, 'className="')
      .replace(/style="([^"]*?)"/g, (match, group) => {
        const updatedStyle = group
          .replace(/;/g, ",")
          .replace(/([^ :,]+):/g, (_: string, prop: string) => `${prop}: "`)
          .replace(
            /,([^ ,]+):/g,
            (match: string, prop: string) => `",\n        ${prop}:`
          );
        return `style={{${updatedStyle}"}}`;
      })
      .replace(/className="(.*?)"/g, "className={`$1`}")
      .replace(/(<style>)/g, "$1\n      {`")
      .replace(/(<\/style>)/g, "`}\n      $1\n  ")
      .replace(/-(?!gradient)([a-z])/g, (_: string, letter: string) =>
        letter.toUpperCase()
      );

    return formattedGradientCodeAsString;
  };

  const notify = () => toast("Copied to clipboard.");

  const handleCopy = () => {
    outputAllLayers
      ? copy(`<>${gradientCodeAsString(gradientCodeAllLayers)}</>`)
      : copy(gradientCodeAsString(gradientCode));
    notify();
  };

  return (
    <div
      className="absolute bottom-0 flex 
    h-full max-h-[90px] w-full max-w-[1000px] items-center
    justify-center overflow-hidden rounded-md bg-black/50 p-4 text-zinc-400/50
     backdrop-blur-xl transition-all duration-100 hover:max-h-[200px] hover:text-white
     
    "
    >
      <p className="mr-40 h-full flex-1 overflow-hidden overscroll-none hover:overflow-auto">
        {outputAllLayers
          ? "<>" + gradientCodeAsString(gradientCodeAllLayers) + "</>"
          : gradientCodeAsString(gradientCode)}
      </p>
      <div className="absolute right-0 bottom-5">
        <Button
          onClick={handleCopy}
          text={`Copy ${outputAllLayers ? "all layers" : "layer"}`}
          buttonStyles={"normal"}
          buttonStylesHover={"normal"}
        />
      </div>
    </div>
  );
}
