import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import ColorBox from "../ColorBox";
import Navbar from "../Navbar";
import { manageColorFormat } from "../../helpers/ColorBoxHelper";
import Footer from "../Footer";
import InfoPopup from "../InfoPopup";

const SingleColorPalette = ({ palette, colorId }) => {
  const [format, setFormat] = useState("hex");
  const [showPopup, setShowPopup] = useState(false);

  const history = useHistory();

  let timeout;
  const timeoutRef = useRef(timeout);

  // const handleShowPopup = () => {
  //   setShowPopup(true);

  //   timeout = setTimeout(() => {
  //     setShowPopup(false);
  //   }, 3000);
  // };

  useEffect(() => {
    setShowPopup(true);

    timeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [format]);

  const gatherShades = (palette, colorId) => {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorId)
      );
    }

    // console.log(palette);
    return shades.slice(1);
  };

  return (
    <div className="singleColorPalette palette">
      <Navbar handleColorFormat={(e) => setFormat(e.target.value)} />

      <div className="palette-colors">
        {gatherShades(palette, colorId).map((color) => {
          return (
            <ColorBox
              showLink={false}
              key={color.name}
              name={color.name}
              background={manageColorFormat(color, format)}
            />
          );
        })}
        <div
          onClick={() => history.push(`/palette/${palette.id}`)}
          className="go-back colorbox"
        />
      </div>
      <Footer paletteName={palette.paletteName} paletteEmoji={palette.emoji} />
      <InfoPopup text="Format Changed!" show={showPopup} />
    </div>
  );
};

export default React.memo(SingleColorPalette);
