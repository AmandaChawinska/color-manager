import React, { Component } from "react";
import { Color } from "../types/Color";
import "../styles/ColorForm.scss";

interface ColorFormProps {
  onAddColor: (color: Color) => void;
  existingColors: Color[];
}

interface ColorFormState {
  color: string;
  errorMessage: string;
}

class ColorForm extends Component<ColorFormProps, ColorFormState> {
  constructor(props: ColorFormProps) {
    super(props);
    this.state = {
      color: "",
      errorMessage: "",
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();
    this.setState({ color: value, errorMessage: "" });

    if (value === "") {
      this.setState({ errorMessage: "" });
      return;
    }

    if (this.isValidHex(value)) {
      this.setState({ color: value });
    } else {
      this.setState({ errorMessage: "Invalid hex format" });
    }
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { color } = this.state;
    if (this.isValidColor(color)) {
      if (this.isDuplicateColor(color)) {
        this.setState({ errorMessage: "Color already exists" });
      } else {
        const newColor: Color = { hex: color };
        this.props.onAddColor(newColor);
        this.setState({ color: "", errorMessage: "" });
      }
    } else {
      this.setState({ errorMessage: "Invalid hex color" });
    }
  };

  isValidHex = (value: string): boolean => {
    return /^#[0-9A-F]{0,6}$/i.test(value);
  };

  isValidColor = (color: string): boolean => {
    return /^#[0-9A-F]{6}$/i.test(color);
  };

  isDuplicateColor = (color: string): boolean => {
    return this.props.existingColors.some(
      (existingColor) => existingColor.hex === color
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="color-form">
        <label htmlFor="colorInput">Add Color: </label>
        <input
          type="text"
          id="colorInput"
          maxLength={7}
          placeholder="#RRGGBB"
          value={this.state.color}
          onChange={this.handleChange}
        />
        <button type="submit" disabled={!this.isValidColor(this.state.color)}>
          Add Color
        </button>
        {this.state.errorMessage && (
          <p className="error-message">{this.state.errorMessage}</p>
        )}
      </form>
    );
  }
}

export default ColorForm;
