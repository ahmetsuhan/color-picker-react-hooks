import React from "react";
import "../../styles/Footer.scss";

const Footer = ({ paletteName, paletteEmoji }) => {
  return (
    <footer className="footer">
      <span>{paletteName}</span>
      <span className="emoji">{paletteEmoji}</span>
    </footer>
  );
};

export default React.memo(Footer);
