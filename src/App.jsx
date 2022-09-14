import { Route, BrowserRouter, Routes } from "react-router-dom";
// import Login from "./pages/Login";
import Home from "./pages/Home";
import Disciplinas from "./pages/Disciplinas";
import { Editordisc } from "./pages/EditorDisc";
// import { Conquistas } from './pages/Conquistas'

import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/" element={<Private><Home/></Private>}/> */}
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/disciplinas" element={<Disciplinas />} />
          <Route path="/editar-disciplinas/:id" element={<Editordisc />} />
          {/* <Route path="/conquistas" element={<Conquistas />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
