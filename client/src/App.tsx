import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import FillFormPage from "./pages/FillFormPage";
// import Editor from "./pages/Editor";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Editor />} />
        <Route path="/form/:formId" element={<FillFormPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
