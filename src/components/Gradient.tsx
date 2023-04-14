import { AnimationSettings } from "./animationSettingsReducer";
import { GradientLayer } from "./gradientLayersReducer";

type GradientLayerProps = {
  backgroundBlur: string;
  backgroundOpacity: string;
  backgroundInvert: string;
  layer: GradientLayer;
  index: number;
  animationSettings: AnimationSettings;
};

export default function Gradient(props: GradientLayerProps) {
  const {
    backgroundBlur,
    backgroundOpacity,
    backgroundInvert,
    index,
    layer,
    animationSettings,
  } = props;

  const {
    toggleAnimate,
    animationTime,
    opacityStart,
    opacityEnd,
    animationDirection,
  }: AnimationSettings = animationSettings;

  const {
    colors,
    angle,
    gradientType,
    width,
    height,
    opacity,
    blur,
  }: GradientLayer = layer;

  const gradientCode = () => {
    const sortedColors = [...colors].sort(
      (a, b) => parseInt(a.stop) - parseInt(b.stop)
    );
    const gradientTypeParam =
      gradientType === "linear-gradient" ? `${angle}deg` : "circle";
    return `${gradientType}(${gradientTypeParam}, ${sortedColors
      .map(
        (color) =>
          `${hexToRgba(color.color, parseFloat(color.opacity))} ${color.stop}%`
      )
      .join(", ")})`;
  };

  function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <div
      style={{
        opacity: `${backgroundOpacity}%`,
        filter: `blur(${backgroundBlur}px) invert(${backgroundInvert})`,
        display: "flex",
        height: "100%",
        width: "100%",
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: `${index}`,
          width: `${width}%`,
          height: `${height}%`,
          background: `${gradientCode()}`,
          filter: `blur(${blur}px)`,
          opacity: `${opacity}`,
          animation: `${
            toggleAnimate &&
            `animateOpacity${
              index + 1
            } ${animationTime}s linear infinite, animateRotation${
              index + 1
            } ${animationTime}s linear infinite`
          }`,
        }}
      ></div>
      {toggleAnimate && (
        <style>
          {`
          @keyframes animateOpacity${index + 1} {
            0% {
              opacity: ${opacityStart}%;
            }
            50% {
              opacity: ${opacityEnd}%;
            }
            100% {
              opacity: ${opacityStart}%;
            }
          }
          
          @keyframes animateRotation${index + 1} {
            0% {
              transform: rotate(0deg);
            }
            ${animationDirection === "normal" ? "100%" : "0%"} {
              transform: rotate(360deg);
            }
          }
        `}
        </style>
      )}
    </div>
  );
}
