import { Color } from "../types/Color";

export const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

export const calculateSaturation = (r: number, g: number, b: number) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0) return 0;
  return ((max - min) / max) * 100;
};

export const filterColors = (
  colors: Color[],
  filters: { red: boolean; green: boolean; blue: boolean; saturation: boolean }
): Color[] => {
  return colors.filter((color) => {
    const rgb = hexToRgb(color.hex);
    const saturation = calculateSaturation(rgb.r, rgb.g, rgb.b);

    const meetsRedCondition = !filters.red || rgb.r > 127;
    const meetsGreenCondition = !filters.green || rgb.g > 127;
    const meetsBlueCondition = !filters.blue || rgb.b > 127;
    const meetsSaturationCondition = !filters.saturation || saturation > 50;

    return (
      meetsRedCondition &&
      meetsGreenCondition &&
      meetsBlueCondition &&
      meetsSaturationCondition
    );
  });
};

export const sortColors = (colors: Color[]): Color[] => {
  return colors.sort((a, b) => {
    const rgbA = hexToRgb(a.hex);
    const rgbB = hexToRgb(b.hex);

    if (rgbA.r !== rgbB.r) {
      return rgbB.r - rgbA.r;
    }

    if (rgbA.g !== rgbB.g) {
      return rgbB.g - rgbA.g;
    }

    return rgbB.b - rgbA.b;
  });
};
