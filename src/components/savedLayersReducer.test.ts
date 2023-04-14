import {
  SavedLayers,
  SavedLayersAction,
  handleAddSavedLayer,
  handleSaveCurrentLayer,
  initialAnimationSettings,
  initialGradientLayers,
  initialSavedLayers,
} from "./index";
import { vi } from "vitest";

describe("handleAddSavedLayer", () => {
  it("should dispatch ADD_SAVED_LAYER action with the correct savedLayer object", () => {
    const mockDispatch = vi.fn();
    const gradientLayers = initialGradientLayers;
    const animationSettings = initialAnimationSettings;
    const expectedAction = {
      type: "ADD_SAVED_LAYER",
      savedLayer: {
        savedLayer: gradientLayers,
        savedAnimationSettings: animationSettings,
      },
    } as SavedLayersAction;
    handleAddSavedLayer(mockDispatch, gradientLayers, animationSettings);
    expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
  });
});

describe("handleSaveCurrentLayer", () => {
  it("should call handleAddSavedLayer and dispatch ADD_SAVED_LAYER action when savedLayers is empty", () => {
    const mockDispatch = vi.fn();
    const mockHandleAddSavedLayer = vi.fn();
    const savedLayers = { savedLayers: [] } as SavedLayers;
    const currentLayerIndex = 0;
    const gradientLayers = initialGradientLayers;
    const animationSettings = initialAnimationSettings;
    handleSaveCurrentLayer(
      savedLayers,
      mockDispatch,
      currentLayerIndex,
      gradientLayers,
      animationSettings,
      mockHandleAddSavedLayer
    );
    expect(mockHandleAddSavedLayer).toHaveBeenCalledWith(
      mockDispatch,
      gradientLayers,
      animationSettings
    );
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "ADD_SAVED_LAYER" })
    );
  });

  it("should dispatch UPDATE_SAVED_LAYER action when savedLayers is not empty", () => {
    const mockDispatch = vi.fn();
    const savedLayers = initialSavedLayers;
    const currentLayerIndex = 1;
    const gradientLayers = initialGradientLayers;
    const animationSettings = initialAnimationSettings;
    const expectedAction = {
      type: "UPDATE_SAVED_LAYER",
      index: currentLayerIndex,
      newSavedLayer: {
        savedLayer: gradientLayers,
        savedAnimationSettings: animationSettings,
      },
    } as SavedLayersAction;
    handleSaveCurrentLayer(
      savedLayers,
      mockDispatch,
      currentLayerIndex,
      gradientLayers,
      animationSettings,
      vi.fn()
    );
    expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
  });
});
