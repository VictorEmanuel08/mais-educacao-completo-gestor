import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Disciplinas from "./pages/Disciplinas";
import { Editordisc } from "./pages/EditorDisc";
import { NewEditDisc } from "./pages/NewEditDisc";
// import { Conquistas } from './pages/Conquistas'

import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";
// import LoginPage from "./pages/LoginPage";
import { Login } from "./pages/Login";
import { MoveSelect } from "./pages/MoveSelect";
// import Todo from "./pages/Todo";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Private><Home/></Private>}/>
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/disciplinas" element={<Private><Disciplinas /></Private>} />
          <Route path="/teste/:id" element={<Private><MoveSelect /></Private>} />
          <Route path="/editar-disciplinas/:id" element={<Private><Editordisc /></Private>} />
          <Route path="/new-editar-disciplinas/:id" element={<Private><NewEditDisc /></Private>} />
          {/* <Route path="/teste" element={<Todo />} /> */}
          
          {/* <Route path="/conquistas" element={<Conquistas />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
