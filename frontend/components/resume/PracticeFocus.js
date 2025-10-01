import React, { useState } from "react";
import { Lightbulb, Code, GitBranch } from "lucide-react";

// Icon mapping
const iconMap = {
  projects: Code,
  javascript: Lightbulb,
  git: GitBranch,
  frontend: Code,
};

// Function to select icon based on tip string
const getIconForTip = (tipString) => {
  if (tipString.toLowerCase().includes("project") || tipString.toLowerCase().includes("build")) {
    return iconMap.projects;
  }
  if (tipString.toLowerCase().includes("javascript") || tipString.toLowerCase().includes("css")) {
    return iconMap.javascript;
  }
  if (tipString.toLowerCase().includes("git") || tipString.toLowerCase().includes("repository")) {
    return iconMap.git;
  }
  return Lightbulb; // Default icon
};

// Render **bold** text
const renderFormattedText = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

function PracticeFocus({ data }) {
  const focusAreas = Array.isArray(data) && data.length > 0 ? data : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  if (focusAreas.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-6">
        No specific practice focus areas defined.
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < focusAreas.length - 1) {
      setDirection("next");
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection("back");
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentTip = focusAreas[currentIndex];
  const IconComponent = getIconForTip(currentTip);

  return (
    <div className="max-w-2xl mx-auto 
    bg-card  pt-2 rounded-2xl shadow-lg border border-border transition-all duration-300 overflow-x-hidden hover:shadow-xl hover:border-primary
    ">
      <h2 className="text-2xl font-bold text-foreground text-center border-b border-border pb-2">
        Focus On
      </h2>

      {/* Tip Card */}
      <div className="bg-card  p-6 rounded-2xl shadow-lg  transition-all duration-300 overflow-x-hidden hover:shadow-xl hover:border-primary flex flex-col h-[300px]">
        {/* Scrollable Content with Animation */}
        <div
          key={currentIndex}
          className={`flex-1 overflow-y-auto pr-2 text-muted-foreground text-base md:text-lg leading-relaxed transition-all duration-500 ${
            direction === "next" ? "animate-slide-left" : "animate-slide-right"
          }`}
        >
          
          {renderFormattedText(currentTip)}
        </div>

        {/* Fixed Buttons */}
        {focusAreas.length > 1 && (
          <div className="flex justify-between mt-4 pt-3 border-t border-border">
            <button
              onClick={handleBack}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded-lg border border-border shadow-sm transition-all duration-200 hover:bg-primary/10 ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === focusAreas.length - 1}
              className={`px-4 py-2 rounded-lg border border-border shadow-sm transition-all duration-200 hover:bg-primary/10 ${
                currentIndex === focusAreas.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PracticeFocus;
