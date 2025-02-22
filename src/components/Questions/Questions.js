import React, { useEffect, useState } from "react";
import { List, ListItem, Typography, Accordion, AccordionSummary, AccordionDetails, Button, TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddQuestionModal from "./AddQuestionModal";
import QuestionMenu from "./QuestionMenu";
import { addQuestion, deleteQuestion, updateQuestion } from "../../services/api";
import "./Questions.css";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Box } from "@mui/material";



const Questions = ( {fetchMethod} ) => {
  const [questions, setQuestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newQuestionData, setNewQuestionData] = useState({ title: "", answer: "" });
  const [editingId, setEditingId] = useState(null); // Track the ID of the question being edited
  const [formData, setFormData] = useState({ title: "", answer: "" }); // Store the form data for editing
  const [searchQuery, setSearchQuery] = useState(""); // State for search query


  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchMethod();
      const normalizedData = data.items ? data.items : [data];
      setQuestions(normalizedData);
    };
    loadQuestions();
  }, [fetchMethod]);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const handleAddQuestion = async () => {
    try {
      const addedQuestion = await addQuestion(newQuestionData);
      setQuestions((prev) => [...prev, addedQuestion]);
      setModalOpen(false);
      setNewQuestionData({ title: "", answer: "" });
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (!confirmDelete) return; // Exit if the user cancels
  
    try {
      await deleteQuestion(id); // Call the API to delete the question
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
      alert("Question deleted successfully");
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question");
    }
  };

  const handleEdit = (id, title, answer) => {
    setEditingId(id); // Set the ID of the question being edited
    setFormData({ title, answer }); // Populate the form with the existing data
  };


  const handleSave = async () => {
    try {
      const updatedQuestion = await updateQuestion(editingId, formData);
  
      // Update the questions state
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === editingId ? updatedQuestion : q
        )
      );
  
      setEditingId(null); // Exit edit mode
      setFormData({ title: "", answer: "" }); // Clear the form
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update question");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="questions-container">
      <Typography variant="h4" className="questions-title">
        Questions
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "16px" }}
        onClick={() => setModalOpen(true)}
      >
        Add New Question
      </Button>
      <TextField
        label="Search Questions"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "16px" }}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <AddQuestionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddQuestion}
        newQuestionData={newQuestionData}
        setNewQuestionData={setNewQuestionData}
      />
        {filteredQuestions.map((question) => (
            <Accordion className="accordion" key={question.id}>
              <AccordionSummary
                className="accordion-summary"
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${question.id}-content`}
                id={`panel${question.id}-header`}
              >
                {editingId === question.id ? (
                  <TextField
                    fullWidth
                    label="Title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                ) : (
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {question.title}
                  </Typography>
                )}
                <QuestionMenu
                  onEdit={() => handleEdit(question.id, question.title, question.answer)}
                  onDelete={() => handleDeleteQuestion(question.id)}
                />
              </AccordionSummary>
              <AccordionDetails className="accordion-details">
                {editingId === question.id ? (
                  <>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Answer"
                      value={formData.answer}
                      onChange={(e) =>
                        setFormData({ ...formData, answer: e.target.value })
                      }
                    />
                    <div className="action-buttons">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <ReactMarkdown className='markdown-container'
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <Box
                            sx={{
                              position: "relative",
                              backgroundColor: "#282c34",
                              border: "0.5px solid #ddd",
                              borderRadius: "8px",
                              marginBottom: "16px",
                              overflow: "hidden",
                            }}
                          >
                            <SyntaxHighlighter
                              style={atomOneLight}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                            <IconButton
                              sx={{
                                position: "absolute",
                                top: "2px",
                                right: "4px",
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                color: "#333",
                                padding: "2px",
                                borderRadius: "4px",
                                transition: "background-color 0.2s ease",
                                "&:hover": { backgroundColor: "#ffffff", color: "#000" },
                              }}
                              onClick={() => handleCopyCode(String(children).replace(/\n$/, ""))}
                            >
                              <ContentCopyIcon />
                            </IconButton>
                          </Box>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {question.answer}
                  </ReactMarkdown>
                )}
              </AccordionDetails>

            </Accordion>
        ))}
    </div>
  );
};

export default Questions;
