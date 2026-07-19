export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>🏠 EstateVision</span>
      <span style={styles.sub}>Bengaluru House Price Predictor</span>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '1rem 2rem', background: '#1a1a2e', color: '#fff'
  },
  brand: { fontSize: '1.4rem', fontWeight: 700 },
  sub: { fontSize: '0.9rem', color: '#aaa' }
}
