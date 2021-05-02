import React, { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PaletteMetaForm from "../PaletteMetaForm.js";
import { AddToPhotos } from "@material-ui/icons/";

const useStyles = makeStyles({
  navBtns: {
    marginRight: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    margin: "0.5rem",
  },
});

const PaletteFormNav = ({
  open,
  palettes,
  handleDrawerOpen,
  handleSubmit,
  newPaletteName,
  setNewPaletteName,
  classes,
}) => {
  const [isModalOpen, setIsModalOpen] = useState("none");
  const specialClasses = useStyles();

  const handleClickOpen = () => {
    setIsModalOpen("form");
  };

  const handleCloseModal = () => {
    setIsModalOpen("none");
    setNewPaletteName("");
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <AddToPhotos />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={specialClasses.navBtns}>
          <Link to="/">
            <Button
              className={specialClasses.button}
              variant="contained"
              color="secondary"
            >
              Go Back
            </Button>
          </Link>
          <Button
            className={specialClasses.button}
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
          >
            Save Palette
          </Button>
        </div>
      </AppBar>
      {isModalOpen && (
        <PaletteMetaForm
          setIsModalOpen={setIsModalOpen}
          setNewPaletteName={setNewPaletteName}
          handleSubmit={handleSubmit}
          palettes={palettes}
          newPaletteName={newPaletteName}
          isModalOpen={isModalOpen}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default React.memo(PaletteFormNav);
