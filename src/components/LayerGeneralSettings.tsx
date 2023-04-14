import { useState } from "react";
import { GradientLayer, Input } from "./index";

interface LayerGeneralSettingsProps {
  layerIndex: number;
  angle: string;
  gradientType: "linear-gradient" | "radial-gradient";
  gradientLayers: GradientLayer[];
}

export default function LayerGeneralSettings(props: LayerGeneralSettingsProps) {
  const { layerIndex, angle, gradientType, gradientLayers } = props;

  const [localGradientLayer, setLocalGradientLayer] = useState<GradientLayer>(
    gradientLayers[layerIndex]
  );

  return (
    <div className="flex">
      {gradientType === "linear-gradient" && (
        <div className="w-full">
          <Input
            min={0}
            max={360}
            step={1}
            value={localGradientLayer.angle}
            onChange={(e) =>
              setLocalGradientLayer((prev) => ({
                ...prev,
                angle: e,
              }))
            }
            text={`Angle ${angle}°`}
            type={"range"}
            className={"select-none"}
          />
        </div>
      )}
    </div>
  );
}
