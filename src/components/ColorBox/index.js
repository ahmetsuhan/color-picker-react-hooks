import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/ColorBox.scss";
import chroma from "chroma-js";

const ColorBox = ({ background, name, moreUrl, showLink = true, index }) => {
  const [onShowCopyOverlay, setOnShowCopyOverlay] = useState(false);
  const copyToClipBoardRef = useRef(null);
  const docRef = useRef(document);
  const copiedTextRef = useRef(null);

  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.7;

  const handleClick = () => {
    copyToClipBoard(background);
    setOnShowCopyOverlay(true);
    const timeOut = setTimeout(() => {
      setOnShowCopyOverlay(false);
      clearTimeout(timeOut);
    }, 1500);
  };

  const copyToClipBoard = (text) => {
    copiedTextRef.current.select();
    docRef.current.execCommand("copy");
  };

  return (
    <div
      className="colorbox animated-fadein"
      style={{ background: background, animationDelay: `${index * 50}ms` }}
    >
      <div
        className={onShowCopyOverlay ? `copy-overlay show` : "copy-overlay"}
        style={{ background }}
      />
      <div className={`copy-message ${onShowCopyOverlay && "show"}`}>
        <h1>copied!</h1>
        <textarea
          value={background}
          readOnly
          ref={copiedTextRef}
          className={`${isLightColor && "dark-text"}`}
        ></textarea>
      </div>
      <div className="colorbox-copy-container">
        <div className="colorbox-content">
          <span
            className={
              isDarkColor
                ? "colorbox-content-name light-text"
                : "colorbox-content-name"
            }
          >
            {name}
          </span>
        </div>

        <div ref={copyToClipBoardRef}>
          <button
            onClick={() => handleClick()}
            className={`btn btn-copy ${isLightColor && "dark-text"}`}
          >
            Copy
          </button>
        </div>
      </div>
      {showLink && (
        <Link to={moreUrl}>
          <span className={`btn btn-more ${isLightColor && "dark-text"}`}>
            MORE
          </span>
        </Link>
      )}
    </div>
  );
};

export default React.memo(ColorBox);
