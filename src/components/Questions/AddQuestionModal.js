import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import "./AddQuestionModal.css";


const AddQuestionModal = ({
  open,
  onClose,
  onAdd,
  newQuestionData,
  setNewQuestionData,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Question</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Title"
          value={newQuestionData.title}
          onChange={(e) =>
            setNewQuestionData({ ...newQuestionData, title: e.target.value })
          }
        />
        <TextField
          fullWidth
          margin="dense"
          label="Answer (Markdown Supported)"
          multiline
          rows={4}
          value={newQuestionData.answer}
          onChange={(e) =>
            setNewQuestionData({ ...newQuestionData, answer: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddQuestionModal;
