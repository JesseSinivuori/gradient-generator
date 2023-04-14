import { style } from "../style";
import {
  AnimationSettingsAction,
  Action,
  SavedLayer,
  SavedLayers,
  SavedLayersAction,
  Button,
  GradientLayer,
  AnimationSettings,
} from "./index";

type SavedLayersProps = {
  savedLayers: SavedLayers;
  savedLayersDispatch: React.Dispatch<SavedLayersAction>;
  gradientLayersDispatch: React.Dispatch<Action>;
  currentLayerIndex: number;
  setCurrentLayerIndex: React.Dispatch<React.SetStateAction<number>>;
  animationSettingsDispatch: React.Dispatch<AnimationSettingsAction>;
};

export default function SavedLayersSettings(props: SavedLayersProps) {
  const {
    savedLayers,
    savedLayersDispatch,
    gradientLayersDispatch,
    currentLayerIndex,
    setCurrentLayerIndex,
    animationSettingsDispatch,
  } = props;

  if (savedLayers.savedLayers.length === 0) {
    return (
      <div className="flex w-full justify-center p-4 text-zinc-400">
        Nothing saved yet.
      </div>
    );
  }
  // Dispatch the REMOVE_SAVED_LAYER action to remove saved layers from the state and update local storage
  const handleRemoveSavedLayer = (index: number) => {
    savedLayersDispatch({
      type: "REMOVE_SAVED_LAYER",
      index: index,
    });
  };

  const handleShowSavedLayer = (index: number) => {
    setCurrentLayerIndex(index);
    const newLayer = {
      savedLayer: savedLayers.savedLayers[index].savedLayer,
      savedAnimationSettings:
        savedLayers.savedLayers[index].savedAnimationSettings,
    } as SavedLayer;
    // Dispatch the UPDATE_LAYERS action to update the current layers with the selected saved layers
    gradientLayersDispatch({
      type: "SET_CURRENT_LAYERS",
      newGradientLayer: newLayer.savedLayer as GradientLayer[],
    });
    animationSettingsDispatch({
      type: "SET_CURRENT_ANIMATION_SETTINGS",
      newAnimationSettings:
        newLayer.savedAnimationSettings as AnimationSettings[],
    });
  };

  return (
    <div className="flex w-full flex-col">
      {savedLayers?.savedLayers.map((_layer, index) => (
        <div
          key={index}
          className={`flex items-center justify-center text-white ${style.card}
          flex-1 transition-all duration-100 ${
            currentLayerIndex === index
              ? "bg-gray-300/20"
              : "hover:bg-gray-300/10"
          }`}
        >
          <Button
            onClick={() => {
              handleShowSavedLayer(index);
            }}
            text={`Saved ${index + 1}`}
            buttonStyles={"normal"}
            buttonStylesHover={"normal"}
            classNameButton={`w-[100px]`}
            className="flex-1"
          />
          <Button
            onClick={() => handleRemoveSavedLayer(index)}
            text={"Delete"}
            buttonStyles={"danger"}
            buttonStylesHover={"danger"}
          />
        </div>
      ))}
    </div>
  );
}
