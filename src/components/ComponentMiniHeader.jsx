import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../api/app";

export function ComponentMiniHeader() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [disc, setDisc] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/disciplinas/${id}`);
      setDisc(response.data.disciplina);
    };
    getData();
  }, []);

  function EditarConteudo() {
    navigate(`/editar-disciplina-conteudo/${disc.id}`);
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#3B5BDB] to-[#BAC8FD] rounded-t-lg">
      <div className="flex flex-row py-5 px-5 justify-between relative">
        <p className="text-[#FFFFFF] text-[20px] font-rubik">{disc.name}</p>
        <div className="flex flex-row absolute bottom-0 left-36 font-roboto text-[14px] ">
          <button className="rounded-t-lg px-8 bg-[#FFFFFF] ">
            <p className="text-[#4263EB]">Aulas</p>
          </button>
          <button className="bg-[#BAC8FD] rounded-t-lg px-8 hover:bg-[#FFFFFF] ">
            <p className="text-[#4263EB]">Atividades</p>
          </button>
          <button className="bg-[#BAC8FD] rounded-t-lg px-8 hover:bg-[#FFFFFF] ">
            <p className="text-[#4263EB]">Materiais</p>
          </button>
        </div>
      </div>
    </div>
  );
}
