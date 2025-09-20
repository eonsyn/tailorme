'use client';
import React, { useState } from 'react';

function SubjectCard({ subject, index }) {
    const [countdown, setCountdown] = useState(null);

    const truncatedSubjectName = subject.subjectName.length > 18
        ? `${subject.subjectName.slice(0, 18)}..`
        : subject.subjectName;

    const handleDownload = () => {
        let seconds = 5;
        setCountdown(seconds);

        const interval = setInterval(() => {
            seconds--;
            setCountdown(seconds);
            if (seconds <= 0) {
                clearInterval(interval);

                // Create and click a temporary link to bypass popup block
                const link = document.createElement('a');
                link.href = subject.pdfUrl;
                link.rel = 'noopener noreferrer';
                link.click();

                setCountdown(null);
            }
        }, 1000);
    };
const notesImage='https://res.cloudinary.com/dgp04dpun/image/upload/v1749043937/aktu%20brand/qxsut3frrxclshbkbr2g.png'
const quantumImage='https://res.cloudinary.com/dgp04dpun/image/upload/v1749055762/aktu%20brand/bx7xuu0pqunphezawiue.png'
    return (
        <div
            key={index}
            title={subject.subjectName}
            className="bg-surface rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 p-5 mb-6"
        >
            <div className="flex flex-col items-center">
                <img
                   src={
    subject.cardImageUrl
      ? subject.cardImageUrl
      : subject.type === 'notes'
        ? notesImage
        : quantumImage
  }
                    alt={subject.subjectName}
                    className="w-full h-48 object-cover rounded-xl border-2 border-amber-400 mb-4"
                />
 
                <h2
                    title={subject.subjectName}
                    className="text-2xl font-bold text-primary w-full mb-2  hover:text-amber-600 transition-colors duration-300"
                >
                    {truncatedSubjectName}
                </h2>

                <p className="text-secondary text-sm w-full leading-relaxed mb-4">
                    {subject.description}
                </p>

                <div className="flex items-center justify-between w-full text-sm text-gray-700 mb-2">
                    <div>
                        <p className="font-medium">Subject Code</p>
                        <p className="text-amber-600 font-semibold">
                            {subject.subjectCode || 'Not available'}
                        </p>
                    </div>

                    <button
                        onClick={handleDownload}
                        disabled={countdown !== null && countdown > 0}
                        className={`px-5 py-2 cursor-pointer rounded-lg text-white font-semibold transition duration-300 ${
                            countdown !== null && countdown > 0
                                ? 'bg-highlight cursor-not-allowed opacity-60'
                                : 'bg-highlight shadow-md'
                        }`}
                    >
                        {countdown !== null && countdown > 0
                            ? `Downloading in ${countdown}s...`
                            : 'Download'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubjectCard;
