function SkeletonCard() {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '28px',
      marginBottom: '20px',
      boxShadow: '0 4px 24px rgba(108,71,255,0.10)',
      borderLeft: '5px solid #ede9ff',
    }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .skeleton {
          background: linear-gradient(90deg, #f0eeff 25%, #e4e0f7 50%, #f0eeff 75%);
          background-size: 600px 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 6px;
        }
      `}</style>

      <div className="skeleton" style={{ height: '24px', width: '60%', marginBottom: '12px' }} />
      <div className="skeleton" style={{ height: '14px', width: '30%', marginBottom: '16px' }} />
      <div className="skeleton" style={{ height: '14px', width: '100%', marginBottom: '8px' }} />
      <div className="skeleton" style={{ height: '14px', width: '80%', marginBottom: '20px' }} />
      <div style={{ display: 'flex', gap: '8px' }}>
        <div className="skeleton" style={{ height: '36px', width: '80px' }} />
        <div className="skeleton" style={{ height: '36px', width: '80px' }} />
        <div className="skeleton" style={{ height: '36px', width: '80px' }} />
      </div>
    </div>
  )
}

export default SkeletonCard