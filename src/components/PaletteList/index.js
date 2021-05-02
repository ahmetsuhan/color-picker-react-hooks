import React, { useState } from "react";
import MiniPalette from "../MiniPalette";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Avatar from "@material-ui/core/Avatar";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#000",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflowY: "scroll",
    "@media screen and (max-width:940px)": {
      height: "auto",
    },
  },
  container: {
    width: "60%",

    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    "@media screen and (max-width:940px)": {
      width: "40%",
    },
    "@media screen and (max-width:576px)": {
      width: "60%",
    },
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    "& a": {
      color: "#fff",
    },
  },
  palettes: {
    background: "#fff",
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: "1rem",
    width: "100%",
    overflowY: "scroll",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "2rem",
    "@media screen and (max-width:940px)": {
      gridTemplateColumns: "repeat(1,100%)",
      gridGap: "1.5rem",
    },

    "&::-webkit-scrollbar": {
      opacity: 0,
    },
    "&:last-child": {
      marginBottom: "1rem ",
    },
  },
});

const PaletteList = ({ palettes, deletePalette }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const classes = useStyles();

  const openDialog = (id) => {
    setOpenDeleteDialog(true);
    setDeletingId(id);
  };

  const closeDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleDelete = () => {
    deletePalette(deletingId);
    closeDialog();
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map((palette, index) => {
            return (
              <MiniPalette openDialog={openDialog} key={index} {...palette} />
            );
          })}
        </div>
      </div>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="delete-dialog-title"
        onClose={closeDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>

          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default React.memo(PaletteList);
