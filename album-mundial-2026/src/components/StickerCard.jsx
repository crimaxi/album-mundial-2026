const STATUS_COLORS = {
  falta: { backgroundColor: '#e5e7eb', borderColor: '#6b7280' },
  tengo: { backgroundColor: '#d1fae5', borderColor: '#16a34a' },
  repetida: { backgroundColor: '#fef3c7', borderColor: '#d97706' },
}

function StickerCard({ number, name, group, status, onClick }) {
  const style = STATUS_COLORS[status] || STATUS_COLORS.falta

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...style,
        border: `2px solid ${style.borderColor}`,
        borderRadius: '12px',
        padding: '16px',
        minWidth: '180px',
        maxWidth: '220px',
        margin: '8px',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'sans-serif',
      }}
    >
      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700' }}>#{number}</p>
      <h3 style={{ margin: '8px 0', fontSize: '1rem' }}>{name}</h3>
      <p style={{ margin: 0, fontSize: '0.9rem', color: '#374151' }}>{group}</p>
      <span
        style={{
          display: 'inline-block',
          marginTop: '10px',
          fontSize: '0.8rem',
          textTransform: 'capitalize',
          fontWeight: '600',
        }}
      >
        {status}
      </span>
    </button>
  )
}

export default StickerCard
