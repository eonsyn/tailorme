import React, { useState } from "react";
import toast from "react-hot-toast";
import { Download } from "lucide-react"; // nice download icon

// Helper to render **bold** and *italic* text
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

function CoverLetter({ data }) {
  const [loading, setLoading] = useState(false);

  if (!data) return null;

  const { greeting, intro, body, closing, signoff, signature } = data;

  const handleExport = async () => {
    toast.success("Preparing your download...");
    setLoading(true);

    const content = document.getElementById("CoverLetter")?.innerHTML;
    if (!content) {
      toast.error("Nothing to download!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        "https://pdf-704i.onrender.com/generate-pdf-from-html",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: content }),
        }
      );

      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Cover Letter.pdf`;
      link.click();

      toast.success("Download starting...");
    } catch (err) {
      toast.error("Download failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-card rounded-2xl shadow-lg border border-border space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-2">
  <h2 className="text-2xl font-bold text-foreground">Cover Letter</h2>
  <button
    onClick={handleExport}
    disabled={loading}
    className="btn btn-primary flex items-center gap-2 px-5 py-2 rounded-lg shadow hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
  >
    <Download className="w-5 h-5" />
    {loading ? "Preparing..." : "Download PDF"}
  </button>
</div>


      <div id="CoverLetter" className="space-y-4">
        {/* Greeting */}
        {greeting && (
          <p className="text-lg md:text-xl font-medium text-primary">
            {renderFormattedText(greeting)}
          </p>
        )}

        {/* Intro */}
        {intro && (
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            {renderFormattedText(intro)}
          </p>
        )}

        {/* Body paragraphs */}
        {Array.isArray(body) &&
          body.map((para, idx) => (
            <p
              key={idx}
              className="text-base md:text-lg text-foreground leading-relaxed"
            >
              {renderFormattedText(para)}
            </p>
          ))}

        {/* Closing */}
        {closing && (
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            {renderFormattedText(closing)}
          </p>
        )}

        {/* Signoff */}
        {(signoff || signature) && (
          <div className="mt-4 text-base md:text-lg text-foreground space-y-1">
            {signoff && <p>{renderFormattedText(signoff)}</p>}
            {signature && (
              <p className="font-semibold text-primary">
                {renderFormattedText(signature)}
              </p>
            )}
          </div>
        )}
      </div>

       
    </div>
  );
}

export default CoverLetter;
