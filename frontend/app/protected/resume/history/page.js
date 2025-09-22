"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, FileText, Calendar, ChevronDown } from "lucide-react"; // ✅ icons
import api from "@/lib/api";

function ResumeHistoryPage() {
  const [resumes, setResumes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);

  const fetchResumes = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/resume/history?page=${page}&limit=10`);

      // ✅ append resumes instead of replacing
      setResumes((prev) => [...prev, ...res.resumes]);
      setPagination(res.pagination);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes(1);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl  font-bold mb-4 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-600" />
        Your Resume History
      </h1>

      <div className="space-y-3 grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {resumes.map((resume) => (
          <Link
            key={resume._id}
            href={`/protected/resume/${resume._id}`}
            className="block btn btn-secondary p-4  transition"
          >
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 " />
              {resume.title || "Untitled Resume"}
            </h2>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <Calendar className="w-4 h-4" />
              {new Date(resume.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>

      {/* ✅ Load More button */}
      {pagination.page < pagination.pages && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => fetchResumes(pagination.page + 1)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                Load More
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ResumeHistoryPage;
