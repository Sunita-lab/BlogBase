import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/blogs')
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #6c47ff 0%, #ff6b6b 100%)',
      animation: 'fadeIn 0.6s ease'
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Logo */}
      <div style={{
        fontSize: '72px',
        animation: 'pulse 2s ease infinite',
        marginBottom: '16px'
      }}>
        ✍️
      </div>

      {/* Brand Name */}
      <h1 style={{
        fontFamily: 'Playfair Display',
        fontSize: '52px',
        color: 'white',
        letterSpacing: '-1px',
        animation: 'slideUp 0.8s ease 0.2s both'
      }}>
        BlogBase
      </h1>

      {/* Tagline */}
      <p style={{
        color: 'rgba(255,255,255,0.8)',
        fontSize: '16px',
        marginTop: '10px',
        animation: 'slideUp 0.8s ease 0.4s both'
      }}>
        Your personal blog manager
      </p>

      {/* Loader */}
      <div style={{
        marginTop: '48px',
        width: '36px',
        height: '36px',
        border: '3px solid rgba(255,255,255,0.3)',
        borderTop: '3px solid white',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
    </div>
  )
}

export default Splash