import React from "react"

function CoverLetter({ data }) {
  if (!data) return null

  const { greeting, intro, body, closing, signoff, signature } = data

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-2xl mx-auto leading-relaxed text-gray-800">
      <p className="mb-4">{greeting}</p>

      <p className="mb-4">{intro}</p>

      {Array.isArray(body) &&
        body.map((para, idx) => (
          <p key={idx} className="mb-4">
            {para}
          </p>
        ))}

      <p className="mb-4">{closing}</p>

      <div className="mt-6">
        <p>{signoff}</p>
        <p className="font-semibold">{signature}</p>
      </div>
    </div>
  )
}

export default CoverLetter
