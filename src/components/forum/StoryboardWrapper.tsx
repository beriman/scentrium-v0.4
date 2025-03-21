import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

interface StoryboardWrapperProps {
  children: React.ReactNode;
}

export default function StoryboardWrapper({
  children,
}: StoryboardWrapperProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={children} />
      </Routes>
    </BrowserRouter>
  );
}
