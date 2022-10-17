import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../api/app";
import { AuthContext } from "../context/auth";
import { ComponentMiniHeader } from "./ComponentMiniHeader";

export function ContentDisciplinasConteudo() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [disc, setDisc] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/disciplinas/${id}`);
      setDisc(response.data.disciplina);
    };
    getData();
  }, []);
  console.log(disc);

  function EditarConteudo() {
    navigate(`/editar-disciplina-conteudo/${disc.id}`);
  }

  return (
    <div className="w-full">
      <div className="w-[60rem] h-screen flex flex-col bg-white rounded-lg shadow-md shaow-[#333] ml-12">
        <div className="flex flex-row relative">
          <ComponentMiniHeader />
          <button
            className="absolute right-10 top-5 bg-[#4263EB] rounded-lg px-4"
            onClick={EditarConteudo}
          >
            <p className="text-[16px] text-[#ffffff] font-semibold">
              Editar Conteudo
            </p>
          </button>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-center py-8 border-dashed border-b-2 border-[#4263EB] text-[16px]">
            <p className="text-[#707070] font-rubik mr-4 ">Nenhum conteúdo cadastrado</p>
            <button
              className="bg-[#4263EB] rounded-lg px-4 ml-4"
              onClick={EditarConteudo}
            >
              <p className="text-[#ffffff] font-semibold">Criar um novo conteúdo</p>
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
