import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Editor from "./pages/Editor";
import FillFormPage from "./pages/FillFormPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/form/:formId" element={<FillFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
