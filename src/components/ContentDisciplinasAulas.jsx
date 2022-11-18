import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../api/app";
import { AuthContext } from "../context/auth";
import { ComponentMiniHeader } from "./ComponentMiniHeader";

export function ContentDisciplinasAulas() {
  const { idSerie, idDisc } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [disc, setDisc] = useState("");

  const [nameHook, setNameHook] = useState("Aulas");

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/disciplinas/${idDisc}`);
      setDisc(response.data.disciplina);
    };
    getData();
  }, []);
  console.log(disc);

  function EditarConteudo() {
    navigate(`/editar-disciplinas-${nameHook}/${idSerie}/${disc.id}`);
  }

  function HandleVerificar(nameHook) {
    if (nameHook == "Aulas") {
      return (
        <p className="text-[#707070] font-rubik mr-4 ">
          {" "}
          Nenhuma aula cadastrada
        </p>
      );
    } else if (nameHook == "Atividades") {
      return (
        <p className="text-[#707070] font-rubik mr-4 ">
          {" "}
          Nenhuma atividade cadastrada
        </p>
      );
    } else {
      return (
        <p className="text-[#707070] font-rubik mr-4 ">
          {" "}
          Nenhum material cadastrado
        </p>
      );
    }
  }

  return (
    <div className="w-full">
      <div className="w-[60rem] h-screen flex flex-col bg-white rounded-lg shadow-md shaow-[#333] ml-12">
        <div className="flex flex-row relative">
          <ComponentMiniHeader
            nameHook={nameHook}
            setNameHook={setNameHook}
            rotaId={disc.id}
          />
          <button
            className="absolute right-10 top-5 bg-[#4263EB] rounded-lg px-4"
            onClick={() => EditarConteudo()}
          >
            <p className="text-[16px] text-[#ffffff] font-semibold">
              Editar Conteudo
            </p>
          </button>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-center py-8 border-dashed border-b-2 border-[#4263EB] text-[16px]">
            {HandleVerificar(nameHook)}
            <button
              className="bg-[#4263EB] rounded-lg px-4 ml-4"
              onClick={EditarConteudo}
            >
              <p className="text-[#ffffff] font-semibold">
                Criar um novo conteúdo
              </p>
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
