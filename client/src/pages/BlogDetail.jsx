import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'

function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchBlog() }, [id])

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`)
      setBlog(res.data)
    } catch (err) {
      console.error('Fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return
    try {
      await api.delete(`/blogs/${id}`)
      navigate('/')
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  if (loading) return <div style={{ textAlign: 'center', marginTop: '80px', color: 'var(--muted)' }}>Loading...</div>
  if (!blog) return <div style={{ textAlign: 'center', marginTop: '80px', color: 'var(--muted)' }}>Blog not found.</div>

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 24px' }}>
      <button onClick={() => navigate('/')}
        style={{ background: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '28px' }}>
        ← Back to Blogs
      </button>

      <div style={{ background: 'white', borderRadius: 'var(--radius)', padding: '40px', boxShadow: 'var(--shadow)' }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            background: blog.published ? '#e6faea' : '#fff3e0',
            color: blog.published ? '#2e7d32' : '#e65100',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 600
          }}>
            {blog.published ? '● Published' : '● Draft'}
          </span>
        </div>

        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '36px', margin: '16px 0 10px', lineHeight: '1.3' }}>
          {blog.title}
        </h1>

        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>
          By <strong>{blog.author}</strong> · {new Date(blog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <hr />

        <p style={{ marginTop: '28px', lineHeight: '1.9', fontSize: '16px', color: '#333' }}>
          {blog.content}
        </p>

        {blog.tags.length > 0 && (
          <div style={{ marginTop: '28px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {blog.tags.map(tag => (
              <span key={tag} style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600
              }}>#{tag}</span>
            ))}
          </div>
        )}

        <div style={{ marginTop: '36px', display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate(`/edit/${blog._id}`)}
            style={{ background: 'var(--primary)', color: 'white', padding: '12px 24px' }}>
            Edit Blog
          </button>
          <button onClick={handleDelete}
            style={{ background: '#fff0f0', color: 'var(--accent)' }}>
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail