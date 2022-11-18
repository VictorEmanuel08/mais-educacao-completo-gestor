import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import DisciplinasFirst from "./pages/DisciplinasFirst";
import DisciplinasSecond from "./pages/DisciplinasSecond";
import Dados from "./pages/Dados";
import { ItemAulaEdit } from "./pages/drag n drops/items/ItemAulaEdit";
import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";
import { EditAula } from "./pages/drag n drops/EditAula";
import { ModalComponent } from "./components/ModalComponent";
import { Chats } from "./components/chat/index";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_lP-XRuonKQ2bSnTEAw_RD6kUDnNO6hg",
  authDomain: "chatram-89e1e.firebaseapp.com",
  projectId: "chatram-89e1e",
  storageBucket: "chatram-89e1e.appspot.com",
  messagingSenderId: "867113784649",
  appId: "1:867113784649:web:2dca6de296c61bc0c0f698",
  measurementId: "G-22RQXFHSEK",
};

initializeApp(firebaseConfig);

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
            path="/editar-disciplinas/:idSerie/:idDisc"
            element={
              <Private>
                <DisciplinasSecond />
              </Private>
            }
          />
          <Route
            path="/editar-disciplinas-Aulas/:idSerie/:idDisc"
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
                <ModalComponent />
              </Private>
            }
          />
          <Route
            path="Chats"
            element={
              <Private>
                <Chats />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
