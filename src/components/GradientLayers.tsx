import { AnimationSettings } from "./animationSettingsReducer";
import Gradient from "./Gradient";
import { GradientLayer } from "./gradientLayersReducer";

type GradientLayersProps = {
  gradientLayers: GradientLayer[];
  backgroundBlur: string;
  backgroundOpacity: string;
  backgroundInvert: string;
  animationSettings: AnimationSettings[];
};

export default function GradientLayers(props: GradientLayersProps) {
  const {
    gradientLayers,
    backgroundBlur,
    backgroundOpacity,
    backgroundInvert,
    animationSettings,
  } = props;
  return (
    <>
      {gradientLayers.map((layer, index) => (
        <Gradient
          layer={layer}
          index={index}
          key={index}
          backgroundBlur={backgroundBlur}
          backgroundOpacity={backgroundOpacity}
          backgroundInvert={backgroundInvert}
          animationSettings={animationSettings[index]}
        />
      ))}
    </>
  );
}
