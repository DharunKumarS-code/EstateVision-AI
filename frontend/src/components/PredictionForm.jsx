import { useState, useEffect } from 'react'
import { getLocations, predictPrice } from '../services/api'
import ResultCard from './ResultCard'

export default function PredictionForm() {
  const [locations, setLocations] = useState([])
  const [form, setForm] = useState({ location: '', sqft: '', bhk: 1, bath: 1, balcony: 0 })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getLocations()
      .then(res => setLocations(res.data.locations))
      .catch(() => setError('Failed to load locations'))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const res = await predictPrice({
        location: form.location,
        sqft: parseFloat(form.sqft),
        bhk: parseInt(form.bhk),
        bath: parseInt(form.bath),
        balcony: parseInt(form.balcony)
      })
      setResult(res.data.estimated_price)
    } catch {
      setError('Prediction failed. Please check your inputs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Predict House Price</h2>

        <label style={styles.label}>Location</label>
        <select name="location" value={form.location} onChange={handleChange} required style={styles.input}>
          <option value="">Select location</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>

        <label style={styles.label}>Total Sqft</label>
        <input type="number" name="sqft" value={form.sqft} onChange={handleChange}
          placeholder="e.g. 1200" min="100" required style={styles.input} />

        <div style={styles.row}>
          <div style={styles.col}>
            <label style={styles.label}>BHK</label>
            <select name="bhk" value={form.bhk} onChange={handleChange} style={styles.input}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Bathrooms</label>
            <select name="bath" value={form.bath} onChange={handleChange} style={styles.input}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div style={styles.col}>
            <label style={styles.label}>Balconies</label>
            <select name="balcony" value={form.balcony} onChange={handleChange} style={styles.input}>
              {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.btn}>
          {loading ? 'Predicting...' : 'Predict Price'}
        </button>
      </form>

      {result !== null && <ResultCard price={result} />}
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' },
  form: {
    background: '#fff', borderRadius: '12px', padding: '2rem',
    width: '100%', maxWidth: '520px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  title: { marginBottom: '1.5rem', color: '#1a1a2e', textAlign: 'center' },
  label: { display: 'block', marginBottom: '4px', fontWeight: 600, color: '#333', fontSize: '0.9rem' },
  input: {
    width: '100%', padding: '0.6rem 0.8rem', marginBottom: '1rem',
    border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box'
  },
  row: { display: 'flex', gap: '1rem' },
  col: { flex: 1 },
  btn: {
    width: '100%', padding: '0.75rem', background: '#1a1a2e', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem'
  },
  error: { color: '#e53e3e', fontSize: '0.9rem', marginBottom: '0.5rem' }
}
