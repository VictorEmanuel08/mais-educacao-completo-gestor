import { MessageChat } from "./MessageChat";
import { useContext, useEffect, useState } from "react";
import { app } from "../api/app";
import { AuthContext } from "../context/auth";

export default function PerfilData() {
  const { user } = useContext(AuthContext);

  const [nameProf, setNameProf] = useState("");
  const [matProf, setMatProf] = useState("");
  const [emailProf, setEmail] = useState("");
  const [CPFProf, setCPFProf] = useState("");
  // const [emailProf, setEmail] = useState("");

  useEffect(() => {
    app.get(`/escolas/users/professores/${user}`).then((response) => {
      // console.log(varId)
      setNameProf(response.data.professor.escola_user.name);
      setMatProf(response.data.professor.escola_user.mat);
      setEmail(response.data.professor.escola_user.email);
      setCPFProf(response.data.professor.escola_user.cpf);
      // console.log(response.data.professor);
    });
  });

  return (
    <div className=" w-full px-2">
      <div className="w-full h-52 p-6 grid grid-cols-2 gap-6 text-center py-8 pl-12">
        <div className="shadow-md rounded-md bg-dark-purple w-full py-2 pt-2">
          <h2 className="text-center text-[16px] font-semibold text-[#FFF]">
            {nameProf}
          </h2>

          <div className="bg-white h-full w-full">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <div className="flex flex-row items-center">
                  <strong className="text-[16px] font-semibold text-[#707070] px-4">
                    Matrícula:
                  </strong>
                  <p className="text-sm text-[#707070]">{matProf}</p>
                </div>

                <div className="flex flex-row items-center">
                  <strong className="text-[16px] font-semibold text-[#707070] px-4">
                    Série:
                  </strong>
                  <p className="text-sm text-[#707070]">2</p>
                </div>

                <div className="flex flex-row items-center">
                  <strong className="text-[16px] font-semibold text-[#707070] px-4">
                    CPF:
                  </strong>
                  <p className="text-sm text-[#707070]">{CPFProf}</p>
                </div>
              </div>

              <div className="flex flex-col pr-4">
                <div className="flex flex-row items-center">
                  <strong className="text-[16px] font-semibold text-[#707070] px-4">
                    E-mail:
                  </strong>
                  <p className="text-sm text-[#707070]">{emailProf}</p>
                </div>

                <div className="flex flex-row items-center">
                  <strong className="text-[16px] font-semibold text-[#707070] px-4">
                    Turmas:
                  </strong>
                  <p className="text-sm text-[#707070]">6</p>
                </div>

                <div className="flex flex-row items-center">
                  <strong className="text-[16px] font-semibold text-[#707070] px-4">
                    Disciplinas:
                  </strong>
                  <p className="text-sm text-[#707070]">3</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MessageChat />
      </div>
    </div>
  );
}
