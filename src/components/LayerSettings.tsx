import { style } from "../style";
import {
  Button,
  ColorPicker,
  Color,
  GradientLayer,
  Input,
  Action,
  AnimationSettingsComponent,
  AnimationSettingsAction,
  AnimationSettings,
  refreshToggleAnimate,
} from "./index";

type LayerSettingsProps = {
  layer: GradientLayer;
  index: number;
  gradientLayers: GradientLayer[];
  gradientLayersDispatch: React.Dispatch<Action>;
  animationSettingsDispatch: React.Dispatch<AnimationSettingsAction>;
  animationSettings: AnimationSettings;
};

export default function LayerSettings(props: LayerSettingsProps) {
  const {
    layer,
    index,
    gradientLayers,
    gradientLayersDispatch,
    animationSettingsDispatch,
    animationSettings,
  } = props;

  const { toggleAnimate } = animationSettings;

  const handleColorChange = (
    index: number,
    colorIndex: number,
    newColor: Color
  ) => {
    const timeout = setTimeout(() => {
      gradientLayersDispatch({
        type: "UPDATE_COLOR",
        index,
        colorIndex,
        newColor,
      });
    }, 0);
    return () => clearTimeout(timeout);
  };

  const handleAddColor = (index: number, colorIndex: number) => {
    gradientLayersDispatch({ type: "ADD_COLOR", index, colorIndex });
  };

  function handleRemoveColor(index: number, colorIndex: number) {
    gradientLayersDispatch({ type: "REMOVE_COLOR", index, colorIndex });
  }

  const handleStopChange = (
    stop: Color["stop"],
    index: number,
    colorIndex: number
  ) => {
    const timeout = setTimeout(() => {
      gradientLayersDispatch({
        type: "UPDATE_COLOR_STOP",
        index,
        colorIndex,
        stop,
      });
    }, 0);
    return () => clearTimeout(timeout);
  };

  const handleRemoveLayer = (index: number) => {
    gradientLayersDispatch({ type: "REMOVE_LAYER", index });
    animationSettingsDispatch({ type: "REMOVE_ANIMATION_LAYER", index });
  };

  const handleAddLayer = (
    index: number,
    layer: GradientLayer,
    animationSettings: AnimationSettings
  ) => {
    gradientLayersDispatch({ type: "ADD_LAYER", index, layer });
    animationSettingsDispatch({
      type: "ADD_ANIMATION_LAYER",
      index,
      animationSettings,
    });
    refreshToggleAnimate(animationSettingsDispatch, animationSettings);
  };

  const handleAngleChange = (
    angle: GradientLayer["angle"],
    layer: GradientLayer,
    index: number
  ) => {
    const timeout = setTimeout(() => {
      gradientLayersDispatch({
        type: "UPDATE_ANGLE",
        angle,
        index,
        layer: {
          ...gradientLayers[index],
          angle,
        },
      });
    }, 0);
    return () => clearTimeout(timeout);
  };

  const handleOpacityChange = (
    opacity: Color["opacity"],
    index: number,
    colorIndex: number
  ) => {
    const timeout = setTimeout(() => {
      gradientLayersDispatch({
        type: "UPDATE_COLOR_OPACITY",
        index,
        colorIndex,
        opacity,
      });
    }, 0);
    return () => clearTimeout(timeout);
  };

  const handleLayerOpacityChange = (
    opacity: GradientLayer["opacity"],
    layer: GradientLayer,
    index: number
  ) => {
    const timeout = setTimeout(() => {
      gradientLayersDispatch({
        type: "UPDATE_LAYER_OPACITY",
        layer,
        index,
        opacity,
      });
    }, 0);
    return () => clearTimeout(timeout);
  };
  const handleLayerWidthChange = (
    width: GradientLayer["width"],
    layer: GradientLayer,
    index: number
  ) => {
    const timeout = setTimeout(() => {
      gradientLayersDispatch({
        type: "UPDATE_LAYER_WIDTH",
        layer,
        index,
        width,
      });
    }, 0);
    return () => clearTimeout(timeout);
  };
  const handleLayerHeightChange = (
    height: GradientLayer["height"],
    layer: GradientLayer,
    index: number
  ) => {
    const timeout = setTimeout(() => {
      gradientLayersDispatch({
        type: "UPDATE_LAYER_HEIGHT",
        layer,
        index,
        height,
      });
    }, 0);
    return () => clearTimeout(timeout);
  };
  const handleLayerBlurChange = (
    blur: GradientLayer["blur"],
    layer: GradientLayer,
    index: number
  ) => {
    const timeout = setTimeout(() => {
      gradientLayersDispatch({
        type: "UPDATE_LAYER_BLUR",
        layer,
        index,
        blur,
      });
    }, 0);
    return () => clearTimeout(timeout);
  };
  const handleGradientTypeChange = (
    gradientType: GradientLayer["gradientType"],
    layer: GradientLayer,
    index: number
  ) => {
    gradientLayersDispatch({
      type: "CHANGE_GRADIENT_TYPE",
      layer,
      index,
      gradientType,
    });
  };

  const handleToggleAnimate = (
    animationSettings: AnimationSettings,
    index: number
  ) => {
    animationSettingsDispatch({
      type: "TOGGLE_ANIMATE",
      animationSettings,
      index,
    });
    refreshToggleAnimate(animationSettingsDispatch, animationSettings);
  };

  //const [customCSS, setCustomCSS] = useState<string>("");

  return (
    <div className="flex flex-col py-8">
      <div
        className="flex h-full flex-1 flex-col items-center justify-center"
        key={index}
      >
        <h2
          className={`${style.h2} m-4 select-none rounded-md bg-black/50 text-center`}
        >
          Layer {index + 1}
        </h2>
        <div className={`flex ${style.card}`}>
          <div className="mb-4 flex w-full flex-wrap justify-center">
            <div className="w-full">
              {/**<Input
                classNameInput={`my-4 flex w-full rounded-md border border-transparent
                bg-transparent py-2 text-center text-white outline-none
                focus:border-white ${style.buttonHover}
                transition-all duration-300`}
                type={"text"}
                value={customCSS}
                onChange={(e) => setCustomCSS(e)}
                text={"Custom CSS"}
              />
              */}
              <Input
                min={0}
                max={200}
                step={1}
                value={layer.width}
                onChange={(width) =>
                  handleLayerWidthChange(width, layer, index)
                }
                text={`Width ${layer.width}%`}
                type={"range"}
                className={"w-full"}
              />
              <Input
                min={0}
                max={200}
                step={1}
                value={layer.height}
                onChange={(height) =>
                  handleLayerHeightChange(height, layer, index)
                }
                text={`Height ${layer.height}%`}
                type={"range"}
                className={"w-full"}
              />
            </div>
            {layer.gradientType === "linear-gradient" && (
              <Input
                min={0}
                max={360}
                step={1}
                value={layer.angle}
                onChange={(angle) => handleAngleChange(angle, layer, index)}
                text={`Angle ${layer.angle}°`}
                type={"range"}
              />
            )}
            {!toggleAnimate && (
              <Input
                min={0}
                max={1}
                step={0.01}
                value={layer.opacity}
                onChange={(opacity) =>
                  handleLayerOpacityChange(opacity, layer, index)
                }
                text={`Opacity ${(parseFloat(layer.opacity) * 100).toFixed()}%`}
                type={"range"}
                className={"w-[140px]"}
              />
            )}
            <Input
              min={0}
              max={600}
              step={1}
              value={layer.blur}
              onChange={(blur) => handleLayerBlurChange(blur, layer, index)}
              text={`Blur ${layer.blur}px`}
              type={"range"}
              className={"w-[240px]"}
            />
            <Button
              text={`${
                layer.gradientType !== "linear-gradient" ? "Linear" : "Radial"
              }`}
              onClick={() =>
                handleGradientTypeChange("radial-gradient", layer, index)
              }
              buttonStyles={"normal"}
              buttonStylesHover={"normal"}
            />
            <Button
              text={`${!toggleAnimate ? "Animate" : "Stop Animation"}`}
              onClick={() => handleToggleAnimate(animationSettings, index)}
              buttonStyles={`${!toggleAnimate ? "normal" : "danger"}`}
              buttonStylesHover={`${!toggleAnimate ? "normal" : "danger"}`}
            />
          </div>
        </div>
        {toggleAnimate && (
          <AnimationSettingsComponent
            animationSettingsDispatch={animationSettingsDispatch}
            animationSettings={animationSettings}
            index={index}
          />
        )}
        <h2
          className={`${style.h2} m-4 select-none rounded-md bg-black/50 text-center`}
        >
          Colors
        </h2>
        <div className="flex flex-wrap justify-center overflow-auto">
          {layer.colors.map((color, colorIndex) => {
            return (
              <div className={`flex flex-wrap ${style.card}`} key={colorIndex}>
                <ColorPicker
                  value={color.color}
                  onChange={(newColor: string) =>
                    handleColorChange(index, colorIndex, {
                      ...color,
                      color: newColor,
                    })
                  }
                  text={`Color ${colorIndex + 1}`}
                />
                <Input
                  min={0}
                  max={100}
                  step={1}
                  value={color.stop}
                  onChange={(stop) => handleStopChange(stop, index, colorIndex)}
                  text={`Stop ${color.stop}%`}
                  type={"range"}
                />
                <Input
                  min={0}
                  max={1}
                  step={0.01}
                  value={color.opacity}
                  onChange={(opacity) =>
                    handleOpacityChange(opacity, index, colorIndex)
                  }
                  text={`Opacity ${(
                    parseFloat(color.opacity) * 100
                  ).toFixed()}%`}
                  type={"range"}
                  className={"w-[140px]"}
                />
                <Button
                  onClick={() => handleAddColor(index, colorIndex)}
                  text={"+ New Color"}
                  buttonStyles="normal"
                  buttonStylesHover="normal"
                />
                {layer.colors.length > 2 && (
                  <div className="">
                    <Button
                      onClick={() =>
                        layer.colors.length > 1
                          ? handleRemoveColor(index, colorIndex)
                          : handleRemoveLayer(index)
                      }
                      text={"Remove"}
                      buttonStyles={"danger"}
                      buttonStylesHover={"danger"}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex">
          <div>
            <Button
              onClick={() => handleAddLayer(index, layer, animationSettings)}
              text={"+ Add Layer"}
              buttonStyles={"normal"}
              buttonStylesHover={"normal"}
            />
          </div>
          {gradientLayers.length > 1 && (
            <div className="">
              <Button
                onClick={() => handleRemoveLayer(index)}
                text={"Remove Layer"}
                buttonStyles={"danger"}
                buttonStylesHover={"danger"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
