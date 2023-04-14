export interface AnimationSettings {
  toggleAnimate: boolean;
  animationDirection: "normal" | "reverse";
  animationTime: string;
  opacityStart: string;
  opacityEnd: string;
}

export const initialAnimationSettings: AnimationSettings[] = [
  {
    toggleAnimate: true,
    animationDirection: "normal",
    animationTime: "20",
    opacityStart: "0",
    opacityEnd: "100",
  },
  {
    toggleAnimate: true,
    animationDirection: "reverse",
    animationTime: "10",
    opacityStart: "100",
    opacityEnd: "100",
  },
];

export type AnimationSettingsAction =
  | {
      type: "TOGGLE_ANIMATE";
      animationSettings: AnimationSettings;
      index: number;
    }
  | {
      type: "REFRESH_TOGGLE_ANIMATE";
      animationSettings: AnimationSettings;
    }
  | {
      type: "TOGGLE_ANIMATION_DIRECTION";
      animationSettings: AnimationSettings;
      index: number;
    }
  | {
      type: "UPDATE_ANIMATION_TIME";
      animationSettings: AnimationSettings;
      animationTime: AnimationSettings["animationTime"];
      index: number;
    }
  | {
      type: "UPDATE_OPACITY_START";
      animationSettings: AnimationSettings;
      opacityStart: AnimationSettings["opacityStart"];
      index: number;
    }
  | {
      type: "UPDATE_OPACITY_END";
      animationSettings: AnimationSettings;
      opacityEnd: AnimationSettings["opacityEnd"];
      index: number;
    }
  | {
      type: "ADD_ANIMATION_LAYER";
      index: number;
      animationSettings: AnimationSettings;
    }
  | {
      type: "REMOVE_ANIMATION_LAYER";
      index: number;
    }
  | {
      type: "SET_CURRENT_ANIMATION_SETTINGS";
      newAnimationSettings: AnimationSettings[];
    };

export function animationSettingsReducer(
  state: AnimationSettings[],
  action: AnimationSettingsAction
): AnimationSettings[] {
  switch (action.type) {
    case "ADD_ANIMATION_LAYER": {
      const { index, animationSettings } = action;
      const updatedAnimationSettings = [...state];
      updatedAnimationSettings.splice(index + 1, 0, animationSettings);
      return updatedAnimationSettings;
    }
    case "REMOVE_ANIMATION_LAYER": {
      return state.filter((_, index) => index !== action.index);
    }
    case "REFRESH_TOGGLE_ANIMATE": {
      return state.map((animationSettings) => ({
        ...animationSettings,
        toggleAnimate: !animationSettings.toggleAnimate,
      }));
    }

    case "TOGGLE_ANIMATE": {
      const newState = state.map((animationSettings, index) => {
        if (index === action.index) {
          return {
            ...animationSettings,
            toggleAnimate: !animationSettings.toggleAnimate,
          };
        }
        return {
          ...animationSettings,
        };
      });

      return newState;
    }

    case "TOGGLE_ANIMATION_DIRECTION": {
      return state.map((animationSettings, index) => {
        if (index === action.index) {
          return {
            ...animationSettings,
            animationDirection:
              animationSettings.animationDirection === "normal"
                ? "reverse"
                : "normal",
          };
        }
        return animationSettings;
      });
    }
    case "UPDATE_ANIMATION_TIME": {
      return state.map((animationSettings, index) => {
        if (index === action.index) {
          return {
            ...animationSettings,
            animationTime: action.animationTime,
          };
        }
        return animationSettings;
      });
    }
    case "UPDATE_OPACITY_START": {
      return state.map((animationSettings, index) => {
        if (index === action.index) {
          const opacityStart = parseInt(action.opacityStart);
          const opacityEnd = parseInt(animationSettings.opacityEnd);
          if (opacityStart <= opacityEnd) {
            return {
              ...animationSettings,
              opacityStart: action.opacityStart,
            };
          } else {
            const newOpacityEnd = Math.max(opacityEnd, opacityStart);
            return {
              ...animationSettings,
              opacityStart: action.opacityStart,
              opacityEnd: newOpacityEnd.toString(),
            };
          }
        }
        return animationSettings;
      });
    }
    case "UPDATE_OPACITY_END": {
      return state.map((animationSettings, index) => {
        if (index === action.index) {
          const opacityEnd = parseInt(action.opacityEnd);
          const opacityStart = parseInt(animationSettings.opacityStart);
          if (opacityEnd >= opacityStart) {
            return {
              ...animationSettings,
              opacityEnd: action.opacityEnd,
            };
          } else {
            const newOpacityStart = Math.min(opacityStart, opacityEnd);
            return {
              ...animationSettings,
              opacityStart: newOpacityStart.toString(),
              opacityEnd: action.opacityEnd,
            };
          }
        }
        return animationSettings;
      });
    }
    case "SET_CURRENT_ANIMATION_SETTINGS": {
      return action.newAnimationSettings;
    }
    default: {
      return state;
    }
  }
}

export const refreshToggleAnimate = (
  animationSettingsDispatch: React.Dispatch<AnimationSettingsAction>,
  animationSettings: AnimationSettings
) => {
  const handleRefreshToggleAnimate = (animationSettings: AnimationSettings) => {
    animationSettingsDispatch({
      type: "REFRESH_TOGGLE_ANIMATE",
      animationSettings,
    });
  };

  handleRefreshToggleAnimate(animationSettings);
  const timeout = setTimeout(() => {
    handleRefreshToggleAnimate(animationSettings);
  }, 0);
  return () => clearTimeout(timeout);
};
