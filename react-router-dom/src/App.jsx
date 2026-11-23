import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import Filmes from './pages/Filmes'
import Series from './pages/Series'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">

        <header className="flex items-center justify-between p-6">
          <h1 className="text-3xl font-bold text-red-600">
            CineFlix
          </h1>

          <nav className="flex gap-6">
            <Link to="/" className="hover:text-red-500">Início</Link>
            <Link to="/filmes" className="hover:text-red-500">Filmes</Link>
            <Link to="/series" className="hover:text-red-500">Séries</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<Filmes />} />
          <Route path="/series" element={<Series />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App