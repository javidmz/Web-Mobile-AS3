import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cards from './pages/Cards'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/cards/:id' element={<Cards />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  )
}

export default App
