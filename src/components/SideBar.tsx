import { useState } from "react";
import { closeIcon } from "../assets/icons";
import {
  AnimationSettings,
  AnimationSettingsAction,
  Action,
  GradientLayer,
  SavedLayersSettings,
  SavedLayers,
  SavedLayersAction,
  Button,
  OnClickOutside,
  handleAddSavedLayer,
  handleSaveCurrentLayer,
} from "./index";

type SideBarProps = {
  gradientLayers: GradientLayer[];
  className?: string;
  showSideBar: boolean;
  setShowSideBar: (value: React.SetStateAction<boolean>) => void;
  savedLayers: SavedLayers;
  savedLayersDispatch: React.Dispatch<SavedLayersAction>;
  gradientLayersDispatch: React.Dispatch<Action>;
  animationSettingsDispatch: React.Dispatch<AnimationSettingsAction>;
  animationSettings: AnimationSettings[];
  showUI: boolean;
};

export default function SideBar(props: SideBarProps) {
  const {
    gradientLayers,
    showSideBar,
    setShowSideBar,
    className,
    savedLayers,
    savedLayersDispatch,
    gradientLayersDispatch,
    animationSettingsDispatch,
    animationSettings,
    showUI,
  } = props;

  const [currentLayerIndex, setCurrentLayerIndex] = useState<number>(0);

  return (
    <OnClickOutside
      condition={showSideBar}
      onClickOutside={() => setShowSideBar(false)}
      className={`${showUI ? "block" : "hidden"}`}
    >
      <div
        className={`${className} ${
          showSideBar ? "translate-x-0" : "translate-x-[-100%]"
        } fixed left-0 z-[99] h-full w-full max-w-[300px] overflow-auto
          bg-black/75 pt-16 backdrop-blur-xl transition-all duration-300
          `}
      >
        <Button
          onClick={() => setShowSideBar(false)}
          buttonStyles={"normal"}
          buttonStylesHover={"normal"}
          className={`fixed top-0 right-0 z-[10] p-2
          `}
        >
          {closeIcon}
        </Button>
        <div className="flex flex-wrap">
          <Button
            onClick={() =>
              handleAddSavedLayer(
                savedLayersDispatch,
                gradientLayers,
                animationSettings
              )
            }
            text={"+ New save"}
            buttonStyles={"normal"}
            buttonStylesHover={"normal"}
          />
          <Button
            onClick={() =>
              handleSaveCurrentLayer(
                savedLayers,
                savedLayersDispatch,
                currentLayerIndex,
                gradientLayers,
                animationSettings,
                handleAddSavedLayer
              )
            }
            text={"Save"}
            buttonStyles={"normal"}
            buttonStylesHover={"normal"}
          />
        </div>
        <div className="flex">
          {savedLayers.savedLayers && (
            <SavedLayersSettings
              savedLayers={savedLayers}
              savedLayersDispatch={savedLayersDispatch}
              gradientLayersDispatch={gradientLayersDispatch}
              currentLayerIndex={currentLayerIndex}
              setCurrentLayerIndex={setCurrentLayerIndex}
              animationSettingsDispatch={animationSettingsDispatch}
            />
          )}
        </div>
      </div>
    </OnClickOutside>
  );
}
