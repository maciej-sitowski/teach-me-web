import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Users/Login";
import ProtectedRoute from "./components/General/ProtectedRoute";
import Questions from "./components/Questions/Questions";
import { fetchQuestions, fetchRandomQuestion } from "./services/api";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/questions"
        element={
          <ProtectedRoute>
            <Questions fetchMethod={fetchQuestions} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Questions fetchMethod={fetchRandomQuestion} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
