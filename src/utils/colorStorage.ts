import { Color } from "../types/Color";

export const loadColors = (): Color[] => {
  const colors = localStorage.getItem("colors");
  return colors ? JSON.parse(colors) : [];
};

export const saveColor = (colors: Color[]) => {
  localStorage.setItem("colors", JSON.stringify(colors));
};
