import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./QuestionMenu.css";


const QuestionMenu = ({ onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onEdit();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onDelete();
          }}
          style={{ color: "red" }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default QuestionMenu;
