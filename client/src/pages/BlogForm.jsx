import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'

function BlogForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    title: '', content: '', author: '', tags: '', published: false
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => { if (isEdit) fetchBlog() }, [id])

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
      console.error('Fetch failed:', err)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
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
      navigate('/blogs')
    } catch (err) {
      console.error('Save failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px' }}>
      <button onClick={() => navigate('/blogs')}
        style={{ background: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '24px' }}>
        ← Back
      </button>
      <h1 style={{ fontFamily: 'Playfair Display', fontSize: '36px', color: 'var(--primary)', marginBottom: '28px' }}>
        {isEdit ? 'Edit Blog' : 'Create New Blog'}
      </h1>

      <div style={{ background: 'white', borderRadius: 'var(--radius)', padding: '32px', boxShadow: 'var(--shadow)' }}>
        {[
          { label: 'Title', name: 'title', type: 'input', placeholder: 'Enter blog title...' },
          { label: 'Author', name: 'author', type: 'input', placeholder: 'Your name...' },
          { label: 'Tags (comma separated)', name: 'tags', type: 'input', placeholder: 'mern, react, mongodb...' },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px' }}>{field.label}</label>
            <input
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px' }}>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            placeholder="Write your blog content here..."
          />
        </div>

        <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
          />
          <label style={{ textTransform: 'none', fontSize: '15px', color: 'var(--text)' }}>
            Publish this blog
          </label>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleSubmit} disabled={loading}
            style={{ background: 'var(--primary)', color: 'white', padding: '12px 28px' }}>
            {loading ? 'Saving...' : isEdit ? 'Update Blog' : 'Create Blog'}
          </button>
          <button onClick={() => navigate('/')}
            style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogForm