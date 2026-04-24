import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Home2 from "./pages/Home2";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home2" element={<Home2 />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
