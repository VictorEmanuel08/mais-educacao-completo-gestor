import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Disciplinas from './pages/Disciplinas'
import Editordisc from './pages/EditorDisc'
// import { Conquistas } from './pages/Conquistas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/disciplinas" element={<Disciplinas />} />
        <Route path="/editar-disciplinas" element={<Editordisc />} />
        {/* <Route path="/conquistas" element={<Conquistas />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
