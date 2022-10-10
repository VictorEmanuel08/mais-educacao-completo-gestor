import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../api/app";
import { AuthContext } from "../context/auth";

export function ContentDisciplinasConteudo() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [disc, setDisc] = useState();

  useEffect(() => {
    app.get(`/escolas/users/professores/${user}/series`).then((response) => {
        // console.log(response.data.series);
      setDisc(response.data.series);
    });
    // console.log(disc);
  }, []);

{disc.map((teste)=>{
    console.log(teste.disciplinas)
})}

  return (
    <div>
      {/* {series.disciplinas.map((Disciplina) => {
        return ( */}
      <div className="w-[60rem] h-screen flex flex-col bg-white rounded-lg shadow-md shaow-[#333] ml-12">
        <div className="w-full bg-gradient-to-r from-[#3B5BDB] to-[#BAC8FD] rounded-t-lg">
          <div className="flex flex-row py-5 px-5 justify-between relative">
            <p className="text-[#FFFFFF] text-[20px] font-rubik">Matemática</p>
            <div className="flex flex-row absolute bottom-0 left-36 font-roboto text-[14px] ">
              <button className="bg-[#BAC8FD] rounded-t-lg px-8 hover:bg-[#FFFFFF] ">
                <p className="text-[#4263EB]">Aulas</p>
              </button>
              <button className="bg-[#BAC8FD] rounded-t-lg px-8 hover:bg-[#FFFFFF] ">
                <p className="text-[#4263EB]">Atividades</p>
              </button>
              <button className="bg-[#BAC8FD] rounded-t-lg px-8 hover:bg-[#FFFFFF] ">
                <p className="text-[#4263EB]">Materiais</p>
              </button>
            </div>
            <button className="bg-[#4263EB] rounded-lg px-4">
              <p className="text-[18px] text-[#ffffff] font-poppins">
                Editar Conteudo
              </p>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-center py-8 border-dashed border-b-2 border-[#4263EB] text-[18px] font-rubik">
            <p className="text-[#707070] mr-4 ">Nenhum conteúdo cadastrado</p>
            <a
              className="bg-[#4263EB] rounded-lg px-4 ml-4"
              //   href={`/editar-disciplina-conteudo/${Disciplina.id}`}
            >
              <p className="text-[#ffffff]">Editar Conteudo</p>
            </a>
          </div>
          <div></div>
        </div>
      </div>
      {/* );
      })} */}
    </div>
  );
}
