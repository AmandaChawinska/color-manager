import React, { useState, useEffect } from "react";
import { Color } from "../types/Color";
import { filterColors } from "../utils/colorUtils";
import "../styles/FilterForm.scss";

interface FilterFormProps {
  colors: Color[];
  setColors: (colors: Color[]) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ colors, setColors }) => {
  const [filters, setFilters] = useState({
    red: false,
    green: false,
    blue: false,
    saturation: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const filteredColors = filterColors(colors, filters);
    setColors(filteredColors);
  }, [filters, colors, setColors]);

  return (
    <form className="filter-form">
      <label>
        <input
          type="checkbox"
          name="red"
          checked={filters.red}
          onChange={handleChange}
        />
        Red {">"} 50%
      </label>
      <label>
        <input
          type="checkbox"
          name="green"
          checked={filters.green}
          onChange={handleChange}
        />
        Green {">"} 50%
      </label>
      <label>
        <input
          type="checkbox"
          name="blue"
          checked={filters.blue}
          onChange={handleChange}
        />
        Blue {">"} 50%
      </label>
      <label>
        <input
          type="checkbox"
          name="saturation"
          checked={filters.saturation}
          onChange={handleChange}
        />
        Saturation {">"} 50%
      </label>
    </form>
  );
};

export default FilterForm;
