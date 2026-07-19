export default function ResultCard({ price }) {
  return (
    <div style={styles.card}>
      <p style={styles.label}>Estimated Price</p>
      <p style={styles.price}>₹ {price.toFixed(2)} Lakhs</p>
    </div>
  )
}

const styles = {
  card: {
    marginTop: '1.5rem', background: '#1a1a2e', color: '#fff',
    borderRadius: '12px', padding: '1.5rem 2.5rem', textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
  },
  label: { margin: 0, fontSize: '0.9rem', color: '#aaa', marginBottom: '0.4rem' },
  price: { margin: 0, fontSize: '2rem', fontWeight: 700, color: '#f0c040' }
}
