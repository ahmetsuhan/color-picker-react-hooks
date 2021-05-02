import React from "react";
import "../../styles/InfoPopup.scss";
import Proptypes from "prop-types";

const InfoPopup = ({ show = false, text }) => {
  return (
    <div className={show ? `info-popup show` : "info-popup"}>
      <div className="info-popup-container">
        <span className="info-popup-text">{text}</span>
      </div>
    </div>
  );
};

InfoPopup.prototype = {
  show: Proptypes.bool.isRequired,
  text: Proptypes.string.isRequired,
};

export default React.memo(InfoPopup);
