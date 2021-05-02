import React, { useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
const PaletteMetaForm = ({
  newPaletteName,
  palettes,
  setNewPaletteName,
  handleSubmit,
  isModalOpen,
  setIsModalOpen,
  handleCloseModal,
}) => {
  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === "colorName") {
    //   setNewColorName(value);
    // }
    if (name === "newPaletteName") {
      setNewPaletteName(value);
    }
  };

  const savePalette = (emoji) => {
    //console.log(emoji.native);
    const newPalette = { paletteName: newPaletteName, emoji: emoji.native };
    handleSubmit(newPalette);
  };
  return (
    <div>
      <Dialog open={isModalOpen === "emoji"} onClose={handleCloseModal}>
        <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
        <Picker onSelect={savePalette} title="Pick a Palette Emoji" />
      </Dialog>

      <Dialog
        open={isModalOpen === "form"}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => setIsModalOpen("emoji")}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new palette. Make sure it unique!
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              name="newPaletteName"
              value={newPaletteName}
              fullWidth
              margin="normal"
              onChange={(e) => handleChange(e)}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter a palette name!",
                "Palette name already used!",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default React.memo(PaletteMetaForm);
