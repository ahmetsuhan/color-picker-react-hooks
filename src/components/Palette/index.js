import React, { useMemo, useState, useEffect, useRef } from "react";
import "../../styles/Palette.scss";
import ColorBox from "../ColorBox/";
import Navbar from "../Navbar";
import InfoPopup from "../InfoPopup/";
import Footer from "../Footer";
import { manageColorFormat } from "../../helpers/ColorBoxHelper";
const Palette = ({ palette }) => {
  //console.log({ palette });
  const [input, setInput] = useState(500);
  const [colorFormat, setColorFormat] = useState("hex");
  const [showPopup, setShowPopup] = useState(false);

  const { id } = palette;

  let timeout;
  const timeOutRef = useRef(timeout);
  const handleShowPopup = () => {
    setShowPopup(true);

    timeOutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };
  useEffect(() => {
    handleShowPopup();

    return () => {
      clearTimeout(timeOutRef.current);
    };
  }, [colorFormat]);

  let value;
  const valueRef = useRef(value);

  const memoizedControlRange = useMemo(() => {
    valueRef.current = input;
    const remain = input % 100;
    if (input < 100) {
      return 100;
    }
    if (remain < 50) {
      valueRef.current -= remain;
    } else {
      valueRef.current -= remain;
      valueRef.current += 100;
    }

    return valueRef.current;
  }, [input]);
  const colorBoxes = palette.colors[memoizedControlRange].map(
    (color, index) => {
      return (
        <ColorBox
          key={index}
          index={index}
          background={manageColorFormat(color, colorFormat)}
          name={color.name}
          moreUrl={`/palette/${id}/${color.id}`}
          showLink
        />
      );
    }
  );

  return (
    <div className="palette">
      <Navbar
        value={input}
        level={value}
        handleChange={(e) => setInput(e.target.value)}
        handleColorFormat={(e) => setColorFormat(e.target.value)}
        slider
      />
      <div className="palette-colors">{colorBoxes}</div>
      <InfoPopup text="Format Changed!" show={showPopup} />
      <Footer paletteName={palette.paletteName} paletteEmoji={palette.emoji} />
    </div>
  );
};

export default React.memo(Palette);
