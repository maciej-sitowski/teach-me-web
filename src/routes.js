import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Users/Login";
import ProtectedRoute from "./components/General/ProtectedRoute";
import Questions from "./components/Questions/Questions";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Questions />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
