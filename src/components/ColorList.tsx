import React from "react";
import { Color } from "../types/Color";
import "../styles/ColorList.scss";

const defaultColors: Color[] = [
  { hex: "#FF5733" },
  { hex: "#33FF57" },
  { hex: "#3357FF" },
  { hex: "#F1C40F" },
  { hex: "#8E44AD" },
];

interface ColorListProps {
  colors: Color[];
  onRemoveColor: (colorHex: string) => void;
}

const ColorList: React.FC<ColorListProps> = ({ colors, onRemoveColor }) => {
  const combinedColors = [
    ...defaultColors,
    ...colors.filter(
      (color) =>
        !defaultColors.some((defaultColor) => defaultColor.hex === color.hex)
    ),
  ];

  return (
    <div className="color-list">
      {combinedColors.map((color) => (
        <div key={color.hex} className="color-item">
          <div
            className="color-box"
            style={{ backgroundColor: color.hex }}
          ></div>
          <span>{color.hex}</span>
          {colors.some((userColor) => userColor.hex === color.hex) &&
            !defaultColors.some(
              (defaultColor) => defaultColor.hex === color.hex
            ) && (
              <button
                className="remove-button"
                onClick={() => onRemoveColor(color.hex)}
              >
                X
              </button>
            )}
        </div>
      ))}
    </div>
  );
};

export default ColorList;
