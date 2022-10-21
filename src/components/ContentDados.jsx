import ApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { app } from "../api/app";

function ContentDados() {
  const [dados, setDados] = useState("");
  const [dadosNotas, setDadosNotas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const newValue = [];
      const response = await app.get(
        "/dados/a8b56ba5-8dbb-4d51-ba74-e0c4f717081f"
      );

      // for (let i = 0; i < response.data.length; i++) {
      //   if (response.data[0].series[0].turmas[i].alunos[i].Media.lenght > 0) {
      //     newValue.push({
      //       name: response.data[0].series[0].turmas[i].alunos[i].Media[i]
      //         .bimestre.number,
      //       data: response.data[0].series[0].turmas[i].alunos[i].Media[i].value,
      //     });
      //   }else{
      //     newValue.push({
      //       name: 0,
      //       data: 0,
      //     });
      //   }
      // }
      // console.log(response.data.length);
      // console.log(response.data[0].series[0].turmas[0]);

      setDadosNotas(newValue);

      setDados(response.data);
    };
    getData();
  }, []);

  const [idItemSerie, setIdItemSerie] = useState(-1);
  const [idItemTurma, setIdItemTurma] = useState(-1);
  const [idItemAluno, setIdItemAluno] = useState(-1);
  const [idItemNota, setIdItemNota] = useState(-1);
  const [idItemMedia, setIdItemMedia] = useState(-1);

  const [nota1, setNota1] = useState("");
  const [nota2, setNota2] = useState("");
  const [nota3, setNota3] = useState("");
  const [nota4, setNota4] = useState("");

  const handleCarregarDisc = function (e) {
    const opDisc = e.target.value;

    setIdItemSerie(opDisc);
  };

  const handleCarregarSerie = function (e) {
    const opSerie = e.target.value;

    setIdItemTurma(opSerie);
  };

  const handleCarregarTurma = function (e) {
    const opTurma = e.target.value;

    setIdItemAluno(opTurma);
  };

  const handleCarregarAluno = function (e) {
    const opAluno = e.target.value;

    setIdItemNota(opAluno);
  };

  const handleCarregarNota = function (e) {
    const opNota = e.target.value;

    setIdItemMedia(opNota);
  };

  // function handleReturnOCaralhoDaNota(e) {
  //   e.preventDefault();
  //   idItemNota > -1 &&
  //     dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
  //       idItemNota
  //     ].Media.map((item, index) => {
  //       return (
  //         <div>{item.bimestre.number == 2 ? setNota1(item.value) : ""};</div>
  //       );
  //     });
  //   console.log(nota1);
  // }

  const optionsArea = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["1º Bimestre"],
    },
  };

  // const seriesArea = [
  //   {
  //     name: "series1",
  //     data: [5, 10, 2, 8],
  //   },
  //   {
  //     name: "series2",
  //     data: [],
  //   },
  // ];

  return (
    <div className="flex flex-col ml-12 w-4/5">
      <div>
        <div className="w-full flex flex-col p-6 pt-4 bg-white rounded-lg shadow-md shaow-[#333] pr-10">
          <div className="w-full flex flex-row p-6 pt-2 pr-10 grid grid-cols-4 gap-4 pb-1">
            <div className="flex flex-col text-[#4263EB]">
              <p className="text-[20px] font-semibold">Disciplina</p>
              <select
                className="bg-[#FFFFFF] w-4/5 text-[16px]"
                onClick={handleCarregarDisc}
                name="disciplina"
              >
                <option value={-1}> Selecione uma disciplina:</option>

                {Object.entries(dados).map((item, i) => {
                  return (
                    <option key={"disciplina" + i} value={i}>
                      {item[1].name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col text-[#4263EB]">
              <p className="text-[20px] font-semibold">Série</p>
              <select
                className="bg-[#FFFFFF] w-4/5 text-[16px]"
                onClick={handleCarregarSerie}
                name="serie"
              >
                <option value={-1}> Selecione uma série:</option>
                {idItemSerie > -1 &&
                  dados[idItemSerie].series.map((item, i) => (
                    <option key={"serie" + i} value={i}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col text-[#4263EB]">
              <p className="text-[20px]">Turma</p>
              <select
                className="bg-[#FFFFFF] w-4/5 text-[16px]"
                onClick={handleCarregarTurma}
                name="turma"
              >
                <option value={-1}> Selecione uma turma:</option>
                {idItemTurma > -1 &&
                  dados[idItemSerie].series[idItemTurma].turmas.map(
                    (item, i) => (
                      <option key={"turma" + i} value={i}>
                        {item.name}
                      </option>
                    )
                  )}
              </select>
            </div>

            <div className="flex flex-col text-[#4263EB]">
              <p className="text-[20px]">Aluno</p>
              <select
                className="bg-[#FFFFFF] w-4/5 text-[16px]"
                onClick={handleCarregarAluno}
                name="aluno"
              >
                <option value={-1}> Selecione um aluno:</option>

                {idItemAluno > -1 &&
                  dados[idItemSerie].series[idItemTurma].turmas[
                    idItemAluno
                  ].alunos.map((item, i) => (
                    <option key={"aluno" + i} value={i}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col p-6 pt-6 bg-white rounded-lg shadow-md shaow-[#333] mt-4">
          <div className="flex flex-row justify-between pb-8 border-b border-[#4263EB] px-10 mt-10">
            <div className="">
              <p className="text-[#02C4B2] text-[45px] font-semibold ">
                UEB Primavera
              </p>
              <p className="text-[#748FFC] text-[25px] font-semibold mt-2">
                Física - 3 ano
              </p>
            </div>

            <div>
              <div className="flex flex-row items-center text-dark-purple hover:scale-110 duration-300">
                <PictureAsPdfIcon />
                <p className="text-[16px] font-normal">Exportar PDF</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between mt-10 mb-12 px-16">
            <div className="flex flex-col w-1/3">
              <p className="text-[#02C4B2] text-[20px] font-bold">
                Tempo na plataforma
              </p>
              <div className="flex flex-row justify-between text-[16px] pt-2 mr-16">
                <p className="text-[#748FFC] font-semibold">Tempo em aula:</p>
                <p className="text-[#748FFC] font-bold">90 min</p>
              </div>
              <div className="flex flex-row justify-between  text-[16px] pt-2 mr-16">
                <p className="text-[#748FFC] font-semibold">
                  Tempo em atividade:
                </p>
                <p className="text-[#748FFC] font-bold ">22 min</p>
              </div>
            </div>

            <div className="flex flex-col w-1/3 pl-4">
              <p className="text-[#02C4B2] text-[20px] font-bold">
                Participação
              </p>
              <div className="flex flex-row justify-between text-[16px] pt-2 mr-16">
                <p className="text-[#748FFC] font-semibold">
                  Aulas assistidas:
                </p>
                <p className="text-[#748FFC] font-bold">25</p>
              </div>
              <div className="flex flex-row justify-between text-[16px] pt-2 mr-16">
                <p className="text-[#748FFC] font-semibold">
                  Atividades realizadas:
                </p>
                <p className="text-[#748FFC] font-bold ">16</p>
              </div>
              <div className="flex flex-row justify-between text-[16px] pt-2 mr-16">
                <p className="text-[#748FFC] font-semibold">Materiais lidos:</p>
                <p className="text-[#748FFC] font-bold">12</p>
              </div>
            </div>

            <div className="flex flex-col w-1/3 items-center">
              <p className="text-[#02C4B2] text-[20px] font-bold">Média</p>

              {idItemNota > -1 &&
              dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
                idItemNota
              ].Media != 0 ? (
                dados[idItemSerie].series[idItemTurma].turmas[
                  idItemAluno
                ].alunos[idItemNota].Media.map((item, index) => {
                  return (
                    <div>
                      {item.bimestre.number == 2 ? (
                        <p className="text-[#748FFC] mt-8 text-[100px] font-bold">
                          {item.value}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center">
                  <p className="text-[#748FFC] mt-8 text-[20px] font-bold">
                    Sem nota cadastrada.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* {item.bimestre.number == 1 ? setNota1(item.value) : ""}
          {console.log(nota1)} */}

          <div className="flex flex-col px-16 pb-12">
            <div className="flex flex-row justify-between">
              <p className="text-[#02C4B2] text-[20px] font-bold mr-4">
                Evolução
              </p>
              <div className="flex flex-row ">
                <a
                  className="flex flex-row items-center text-dark-purple mr-4 hover:scale-110 duration-300"
                  href="/"
                >
                  <DownloadIcon />
                  <p className="text-[16px] font-normal">Exportar XLS</p>
                </a>
                <a
                  className="flex flex-row items-center text-dark-purple hover:scale-110 duration-300"
                  href="/"
                >
                  <PictureAsPdfIcon />
                  <p className="text-[16px] font-normal">Exportar PDF</p>
                </a>
              </div>
            </div>

            <div className="flex flex-row mt-8 justify-between">
              <div className="flex flex-col ">
                <div className="flex flex-row">
                  <label className="cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-2 rounded-lg border-dark-purple"
                    />
                    <span className="text-[18px] font-semibold text-dark-purple pl-4 hover:text-[#02C4B2] active:text-[#02C4B2]">
                      Média
                    </span>
                  </label>
                </div>
                <div className="flex flex-row">
                  <label className="cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-2 rounded-lg border-dark-purple"
                    />
                    <span className="text-[18px] font-semibold text-dark-purple pl-4">
                      Notas
                    </span>
                  </label>
                </div>
              </div>

              <ApexChart
                className=""
                options={optionsArea}
                series={
                  dadosNotas
                  //   [
                  //   {
                  //     name: "series1",
                  //     data: [5, 10, 2, 8],
                  //   },
                  //   {
                  //     name: "series2",
                  //     data: [],
                  //   },
                  // ]
                }
                type="area"
                height={300}
                width={700}
              />
            </div>

            <div className="flex flex-row mt-8 justify-between ">
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <label className="cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-2 rounded-lg border-dark-purple"
                    />
                    <span className="text-[18px] font-semibold text-dark-purple pl-4">
                      Atividades
                    </span>
                  </label>
                </div>
                <div className="flex flex-row">
                  <label className="cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-2 rounded-lg border-dark-purple"
                    />
                    <span className="text-[18px] font-semibold text-dark-purple pl-4">
                      Aulas Assistidas
                    </span>
                  </label>
                </div>
              </div>
              <ApexChart
                className=""
                options={optionsArea}
                series={[
                  {
                    name: "series1",
                    data: [5, 10, 2, 8],
                  },
                  {
                    name: "series2",
                    data: [],
                  },
                ]}
                type="area"
                height={250}
                width={700}
              />
            </div>
          </div>

          <div className="flex flex-col px-16 pb-12">
            <div className="flex flex-row justify-between">
              <p className="text-[#02C4B2] text-[20px] font-bold mr-4">
                Média por intervalo
              </p>
              <div className="flex flex-row mr-4">
                <a
                  className="flex flex-row items-center text-dark-purple mr-4 hover:scale-110 duration-300"
                  href="/"
                >
                  <DownloadIcon />
                  <p className="text-[16px] font-normal">Exportar XLS</p>
                </a>
                <a
                  className="flex flex-row items-center text-dark-purple hover:scale-110 duration-300"
                  href="/"
                >
                  <PictureAsPdfIcon />
                  <p className="text-[16px] font-normal">Exportar PDF</p>
                </a>
              </div>
            </div>

            <div className="flex flex-row justify-between mt-8">
              <div className="flex flex-col">
                <div className="flex bg-dark-purple rounded-lg">
                  <div className="flex flex-col items-center border-r">
                    <p className="font-normal px-2 text-white text-[20px]">
                      Turma
                    </p>
                    {/* <div className="bg-[#BECEE0] text-dark-purple font-normal w-full text-[18px] flex justify-center items-center">
                      3A
                    </div> */}
                    {idItemAluno > -1 &&
                      dados[idItemSerie].series[idItemTurma].turmas.map(
                        (item, index) =>
                          idItemAluno == index && (
                            <div className="bg-[#748FFC] h-full flex items-center px-5">
                              <p className=" text-[18px] text-white font-normal w-full ">
                                {item.name}
                              </p>
                            </div>
                          )
                      )}
                  </div>

                  <div className="flex flex-col border-r">
                    <p className="font-normal pl-4 pr-4 text-white text-[20px]">
                      Aluno
                    </p>
                    {/* <p className="pr-14 text-[18px] pl-4 bg-[#BECEE0] text-dark-purple font-normal text-dark-purple font-normal w-full flex justify-center items-center">
                      Nome do aluno
                    </p> */}
                    {idItemAluno > -1 &&
                      dados[idItemSerie].series[idItemTurma].turmas[
                        idItemAluno
                      ].alunos.map((item, i) => (
                        <p className="pr-4 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
                          {item.name}
                        </p>
                      ))}
                  </div>

                  <div className="flex flex-col">
                    <p className="font-normal pl-4 pr-4 text-white text-[20px]">
                      Média
                    </p>
                    {/* <p className="bg-[#BECEE0] text-dark-purple font-normal w-full text-[18px] flex justify-center items-center">
                      6,75
                    </p> */}

                    {/* {idItemAluno > -1 &&
                      dados[idItemSerie].series[idItemTurma].turmas[
                        idItemAluno
                      ].alunos.map((item, i) => (
                        <p className="pr-4 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
                          {item.name}
                        </p>
                      ))} */}

                    {idItemNota > -1 &&
                    dados[idItemSerie].series[idItemTurma].turmas[idItemAluno]
                      .alunos[idItemNota].Media != 0 ? (
                      dados[idItemSerie].series[idItemTurma].turmas[
                        idItemAluno
                      ].alunos[idItemNota].Media.map((item, index) => {
                        return (
                          <p>
                            {item.bimestre.number == 1 ? (
                              <p className="pr-4 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
                                {item.value}
                              </p>
                            ) : (
                              ""
                            )}
                          </p>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center">
                        <p className="pr-4 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
                          Sem nota cadastrada.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <ApexChart
                  className="flex items-center justify-center"
                  series={[15, 20, 45, 41, 12]}
                  options={{
                    labels: ["0-2", "2-4", "4-6", "6-8", "8-10"],
                    plotOptions: {
                      pie: {
                        donut: {
                          labels: {
                            show: true,
                            fontsize: 30,
                            color: "#f90000",
                          },
                        },
                      },
                    },

                    dataLabels: {
                      enabled: false,
                    },
                  }}
                  type="donut"
                  height={280}
                  width={300}
                />

                <div className="grid grid-cols-2 gap-12 text-dark-purple font-semibold text-[18px]">
                  <div className="flex flex-col justify-between items-center">
                    <p>Média</p>
                    <span>8-10</span>
                    <span>6-8</span>
                    <span>4-6</span>
                    <span>2-4</span>
                    <span>0-2</span>
                  </div>
                  <div className="flex flex-col justify-between items-center">
                    <p>Alunos</p>
                    <span>6</span>
                    <span>10</span>
                    <span>11</span>
                    <span>2</span>
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDados;
