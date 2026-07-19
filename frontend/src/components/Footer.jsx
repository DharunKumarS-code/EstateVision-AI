export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} EstateVision — Bengaluru House Price Predictor</p>
    </footer>
  )
}

const styles = {
  footer: { textAlign: 'center', padding: '1.2rem', background: '#1a1a2e', color: '#aaa', marginTop: 'auto' },
  text: { margin: 0, fontSize: '0.85rem' }
}
