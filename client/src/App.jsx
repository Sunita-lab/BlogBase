import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogList from './pages/BlogList'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App