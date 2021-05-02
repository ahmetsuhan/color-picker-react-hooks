import React from "react";
import "../../styles/SelectBox.scss";
const SelectBox = ({ onSelectChange, textColor = "#000" }) => {
  return (
    <div className="selectbox">
      <select className="selectbox-select" onChange={onSelectChange}>
        <option hidden>Change Color Format</option>
        <option value={"hex"}>HEX</option>
        <option value={"rgb"}>RGB</option>
        <option value={"rgba"}>RGBA</option>
      </select>
    </div>
  );
};

export default React.memo(SelectBox);
