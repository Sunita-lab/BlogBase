import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'

function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [id])

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`)
      setBlog(res.data)
    } catch (err) {
      console.error('Blog fetch nahi hua:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete karna chahti ho?')) return
    try {
      await api.delete(`/blogs/${id}`)
      navigate('/')
    } catch (err) {
      console.error('Delete nahi hua:', err)
    }
  }

  if (loading) return <p>Loading...</p>
  if (!blog) return <p>Blog nahi mila.</p>

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
        ← Wapas Jao
      </button>
      <div style={{ background: 'white', padding: '32px', borderRadius: '8px' }}>
        <h1>{blog.title}</h1>
        <p style={{ color: '#666', margin: '8px 0' }}>
          By {blog.author} — {new Date(blog.createdAt).toLocaleDateString('hi-IN')}
        </p>
        <p style={{ marginBottom: '16px' }}>
          {blog.published ? '🟢 Published' : '🔴 Draft'}
        </p>
        <hr />
        <p style={{ marginTop: '20px', lineHeight: '1.8' }}>{blog.content}</p>
        {blog.tags.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            {blog.tags.map(tag => (
              <span key={tag} style={{
                background: '#eee',
                padding: '4px 10px',
                borderRadius: '20px',
                marginRight: '8px',
                fontSize: '14px'
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
          <button onClick={() => navigate(`/edit/${blog._id}`)}>Edit</button>
          <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail