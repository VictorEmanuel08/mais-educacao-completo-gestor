import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../api/app";
import { AuthContext } from "../context/auth";

export function ContentDisciplinas() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // const [disc, setDisc] = useState([]);
  const [series, setSeries] = useState([]);

  // useEffect(() => {
  //   app.get(`/disciplinas`).then((data) => {
  //     setDisc(data.data.disciplinas);
  //   });
  // }, []);

  useEffect(() => {
    app.get(`/escolas/users/professores/${user}/series`).then((response) => {
      console.log(response.data.series);
      setSeries(response.data.series);
    });
  }, []);

  return (
    <div>
      <div className="w-full px-5 ml-3">
        <div className="w-[60rem] flex flex-col p-6 pt-6 bg-white rounded-lg shadow-md shaow-[#333] pr-10">
          <div className="flex justify-between flex-col">
            <h1 className="text-[#4263EB] text-[20px] text-left">
              Disciplinas
            </h1>
            {series.map((serie) => {
              return (
                <div key={serie.serie.id}>
                  <h2 className="text-[#4263EB] text-[20px] text-left ml-6 p-3 mb-[-20px]">
                    {serie.serie.name}
                  </h2>

                  <div>
                    <div className="grid grid-cols-3 ml-12 ">
                      {serie.disciplinas.map((Disciplina) => {
                        return (
                          <div
                            key={Disciplina.id}
                            className="flex justify-center mr-1 mt-4 items-center scale-100 ease-in duration-200 hover:scale-110"
                          >
                            <a href={`/editar-disciplinas/${Disciplina.id}`}>
                              <img
                                src={Disciplina.bk_img}
                                alt={Disciplina.name}
                                className="w-64 h-36 rounded-lg"
                              />
                              <p className="flex items-center mt-[-4px] justify-center text-[#585858] text-[18px] ">
                                {Disciplina.name}
                              </p>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
