import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100% ",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorNameInput: {
    width: "100%",
    height: "70px",
    margin: "1rem 0 ",
  },
});

const ColorPickerForm = ({ paletteIsFull, addNewColor, colors }) => {
  const [currentColor, setCurrentColor] = useState({ hex: "#f50" });
  const [newColorName, setNewColorName] = useState("");

  const classes = useStyles();
  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );

    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== currentColor.hex)
    );
  }, [colors, currentColor]);

  const handleSubmit = () => {
    const newColor = { color: currentColor.hex, name: newColorName };
    addNewColor(newColor);

    setNewColorName("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "colorName") {
      setNewColorName(value);
    }
  };
  return (
    <div>
      <ChromePicker
        className={classes.picker}
        color={currentColor}
        onChangeComplete={(newcolor) => setCurrentColor(newcolor)}
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          label="Color Name"
          className={classes.colorNameInput}
          name="colorName"
          value={newColorName}
          variant="filled"
          onChange={(e) => handleChange(e)}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name!",
            "Color name must be unique!",
            "Color already used!",
          ]}
        />
        <Button
          className={classes.addColor}
          variant="contained"
          type="submit"
          color="secondary"
          style={{
            backgroundColor: paletteIsFull ? "grey" : currentColor.hex,
          }}
          disabled={paletteIsFull}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default React.memo(ColorPickerForm);
