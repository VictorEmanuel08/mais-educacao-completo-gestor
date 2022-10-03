import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import Disciplinas from "./pages/Disciplinas";
import Dados from "./pages/Dados";
import { ItemNewEdit } from "./pages/drag n drops/items/ItemNewEdit";
import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";
import { EditDisc } from "./pages/drag n drops/EditDisc";
import { BackupEditorDisc } from "./pages/drag n drops/BackupEditorDisc";

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
            path="/editar-disciplinas-backup/:id"
            element={
              <Private>
                <BackupEditorDisc />
              </Private>
            }
          />
          <Route
            path="/editar-disciplinas/:id"
            element={
              <Private>
                <EditDisc />
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
