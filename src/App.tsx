import React, { useState, useEffect } from "react";
import ColorForm from "./components/ColorForm";
import FilterForm from "./components/FilterForm";
import ColorList from "./components/ColorList";
import { Color } from "./types/Color";
import { loadColors, saveColor } from "./utils/colorStorage";
import { sortColors } from "./utils/colorUtils";
import "./styles/App.scss";

const App: React.FC = () => {
  const originalColors = loadColors();
  const [colors, setColors] = useState<Color[]>(loadColors());

  const addColor = (newColor: Color) => {
    const updatedColors = [...colors, newColor];
    setColors(sortColors(updatedColors));
    saveColor(updatedColors);
  };

  const handleRemoveColor = (colorHex: string) => {
    const updatedColors = colors.filter((color) => color.hex !== colorHex);
    setColors(updatedColors);
    saveColor(updatedColors);
  };

  useEffect(() => {
    setColors(sortColors(colors));
  }, [colors]);

  return (
    <div className="app">
      <h1>Color Manager</h1>
      <ColorForm onAddColor={addColor} existingColors={colors} />
      <FilterForm colors={originalColors} setColors={setColors} />
      <ColorList colors={colors} onRemoveColor={handleRemoveColor} />
    </div>
  );
};

export default App;
