import { AnimationSettings, GradientLayer } from "./index";

export type SavedLayer = {
  savedLayer: GradientLayer[];
  savedAnimationSettings: AnimationSettings[];
};

export type SavedLayers = {
  savedLayers: SavedLayer[];
};

// Retrieve the saved layers from local storage
const savedLayersString = localStorage.getItem("savedLayers");

export const initialSavedLayers: SavedLayers = savedLayersString
  ? JSON.parse(savedLayersString)
  : { savedLayers: [] };

// Define the function to update local storage with the new saved layers
const updateSavedLayers = (savedLayers: SavedLayers) => {
  localStorage.setItem("savedLayers", JSON.stringify(savedLayers));
};

export type SavedLayersAction =
  | {
      type: "ADD_SAVED_LAYER";
      savedLayer: SavedLayer;
    }
  | {
      type: "REMOVE_SAVED_LAYER";
      index: number;
    }
  | {
      type: "UPDATE_SAVED_LAYER";
      index: number;
      newSavedLayer: SavedLayer;
    };

export function savedLayersReducer(
  state: SavedLayers,
  action: SavedLayersAction
): SavedLayers {
  switch (action.type) {
    case "ADD_SAVED_LAYER": {
      const updatedSavedLayers = [...state.savedLayers, action.savedLayer];
      updateSavedLayers({ savedLayers: updatedSavedLayers });
      console.log(
        "savedLayersReducer -> updatedSavedLayers",
        updatedSavedLayers
      );
      return {
        savedLayers: updatedSavedLayers,
      };
    }
    case "REMOVE_SAVED_LAYER": {
      const updatedSavedLayers = state.savedLayers.filter(
        (_, index) => index !== action.index
      );
      console.log(
        "savedLayersReducer -> updatedSavedLayers",
        updatedSavedLayers
      );
      updateSavedLayers({ savedLayers: updatedSavedLayers });
      return {
        savedLayers: updatedSavedLayers,
      };
    }
    case "UPDATE_SAVED_LAYER": {
      const { index, newSavedLayer } = action;
      const updatedSavedLayers = [...state.savedLayers];
      updatedSavedLayers[index] = newSavedLayer;
      console.log(
        "savedLayersReducer -> updatedSavedLayers",
        updatedSavedLayers
      );
      updateSavedLayers({ savedLayers: updatedSavedLayers });
      return {
        savedLayers: updatedSavedLayers,
      };
    }

    default:
      return state;
  }
}

export const handleAddSavedLayer = (
  savedLayersDispatch: React.Dispatch<SavedLayersAction>,
  gradientLayers: GradientLayer[],
  animationSettings: AnimationSettings[]
) => {
  savedLayersDispatch({
    type: "ADD_SAVED_LAYER",
    savedLayer: {
      savedLayer: gradientLayers,
      savedAnimationSettings: animationSettings,
    } as SavedLayer,
  });
};

export const handleSaveCurrentLayer = (
  savedLayers: SavedLayers,
  savedLayersDispatch: React.Dispatch<SavedLayersAction>,
  currentLayerIndex: number,
  gradientLayers: GradientLayer[],
  animationSettings: AnimationSettings[],
  handleAddSavedLayer: (
    savedLayersDispatch: React.Dispatch<SavedLayersAction>,
    gradientLayers: GradientLayer[],
    animationSettings: AnimationSettings[]
  ) => void
) => {
  if (savedLayers.savedLayers.length > 0) {
    console.log(
      "savedLayers.savedLayers[currentLayerIndex]",
      savedLayers.savedLayers
    );
    savedLayersDispatch({
      type: "UPDATE_SAVED_LAYER",
      index: currentLayerIndex,
      newSavedLayer: {
        savedLayer: gradientLayers,
        savedAnimationSettings: animationSettings,
      } as SavedLayer,
    });
  } else {
    handleAddSavedLayer(savedLayersDispatch, gradientLayers, animationSettings);
  }
};
