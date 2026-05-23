import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'

function BlogForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    published: false
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      fetchBlog()
    }
  }, [id])

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`)
      const blog = res.data
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        tags: blog.tags.join(', '),
        published: blog.published
      })
    } catch (err) {
      console.error('Blog fetch nahi hua:', err)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      }
      if (isEdit) {
        await api.put(`/blogs/${id}`, payload)
      } else {
        await api.post('/blogs', payload)
      }
      navigate('/')
    } catch (err) {
      console.error('Save nahi hua:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h1>{isEdit ? 'Blog Edit Karo' : 'Naya Blog Banao'}</h1>
      <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginTop: '20px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label>Title</label><br />
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Author</label><br />
          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Content</label><br />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>Tags (comma se alag karo)</label><br />
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="mern, mongodb, react"
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              style={{ marginRight: '8px' }}
            />
            Published
          </label>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Karo' : 'Create Karo'}
          </button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default BlogForm