import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import DisciplinasFirst from "./pages/DisciplinasFirst";
import DisciplinasSecond from "./pages/DisciplinasSecond";
import Dados from "./pages/Dados";
import { ItemNewEdit } from "./pages/drag n drops/items/ItemNewEdit";
import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";
import { EditAula } from "./pages/drag n drops/EditAula";
import { EditAtiv } from "./pages/drag n drops/EditAtiv";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route
            path="/disciplinas"
            element={
              <Private>
                <DisciplinasFirst />
              </Private>
            }
          />
          <Route
            path="/editar-disciplinas/:id"
            element={
              <Private>
                <DisciplinasSecond />
              </Private>
            }
          />
          <Route
            path="/editar-disciplinas-Aulas/:id"
            element={
              <Private>
                <EditAula />
              </Private>
            }
          />
          <Route
            path="/editar-disciplinas-Atividades/:id"
            element={
              <Private>
                <EditAtiv />
              </Private>
            }
          />
          <Route
            path="/dados"
            element={
              <Private>
                <Dados />
              </Private>
            }
          />
          <Route
            path="/ItemNewEdit/:id"
            element={
              <Private>
                <ItemNewEdit />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
