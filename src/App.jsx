import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Cards from './Cards'
import Contact from './Contact'
import NotFound from './NotFound'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/cards' element={<Cards />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
