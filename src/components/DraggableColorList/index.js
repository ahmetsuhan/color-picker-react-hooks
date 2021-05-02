import React, { useRef } from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "../DraggableColorBox";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    height: "100%",
  },
});

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  const containerRef = useRef(null);

  const classes = useStyles();
  return (
    <div ref={containerRef} className={classes.container}>
      {colors.map((color, index) => {
        return (
          <DraggableColorBox
            index={index}
            key={color.name}
            color={color.color}
            name={color.name}
            handleClick={() => removeColor(color.name)}
          />
        );
      })}
    </div>
  );
});

export default React.memo(DraggableColorList);
