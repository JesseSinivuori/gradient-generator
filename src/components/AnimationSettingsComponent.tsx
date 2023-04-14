import { style } from "../style";
import Input from "./UI/Input";
import {
  AnimationSettingsAction,
  AnimationSettings,
  refreshToggleAnimate,
} from "./animationSettingsReducer";
import Button from "./UI/Button";

type AnimationSettingsComponentProps = {
  animationSettingsDispatch: React.Dispatch<AnimationSettingsAction>;
  animationSettings: AnimationSettings;
  index: number;
};

export default function AnimationSettingsComponent(
  props: AnimationSettingsComponentProps
) {
  const { animationSettingsDispatch, animationSettings, index } = props;

  const {
    toggleAnimate,
    animationTime,
    opacityStart,
    opacityEnd,
    animationDirection,
  } = animationSettings;

  const handleAnimationTimeChange = (
    animationSettings: AnimationSettings,
    animationTime: AnimationSettings["animationTime"],
    index: number
  ) => {
    animationSettingsDispatch({
      type: "UPDATE_ANIMATION_TIME",
      animationTime,
      animationSettings,
      index,
    });
  };

  function handleOpacityStartChange(
    animationSettings: AnimationSettings,
    index: number,
    opacityStart: AnimationSettings["opacityStart"]
  ) {
    const timeout = setTimeout(() => {
      animationSettingsDispatch({
        type: "UPDATE_OPACITY_START",
        animationSettings,
        index,
        opacityStart,
      });
    }, 0);
    return () => clearTimeout(timeout);
  }

  function handleOpacityEndChange(
    animationSettings: AnimationSettings,
    index: number,
    opacityEnd: AnimationSettings["opacityEnd"]
  ) {
    const timeout = setTimeout(() => {
      animationSettingsDispatch({
        type: "UPDATE_OPACITY_END",
        animationSettings,
        index,
        opacityEnd,
      });
    }, 0);
    return () => clearTimeout(timeout);
  }

  const handleToggleAnimationDirection = (
    animationSettings: AnimationSettings,
    index: number
  ) => {
    animationSettingsDispatch({
      type: "TOGGLE_ANIMATION_DIRECTION",
      animationSettings,
      index,
    });
    refreshToggleAnimate(animationSettingsDispatch, animationSettings);
  };

  return (
    <>
      {toggleAnimate && (
        <div className="flex flex-col items-center">
          <h2 className={`${style.h2} ${style.button} select-none text-center`}>
            Animation Settings
          </h2>
          <div className={`flex flex-wrap justify-center ${style.card}`}>
            <Button
              text={`${
                animationDirection === "normal"
                  ? "Direction: Left"
                  : "Direction: Right"
              }`}
              onClick={() =>
                handleToggleAnimationDirection(animationSettings, index)
              }
              buttonStyles={`normal`}
              buttonStylesHover={`normal`}
            />
            <Input
              text={`Animation Time`}
              type={"number"}
              value={animationTime}
              onChange={(animationTime) =>
                handleAnimationTimeChange(
                  animationSettings,
                  animationTime,
                  index
                )
              }
            />
            <Input
              text={`Opacity Start ${opacityStart}%`}
              type={"range"}
              min={0}
              max={100}
              step={1}
              value={opacityStart}
              onChange={(opacityStart) =>
                handleOpacityStartChange(animationSettings, index, opacityStart)
              }
              className="w-[170px]"
            />
            <Input
              text={`Opacity End ${opacityEnd}%`}
              type={"range"}
              min={0}
              max={100}
              step={1}
              value={opacityEnd}
              onChange={(opacityEnd) =>
                handleOpacityEndChange(animationSettings, index, opacityEnd)
              }
              className="w-[170px]"
            />
          </div>
        </div>
      )}
    </>
  );
}
