import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/blogs')
      setBlogs(res.data)
    } catch (err) {
      console.error('Blogs fetch nahi hue:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete karna chahti ho?')) return
    try {
      await api.delete(`/blogs/${id}`)
      fetchBlogs() // list refresh karo
    } catch (err) {
      console.error('Delete nahi hua:', err)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>BlogBase</h1>
        <button onClick={() => navigate('/create')}>+ Naya Blog</button>
      </div>

      {blogs.length === 0 ? (
        <p>Koi blog nahi hai abhi.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
            <h2>{blog.title}</h2>
            <p style={{ color: '#666', margin: '8px 0' }}>By {blog.author}</p>
            <p>{blog.content.substring(0, 100)}...</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <button onClick={() => navigate(`/blog/${blog._id}`)}>View</button>
              <button onClick={() => navigate(`/edit/${blog._id}`)}>Edit</button>
              <button onClick={() => handleDelete(blog._id)} style={{ color: 'red' }}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default BlogList