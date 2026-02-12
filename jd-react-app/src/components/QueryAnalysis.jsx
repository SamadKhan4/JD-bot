const QueryAnalysis = ({ queryUnderstanding }) => {
  if (!queryUnderstanding) return null

  const { 
    role, 
    must_have_skills = [], 
    nice_to_have_skills = [], 
    experience_level, 
    requested_count, 
    returned_count, 
    constraints = {} 
  } = queryUnderstanding

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-indigo-700 mb-4">🔍 Query Understanding</h3>
      
      {/* Role and Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Role</div>
          <div className="text-lg font-semibold text-gray-800">{role || 'N/A'}</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Experience Level</div>
          <div className="text-lg font-semibold text-gray-800">{experience_level || 'N/A'}</div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Must-have Skills */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
            Must-have Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {must_have_skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Nice-to-have Skills */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
            Nice-to-have Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {nice_to_have_skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Constraints */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">📋 Constraints</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(constraints).map(([key, value]) => (
            <div key={key} className="bg-white p-3 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-sm font-medium text-gray-800 mt-1">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Counts */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200">
        <div className="bg-white px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600">Requested:</span>
          <span className="ml-2 font-semibold text-gray-800">{requested_count || 0}</span>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600">Returned:</span>
          <span className="ml-2 font-semibold text-gray-800">{returned_count || 0}</span>
        </div>
      </div>
    </div>
  )
}

export default QueryAnalysis