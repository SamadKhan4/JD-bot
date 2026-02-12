const CandidateList = ({ candidates = [] }) => {
  if (!candidates.length) return null

  return (
    <div className="space-y-4">
      {candidates.map((candidate, index) => (
        <div 
          key={candidate.candidate_id || index}
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-indigo-300"
        >
          {/* Header with Rank and Name */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">
                #{candidate.rank}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {candidate.candidate_name}
                </h3>
                <p className="text-gray-600">{candidate.title_or_role}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(candidate.mongo_similarity_score * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">Match Score</div>
              </div>
            </div>
          </div>

          {/* Candidate Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
            <DetailItem label="Experience" value={candidate.experienceInYears} />
            <DetailItem label="Location" value={candidate.location} />
            <DetailItem label="Job Mode" value={candidate.jobMode} />
            <DetailItem label="Notice Period" value={candidate.noticePeriod} />
            <DetailItem label="Summary" value={candidate.summary} />
            <DetailItem label="ID" value={candidate.candidate_id?.slice(-6)} tooltip={candidate.candidate_id} />
          </div>

          {/* Skills */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">🛠️ Skills</h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills?.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Match Reasons */}
          {candidate.match_reasons && candidate.match_reasons.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">📋 Match Reasons</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.match_reasons.map((reason, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {reason}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const DetailItem = ({ label, value, tooltip }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
    <div 
      className="text-sm font-medium text-gray-800 mt-1 truncate"
      title={tooltip || value}
    >
      {value || 'N/A'}
    </div>
  </div>
)

export default CandidateList