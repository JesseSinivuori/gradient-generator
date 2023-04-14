export interface Color {
  color: string;
  stop: string;
  opacity: string;
}

export interface GradientLayer {
  colors: Color[];
  angle: string;
  gradientType: "linear-gradient" | "radial-gradient";
  opacity: string;
  width: string;
  height: string;
  blur: string;
}

export const initialGradientLayers: GradientLayer[] = [
  {
    colors: [
      { color: "#5039fe", stop: "0", opacity: "1" },
      { color: "#ff3e29", stop: "50", opacity: "1" },
      { color: "#ff42c3", stop: "100", opacity: "1" },
    ],
    angle: "215",
    gradientType: "linear-gradient",
    opacity: "1",
    width: "150",
    height: "150",
    blur: "190",
  },
  {
    colors: [
      { color: "#ffa200", stop: "0", opacity: "1" },
      { color: "#ff3e29", stop: "50", opacity: "0" },
      { color: "#ff4284", stop: "100", opacity: "1" },
    ],
    angle: "215",
    gradientType: "linear-gradient",
    opacity: "1",
    width: "100",
    height: "100",
    blur: "267",
  },
];

export type Action =
  | { type: "ADD_LAYER"; index: number; layer: GradientLayer }
  | { type: "REMOVE_LAYER"; index: number }
  | {
      type: "ADD_COLOR";
      index: number;
      colorIndex: number;
    }
  | { type: "REMOVE_COLOR"; index: number; colorIndex: number }
  | { type: "UPDATE_LAYER"; index: number; layer: GradientLayer }
  | {
      type: "UPDATE_COLOR";
      index: number;
      colorIndex: number;
      newColor: Color;
    }
  | {
      type: "UPDATE_COLOR_STOP";
      index: number;
      colorIndex: number;
      stop: Color["stop"];
    }
  | {
      type: "UPDATE_ANGLE";
      index: number;
      angle: GradientLayer["angle"];
      layer: GradientLayer;
    }
  | {
      type: "CHANGE_GRADIENT_TYPE";
      gradientType: GradientLayer["gradientType"];
      layer: GradientLayer;
      index: number;
    }
  | {
      type: "UPDATE_COLOR_OPACITY";
      index: number;
      colorIndex: number;
      opacity: Color["opacity"];
    }
  | {
      type: "UPDATE_LAYER_OPACITY";
      layer: GradientLayer;
      index: number;
      opacity: GradientLayer["opacity"];
    }
  | {
      type: "UPDATE_LAYER_WIDTH";
      layer: GradientLayer;
      index: number;
      width: GradientLayer["width"];
    }
  | {
      type: "UPDATE_LAYER_HEIGHT";
      layer: GradientLayer;
      index: number;
      height: GradientLayer["height"];
    }
  | {
      type: "TOGGLE_ANIMATE_LAYER";
      layer: GradientLayer;
      index: number;
    }
  | {
      type: "UPDATE_LAYER_BLUR";
      layer: GradientLayer;
      index: number;
      blur: GradientLayer["blur"];
    }
  | {
      type: "SET_CURRENT_LAYERS";
      newGradientLayer: GradientLayer[];
    };

export function gradientLayersReducer(
  state: GradientLayer[],
  action: Action
): GradientLayer[] {
  switch (action.type) {
    case "ADD_LAYER": {
      const { index, layer } = action;
      const updatedLayers = [...state];
      updatedLayers.splice(index + 1, 0, layer);
      return updatedLayers;
    }
    case "REMOVE_LAYER": {
      return state.filter((_, index) => index !== action.index);
    }
    case "ADD_COLOR": {
      const { index, colorIndex } = action;
      const updatedLayers = [...state];
      const updatedColors = [...updatedLayers[index].colors];
      updatedColors.splice(colorIndex + 1, 0, { ...updatedColors[colorIndex] });
      updatedLayers[index] = { ...updatedLayers[index], colors: updatedColors };
      return updatedLayers;
    }

    case "REMOVE_COLOR": {
      return state.map((layer, index) =>
        index === action.index
          ? {
              ...layer,
              colors: layer.colors.filter(
                (_, colorIndex) => colorIndex !== action.colorIndex
              ),
            }
          : layer
      );
    }
    case "UPDATE_LAYER": {
      return state.map((layer, index) =>
        index === action.index ? action.layer : layer
      );
    }
    case "UPDATE_COLOR": {
      return state.map((layer, index) => {
        if (index === action.index) {
          const updatedColors = [...layer.colors];
          updatedColors[action.colorIndex] = action.newColor;
          return {
            ...layer,
            colors: updatedColors,
          };
        }
        return layer;
      });
    }
    case "UPDATE_COLOR_STOP": {
      return state.map((layer, index) => {
        if (index === action.index) {
          const updatedColors = layer.colors.map((color, colorIndex) => {
            if (colorIndex === action.colorIndex) {
              return { ...color, stop: action.stop };
            }
            return color;
          });

          return {
            ...layer,
            colors: updatedColors,
          };
        }
        return layer;
      });
    }
    case "UPDATE_ANGLE": {
      return state.map((layer, index) => {
        if (index === action.index) {
          return {
            ...layer,
            angle: action.angle,
          };
        }
        return layer;
      });
    }
    case "UPDATE_COLOR_OPACITY": {
      return state.map((layer, index) => {
        if (index === action.index) {
          const updatedColors = layer.colors.map((color, colorIndex) => {
            if (colorIndex === action.colorIndex) {
              return { ...color, opacity: action.opacity };
            }
            return color;
          });

          return {
            ...layer,
            colors: updatedColors,
          };
        }
        return layer;
      });
    }
    case "UPDATE_LAYER_OPACITY": {
      return state.map((layer, index) => {
        if (index === action.index) {
          return {
            ...layer,
            opacity: action.opacity,
          };
        }
        return layer;
      });
    }
    case "UPDATE_LAYER_WIDTH": {
      return state.map((layer, index) => {
        if (index === action.index) {
          return {
            ...layer,
            width: action.width,
          };
        }
        return layer;
      });
    }
    case "UPDATE_LAYER_HEIGHT": {
      return state.map((layer, index) => {
        if (index === action.index) {
          return {
            ...layer,
            height: action.height,
          };
        }
        return layer;
      });
    }
    case "UPDATE_LAYER_BLUR": {
      return state.map((layer, index) => {
        if (index === action.index) {
          return {
            ...layer,
            blur: action.blur,
          };
        }
        return layer;
      });
    }
    case "CHANGE_GRADIENT_TYPE": {
      return state.map((layer, index) => {
        if (index === action.index) {
          const gradientType =
            layer.gradientType === "linear-gradient"
              ? "radial-gradient"
              : "linear-gradient";
          return {
            ...layer,
            gradientType,
          };
        }
        return layer;
      });
    }
    case "SET_CURRENT_LAYERS":
      return state.map((layer, index) =>
        action.newGradientLayer[index] !== undefined
          ? action.newGradientLayer[index]
          : layer
      );

    default: {
      return state;
    }
  }
}
