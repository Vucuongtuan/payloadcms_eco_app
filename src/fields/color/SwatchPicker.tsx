import { useThrottle } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

type SwatchesPickerProps = {
  color: string;
  onChange: (v: string) => void;
  presetColors: string[];
};

export const SwatchPicker: React.FC<SwatchesPickerProps> = ({
  color = "#ffffff",
  onChange,
  presetColors,
}) => {
  const [selectedColor, setSelectedColor] = useState(color);
  const newColor = useThrottle(selectedColor, 500);

  useEffect(() => {
    onChange(newColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newColor]);

  return (
    <>
      <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
      <div className="swatches">
        {presetColors.map((presetColor) => (
          <div
            key={presetColor}
            className="swatch"
            style={{ background: presetColor }}
            onClick={() => onChange(presetColor)}
          />
        ))}
      </div>
    </>
  );
};