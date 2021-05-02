import React from "react";
import "../../styles/Slider.scss";

const Slider = ({ onChange, min = "0", max = "100", value = "0", level }) => {
  return (
    <div className="slider-wrapper">
      <span>Level:{level}</span>
      <input
        onChange={onChange}
        className="slider"
        type="range"
        min={min}
        max={max}
        value={value}
      />
    </div>
  );
};

export default React.memo(Slider);
