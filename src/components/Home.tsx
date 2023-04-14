import { useEffect, useReducer, useState } from "react";
import { arrowDownIcon, arrowUpIcon, menuIcon } from "../assets/icons";
import {
  GeneralSettings,
  LayerSettings,
  GradientLayers,
  OutputBar,
  SideBar,
  Button,
  gradientLayersReducer,
  initialGradientLayers,
  initialSavedLayers,
  savedLayersReducer,
  animationSettingsReducer,
  initialAnimationSettings,
} from "./index";

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState<string>("#0011ff");
  const [backgroundOpacity, setBackgroundOpacity] = useState<string>("100");
  const [backgroundBlur, setBackgroundBlur] = useState<string>("0");
  const [backgroundInvert, setBackgroundInvert] = useState<"1" | "0">("0");
  const [gradientLayers, gradientLayersDispatch] = useReducer(
    gradientLayersReducer,
    initialGradientLayers
  );
  const [animationSettings, animationSettingsDispatch] = useReducer(
    animationSettingsReducer,
    initialAnimationSettings
  );
  const [savedLayers, savedLayersDispatch] = useReducer(
    savedLayersReducer,
    initialSavedLayers
  );
  const [showSideBar, setShowSideBar] = useState(false);

  function handleToggleSideBar() {
    setShowSideBar((prev) => !prev);
  }

  const [showUI, setShowUI] = useState(true);

  useEffect(() => {
    const handleReachedBottom = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        setShowUI(true);
      } else {
        setShowUI(false);
      }
    };
    window.addEventListener("scroll", handleReachedBottom);

    return () => {
      window.removeEventListener("scroll", handleReachedBottom);
    };
  }, [setShowUI]);

  useEffect(() => {
    document.body.style.setProperty("--bg-color", backgroundColor);
  }, [backgroundColor]);

  function handleScrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
    });
  }

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className={`z-[2]`}>
        <div className={`fixed z-[2] ${showUI ? "block" : "hidden"}`}>
          <div className={`fixed bottom-[50%] left-0 z-[2]  p-1`}>
            <Button
              onClick={() => {
                handleScrollToTop();
              }}
              buttonStyles={"normal"}
              buttonStylesHover={"normal"}
            >
              {arrowUpIcon}
            </Button>
            <Button
              onClick={() => {
                handleScrollToBottom();
              }}
              buttonStyles={"normal"}
              buttonStylesHover={"normal"}
            >
              {arrowDownIcon}
            </Button>
            <Button
              onClick={handleToggleSideBar}
              buttonStyles={"normal"}
              buttonStylesHover={"normal"}
              className={`fixed top-0 left-0 z-[1]`}
            >
              {menuIcon}
            </Button>
          </div>
          <SideBar
            gradientLayers={gradientLayers}
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
            savedLayers={savedLayers}
            savedLayersDispatch={savedLayersDispatch}
            gradientLayersDispatch={gradientLayersDispatch}
            animationSettings={animationSettings}
            animationSettingsDispatch={animationSettingsDispatch}
            showUI={showUI}
          />
        </div>
        <div
          className={`z-[1] flex w-full flex-col items-center overflow-hidden`}
        >
          <div
            className={`relative mb-24 flex w-full max-w-[1000px] flex-col
            items-center justify-center`}
          >
            <div className="ml-16 overflow-hidden xl:ml-0">
              <GeneralSettings
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
                gradientLayers={gradientLayers}
                backgroundBlur={backgroundBlur}
                setBackgroundBlur={setBackgroundBlur}
                backgroundOpacity={backgroundOpacity}
                setBackgroundOpacity={setBackgroundOpacity}
                backgroundInvert={backgroundInvert}
                setBackgroundInvert={setBackgroundInvert}
              />
              {gradientLayers.map((layer, index) => (
                <div
                  className="relative flex flex-col justify-center"
                  key={index}
                >
                  <div className="mb-20 flex">
                    <LayerSettings
                      gradientLayersDispatch={gradientLayersDispatch}
                      gradientLayers={gradientLayers}
                      key={index}
                      layer={layer}
                      index={index}
                      animationSettingsDispatch={animationSettingsDispatch}
                      animationSettings={animationSettings[index]}
                    />
                  </div>
                  <div className="flex w-full justify-center">
                    <OutputBar
                      key={index}
                      backgroundBlur={backgroundBlur}
                      backgroundOpacity={backgroundOpacity}
                      backgroundInvert={backgroundInvert}
                      layer={layer}
                      index={index}
                      animationSettings={animationSettings}
                      gradientLayers={gradientLayers}
                      outputAllLayers={false}
                    />
                  </div>
                </div>
              ))}
            </div>
            {gradientLayers.length > 1 && (
              <div
                className={`fixed bottom-0 flex h-[90px] w-full justify-center
                hover:h-full hover:max-h-[200px]
                ${showUI ? "block" : "hidden"}`}
              >
                {gradientLayers.map((layer, index) => (
                  <OutputBar
                    key={index}
                    backgroundBlur={backgroundBlur}
                    backgroundOpacity={backgroundOpacity}
                    backgroundInvert={backgroundInvert}
                    layer={layer}
                    index={index}
                    animationSettings={animationSettings}
                    gradientLayers={gradientLayers}
                    outputAllLayers={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-screen w-full"></div>
      <GradientLayers
        gradientLayers={gradientLayers}
        animationSettings={animationSettings}
        backgroundBlur={backgroundBlur}
        backgroundOpacity={backgroundOpacity}
        backgroundInvert={backgroundInvert}
      />
    </div>
  );
}
