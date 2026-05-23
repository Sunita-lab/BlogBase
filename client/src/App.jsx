import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogList from './pages/BlogList'
import BlogForm from './pages/BlogForm'
import BlogDetail from './pages/BlogDetail'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/edit/:id" element={<BlogForm />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  )
}



export default App