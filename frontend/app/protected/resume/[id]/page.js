"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";

function ResumeDetailsPage() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/resume/${id}`);
        setResume(res.resume);
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchResume();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!resume) return <p className="p-6 text-red-500">Resume not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{resume.title || "Untitled Resume"}</h1>
      <p className="text-gray-600 mb-4">
        Created: {new Date(resume.createdAt).toLocaleString()}
      </p>

      {/* Render resume content */}
      <div className="border p-4 rounded bg-white shadow-sm">
        {resume.content || "No content available"}
      </div>
    </div>
  );
}

export default ResumeDetailsPage;
