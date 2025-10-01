import React, { useState } from "react";

// Helper function to render bold (**text**) and italic (*text*)
const renderFormattedText = (text) => {
  if (!text) return null;

  const boldParts = text.split(/(\*\*.*?\*\*)/g);
  return boldParts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    const italicParts = part.split(/(\*.*?\*)/g);
    return italicParts.map((subPart, subIndex) => {
      if (subPart.startsWith("*") && subPart.endsWith("*")) {
        return <em key={`${index}-${subIndex}`}>{subPart.slice(1, -1)}</em>;
      }
      return <span key={`${index}-${subIndex}`}>{subPart}</span>;
    });
  });
};

function ImprovementTips({ data }) {
  const tipsToDisplay = Array.isArray(data) && data.length > 0 ? data : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next"); // for animation direction

  if (tipsToDisplay.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-6">
        No improvement tips available at the moment.
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < tipsToDisplay.length - 1) {
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

  return (
    <div className="max-w-2xl mx-auto 
    bg-card  pt-2 rounded-2xl shadow-lg border border-border transition-all duration-300 overflow-x-hidden hover:shadow-xl hover:border-primary">
      <h2 className="text-2xl font-bold text-foreground text-center border-b border-border pb-2">
        Improvement Tips
      </h2>

      {/* Card with fixed height + animation */}
      <div className="bg-card  p-6 rounded-2xl shadow-lg  transition-all duration-300 overflow-x-hidden hover:shadow-xl hover:border-primary flex flex-col h-[300px]">
        {/* Scrollable Content */}
        <div
          key={currentIndex}
          className={`flex-1 overflow-y-auto text-muted-foreground text-base md:text-lg leading-relaxed transition-all duration-500 ${
            direction === "next"
              ? "animate-slide-left"
              : "animate-slide-right"
          }`}
        >
          {renderFormattedText(tipsToDisplay[currentIndex])}
        </div>

        {/* Navigation Buttons */}
        {tipsToDisplay.length > 1 && (
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
              disabled={currentIndex === tipsToDisplay.length - 1}
              className={`px-4 py-2 rounded-lg border border-border shadow-sm transition-all duration-200 hover:bg-primary/10 ${
                currentIndex === tipsToDisplay.length - 1
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

export default ImprovementTips;
