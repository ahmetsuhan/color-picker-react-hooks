import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles({
  root: {
    backgroundColor: "purple",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    animationName: "fadein",
    animationDuration: "2s",
    animationDirection: "alternate",
    animationTimingFunction: "ease-in",
    opacity: 1,
    "&:hover svg": {
      opacity: 1,
    },
  },
  colors: {
    height: "150px",
    width: "100%",
    backgroundColor: "#dea1e4",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "white",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.8px",
  },
  deleteIcon: {
    color: "#fff",
    width: "20px",
    height: "20px",
    position: "absolute",
    backgroundColor: "red",
    right: 0,
    top: 0,
    zIndex: 10,
    opacity: 0,
    transition: "all 0.3s ease-in-out",
  },

  "@keyframes fadein": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
});

const MiniPalette = ({ paletteName, emoji, colors, id, openDialog }) => {
  const classes = useStyles();

  const history = useHistory();

  const miniColorBoxes = colors.map((color) => {
    return (
      <div
        key={color.name}
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
      ></div>
    );
  });

  const handleRouting = (id) => {
    history.push(`/palette/${id}`);
  };
  const handleDelete = (e) => {
    e.stopPropagation();

    removePalette();
  };

  const removePalette = (e) => {
    openDialog(id);
  };
  //console.log(paletteName);
  return (
    <div onClick={() => handleRouting(id)} className={classes.root}>
      <DeleteIcon
        onClick={(e) => handleDelete(e)}
        className={classes.deleteIcon}
      />

      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

export default React.memo(MiniPalette);
