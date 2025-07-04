import React, { useEffect, useState } from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails, Button, TextField, Select, MenuItem, InputLabel, FormControl, LinearProgress, Snackbar, Alert } from "@mui/material";
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
  const [selectedTag, setSelectedTag] = useState(""); // State for selected tag
  // Detect if fetchMethod is fetchRandomQuestion
  const isRandom = fetchMethod && fetchMethod.name === "fetchRandomQuestion";

  // Count how many times random question was loaded (persisted per day)
  const [randomCount, setRandomCount] = useState(0);

  // Snackbar for daily goal
  const [goalOpen, setGoalOpen] = useState(false);

  // Daily goal state (persisted in localStorage)
  const [dailyGoal, setDailyGoal] = useState(() => {
    const stored = localStorage.getItem("randomQuestionDailyGoal");
    return stored ? parseInt(stored, 10) : 10;
  });

  // Helper to get today's date as YYYY-MM-DD
  const getToday = () => new Date().toISOString().slice(0, 10);

  // On mount, initialize counter from localStorage if random mode
  useEffect(() => {
    if (isRandom) {
      const stored = JSON.parse(localStorage.getItem("randomQuestionCounter") || '{}');
      if (stored.date === getToday()) {
        setRandomCount(stored.count || 1);
      } else {
        setRandomCount(1);
        localStorage.setItem("randomQuestionCounter", JSON.stringify({ date: getToday(), count: 1 }));
      }
    } else {
      setRandomCount(0);
    }
  }, [isRandom, selectedTag]);

  // Handler for fetching next random question
  const handleNextQuestion = async () => {
    const data = await fetchMethod(selectedTag);
    const normalizedData = data.items ? data.items : [data];
    setQuestions(normalizedData);
    setRandomCount((prev) => {
      const next = prev + 1;
      localStorage.setItem("randomQuestionCounter", JSON.stringify({ date: getToday(), count: next }));
      return next;
    });
  };

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchMethod(selectedTag);
      const normalizedData = data.items ? data.items : [data];
      setQuestions(normalizedData);
    };
    loadQuestions();
  }, [fetchMethod, selectedTag]);

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
  
  // Allowed tags
  const allowedTags = ["kubernetes", "fastapi"];

  // No frontend filtering, just use questions as is
  const displayedQuestions = questions;

  // Handler to change daily goal
  const handleGoalChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10) || 1);
    setDailyGoal(value);
    localStorage.setItem("randomQuestionDailyGoal", value);
  };

  // Handler to reset counter
  const handleResetCounter = () => {
    setRandomCount(0);
    localStorage.setItem("randomQuestionCounter", JSON.stringify({ date: getToday(), count: 0 }));
  };

  useEffect(() => {
    if (isRandom && randomCount === dailyGoal) {
      setGoalOpen(true);
    }
  }, [isRandom, randomCount, dailyGoal]);

  return (
    <div className="questions-container">
      <Typography variant="h4" className="questions-title" style={{ marginBottom: 24 }}>
        Questions
      </Typography>
      {/* Controls Row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Add New Question
        </Button>
        {isRandom && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNextQuestion}
          >
            Next question
          </Button>
        )}
        <TextField
          label="Search Questions"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ minWidth: 200, flex: 1 }}
        />
        <FormControl style={{ minWidth: 150 }}>
          <InputLabel id="tag-filter-label">Filter by Tag</InputLabel>
          <Select
            labelId="tag-filter-label"
            value={selectedTag}
            label="Filter by Tag"
            onChange={e => setSelectedTag(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {allowedTags.map(tag => (
              <MenuItem key={tag} value={tag}>{tag}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <AddQuestionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddQuestion}
        newQuestionData={newQuestionData}
        setNewQuestionData={setNewQuestionData}
      />
        {displayedQuestions.map((question) => (
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
                  <ReactMarkdown
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
      {/* Move counter and progress bar to bottom */}
      {isRandom && (
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <TextField
              type="number"
              label="Daily Goal"
              value={dailyGoal}
              onChange={handleGoalChange}
              inputProps={{ min: 1, style: { textAlign: 'center', width: 80 } }}
              size="small"
              style={{ maxWidth: 120 }}
            />
            <Button variant="outlined" color="secondary" onClick={handleResetCounter}>
              Reset Counter
            </Button>
          </div>
          <Typography variant="subtitle1" style={{ marginBottom: 8 }}>
            Random questions loaded: {randomCount} / {dailyGoal}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min((randomCount / dailyGoal) * 100, 100)}
            style={{ height: 10, borderRadius: 5, maxWidth: 400, margin: "0 auto" }}
          />
        </div>
      )}
      {/* Snackbar for daily goal */}
      <Snackbar open={goalOpen} autoHideDuration={4000} onClose={() => setGoalOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setGoalOpen(false)} severity="success" sx={{ width: '100%' }}>
          🎉 Daily goal achieved! Great job!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Questions;
