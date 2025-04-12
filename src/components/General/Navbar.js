import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-b-2xl">
      <h1 className="text-2xl font-bold">Kanwa</h1>
      <div className="space-x-4 flex items-center">
        <Button component="a" href="/" variant="text" style={{ color: "white" }}>Home</Button>
        <Button variant="text" style={{ color: "white" }} onClick={handleClick}>
          Questions
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem component="a" href="/questions" onClick={handleClose}>All Questions</MenuItem>
          <MenuItem component="a" href="/random" onClick={handleClose}>Random Question</MenuItem>
        </Menu>

        <Button variant="outlined" style={{ color: "white", borderColor: "white" }}>User</Button>
      </div>
    </nav>
  );
};
  
export default Navbar;
