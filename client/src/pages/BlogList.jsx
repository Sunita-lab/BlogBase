import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import SkeletonCard from '../components/SkeletonCard'

function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { fetchBlogs() }, [])

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/blogs')
      setBlogs(res.data)
    } catch (err) {
      console.error('Blogs fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return
    try {
      await api.delete(`/blogs/${id}`)
      fetchBlogs()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  if (loading) return (
  <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px' }}>
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
)

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display', fontSize: '40px', color: 'var(--primary)' }}>
            BlogBase
          </h1>
          <p style={{ color: 'var(--muted)', marginTop: '4px' }}>{blogs.length} blog{blogs.length !== 1 ? 's' : ''} total</p>
        </div>
        <button
          onClick={() => navigate('/create')}
          style={{ background: 'var(--primary)', color: 'white', fontSize: '15px', padding: '12px 24px' }}
        >
          + New Blog
        </button>
      </div>

      {/* Blog Cards */}
      {blogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
          <p style={{ fontSize: '48px' }}>✍️</p>
          <p style={{ marginTop: '16px', fontSize: '18px' }}>No blogs yet. Create your first one!</p>
        </div>
      ) : (
        blogs.map((blog, i) => (
          <div key={blog._id} style={{
            background: 'var(--card)',
            borderRadius: 'var(--radius)',
            padding: '28px',
            marginBottom: '20px',
            boxShadow: 'var(--shadow)',
            borderLeft: `5px solid ${['var(--primary)', 'var(--accent)', 'var(--accent2)', 'var(--success)'][i % 4]}`,
            transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontFamily: 'Playfair Display', fontSize: '22px', marginBottom: '6px' }}>
                  {blog.title}
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '12px' }}>
                  By {blog.author} · {new Date(blog.createdAt).toLocaleDateString('en-IN')}
                  <span style={{
                    marginLeft: '10px',
                    background: blog.published ? '#e6faea' : '#fff3e0',
                    color: blog.published ? '#2e7d32' : '#e65100',
                    padding: '2px 10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </p>
                <p style={{ color: '#555', lineHeight: '1.6' }}>
                  {blog.content.substring(0, 120)}...
                </p>
                {blog.tags.length > 0 && (
                  <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {blog.tags.map(tag => (
                      <span key={tag} style={{
                        background: 'var(--primary-light)',
                        color: 'var(--primary)',
                        padding: '3px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 600
                      }}>#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button onClick={() => navigate(`/blog/${blog._id}`)}
                style={{ background: 'var(--primary)', color: 'white' }}>
                View
              </button>
              <button onClick={() => navigate(`/edit/${blog._id}`)}
                style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(blog._id)}
                style={{ background: '#fff0f0', color: 'var(--accent)' }}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default BlogList