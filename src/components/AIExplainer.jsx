import { useState } from 'react'

export default function AIExplainer({ step, algorithm }) {
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleExplain() {
    setLoading(true)
    setError('')
    setExplanation('')

    const prompt = `I am visualizing ${algorithm} sort step by step.
Current array: ${JSON.stringify(step.array)}
Comparing indices: ${JSON.stringify(step.comparing)}
Swapping indices: ${JSON.stringify(step.swapping)}
Sorted indices: ${JSON.stringify(step.sorted)}
Step description: ${step.description}

Explain what is happening in this exact step in 3-4 simple sentences.
Focus on WHY this comparison or swap is needed, not just what is happening.
Keep it beginner friendly.`

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      })

      const data = await response.json()
      const text = data.content?.find(b => b.type === 'text')?.text
      if (text) {
        setExplanation(text)
      } else {
        setError('No explanation returned.')
      }
    } catch (err) {
      setError('Failed to get explanation. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-explainer">
      <button onClick={handleExplain} disabled={loading} className="ai-btn">
        {loading ? '⏳ Thinking...' : '✨ Explain This Step (AI)'}
      </button>
      {error && <p className="error">{error}</p>}
      {explanation && (
        <div className="explanation">
          <strong>AI Explanation:</strong>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  )
}