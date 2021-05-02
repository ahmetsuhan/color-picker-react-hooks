import React from "react";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
import chroma from "chroma-js";

const useStyles = makeStyles({
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    "&:hover svg": {
      color: "#fff",
      transform: "scale(1.5)",
    },
    "@media screen and (max-width:1200px)": {
      width: "33.3333%",
    },
    "@media screen and (max-width:900px)": {
      width: "50%",
    },
    "@media screen and (max-width:755px)": {
      width: "100%",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0,0,0,0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteIcon: {
    transition: "all 0.3s ease-in-out",
  },
});

const DraggableColorBox = SortableElement(
  ({ color, name, handleClick, index }) => {
    const classes = useStyles();

    const backgroundStyle = { backgroundColor: color };
    const isDarkColor = chroma(color).luminance() <= 0.08;

    return (
      <div
        className={classes.root}
        style={{
          ...backgroundStyle,
        }}
      >
        <div className={classes.boxContent}>
          <span style={{ color: isDarkColor && "#fff" }}>{name}</span>
          <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
        </div>
      </div>
    );
  }
);

export default React.memo(DraggableColorBox);

/* 
  


*/
