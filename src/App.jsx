import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import DisciplinasFirst from "./pages/DisciplinasFirst";
import DisciplinasSecond from "./pages/DisciplinasSecond";
import Dados from "./pages/Dados";
import Teste from "./teste";
import { ItemAulaEdit } from "./pages/drag n drops/items/ItemAulaEdit";
import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";
import { EditAula } from "./pages/drag n drops/EditAula";
// import { EditAula2 } from "./pages/drag n drops/EditAula";
import { Modalcomponent } from "./components/Modalcomponent";
import { NewModalcomponent } from "./components/NewModalcomponent";
import { GoogleForms } from "./components/GoogleForms/GoogleForms";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/teste" element={<Teste />} />
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
            path="/dados"
            element={
              <Private>
                <Dados />
              </Private>
            }
          />
          <Route
            path="/ItemAulaEdit/:id"
            element={
              <Private>
                <ItemAulaEdit />
              </Private>
            }
          />
          <Route
            path="/Modalcomponent"
            element={
              <Private>
                <Modalcomponent />
              </Private>
            }
          />
          <Route
            path="/NewModalcomponent"
            element={
              <Private>
                <NewModalcomponent />
              </Private>
            }
          />
          <Route
            path="/GoogleForms"
            element={
              <Private>
                <GoogleForms />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
