import React from "react";
import "../../styles/Navbar.scss";
import SelectBox from "../SelectBox";
import Slider from "../Slider";
import { Link } from "react-router-dom";

const Navbar = ({ level, value, handleChange, handleColorFormat, slider }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Aso Colorpicker</Link>
      </div>
      {slider && (
        <Slider
          min={100}
          max={900}
          value={value}
          level={level}
          onChange={handleChange}
        />
      )}

      <div className="select-container">
        <SelectBox onSelectChange={handleColorFormat} />
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
