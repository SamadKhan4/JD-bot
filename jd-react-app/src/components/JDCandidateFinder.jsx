import { useState } from 'react'
import QueryAnalysis from './QueryAnalysis'
import CandidateList from './CandidateList'

const JDCandidateFinder = () => {
  const [jdText, setJdText] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sampleJD = `AI/ML Engineer with 4-7 years experience. Skills: Python, Machine Learning, Deep Learning, NLP. Frameworks: TensorFlow or PyTorch. Cloud: AWS or GCP. Location: Delhi NCR. Job mode: Onsite. Shift: Day. Notice period less than 45 days. Salary 15-22 LPA.`

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!jdText.trim()) {
      setError('Please enter a job description')
      return
    }

    setLoading(true)
    setError('')
    setResults(null)

    try {
      const response = await fetch('https://eliteassociate1.app.n8n.cloud/webhook/candidate/recommand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: jdText }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('API Response:', data)
      
      if (data && data.length > 0 && data[0].results) {
        setResults(data[0])
      } else {
        setError('No candidates found for this job description')
      }
    } catch (err) {
      console.error('Error:', err)
      setError(`Failed to fetch candidates: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
          🤖 JD Chatbot
        </h1>
        <p className="text-xl text-white/90 drop-shadow">
          Intelligent Candidate Recommendation System
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Enter Job Description</h2>
          
          <form onSubmit={handleSubmit}>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Enter job description here..."
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-y text-gray-700"
              disabled={loading}
            />
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Finding Candidates...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    Find Candidates
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setJdText(sampleJD)}
                className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Load Sample JD
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">❌</span>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {results && (
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <p className="text-green-700">
                Found {results.results?.length || 0} matching candidates!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {results && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Analysis & Results</h2>
          
          <QueryAnalysis queryUnderstanding={results.query_understanding} />
          
          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">👥 Recommended Candidates</h3>
          <CandidateList candidates={results.results} />
        </div>
      )}
    </div>
  )
}

export default JDCandidateFinder