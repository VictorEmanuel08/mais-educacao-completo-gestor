import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import Disciplinas from "./pages/Disciplinas";
import Dados from "./pages/Dados";
import { Editordisc } from "./pages/drag n drops/EditorDisc";
import { NewEditDisc } from "./pages/drag n drops/NewEditDisc";
import { ItemNewEdit } from "./pages/drag n drops/items/ItemNewEdit";
import { DragDrop } from "./pages/drag n drops/DragDrop";
import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";

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
                <Disciplinas />
              </Private>
            }
          />

          <Route
            path="/editar-disciplinas/:id"
            element={
              <Private>
                <Editordisc />
              </Private>
            }
          />
          <Route
            path="/new-editar-disciplinas/:id"
            element={
              <Private>
                <NewEditDisc />
              </Private>
            }
          />
          <Route
            path="/dragdrop/:id"
            element={
              <Private>
                <DragDrop />
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
