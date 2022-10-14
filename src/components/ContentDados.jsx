import ApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { app } from "../api/app";

function ContentDados() {
  const [dados, setDados] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(
        "/dados/a8b56ba5-8dbb-4d51-ba74-e0c4f717081f"
      );
      setDados(response.data);
    };
    getData();
  }, []);

  const [idItemSerie, setIdItemSerie] = useState(-1);
  const [idItemTurma, setIdItemTurma] = useState(-1);
  const [idItemAluno, setIdItemAluno] = useState(-1);
  const [idItemItem, setIdItemItem] = useState(-1);

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

    setIdItemItem(opAluno);
  };

  const optionsArea = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const seriesArea = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  return (
    <div className="flex flex-col ml-12 w-full">
      <div>
        <div className="w-full flex flex-col p-6 pt-4 bg-white rounded-lg shadow-md shaow-[#333] pr-10">
          <p className="text-[#4263EB] font-semibold">Dados</p>
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
                    <option key={"turma" + i} value={i}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col p-6 pt-6 bg-white rounded-lg shadow-md shaow-[#333] mt-4">
          <div className="px-10 mt-10">
            <p className="text-[#02C4B2] text-[45px] font-semibold ">
              UEB Primavera
            </p>
            <p className="text-[#748FFC] text-[25px] font-semibold mt-2 pb-8 border-b border-[#4263EB]">
              Física - 3 ano
            </p>
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

            <div className="flex flex-col w-1/3">
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
              <p className="text-[#748FFC] mt-8 text-[100px] font-bold">5.1</p>
            </div>
          </div>

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
                series={seriesArea}
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
                series={seriesArea}
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
                    <div className="bg-[#BECEE0] text-dark-purple font-normal w-full text-[18px] flex justify-center items-center">
                      3A
                    </div>
                    <div className="bg-[#748FFC] text-white font-normal w-full text-[18px] flex justify-center items-center">
                      3A
                    </div>
                    <div className="bg-[#BECEE0] text-dark-purple font-normal w-full text-[18px] flex justify-center items-center">
                      3A
                    </div>
                    <div className="bg-[#748FFC] text-white font-normal w-full text-[18px] flex justify-center items-center">
                      3A
                    </div>
                    <div className="bg-[#BECEE0] text-dark-purple font-normal w-full text-[18px] flex justify-center items-center">
                      3A
                    </div>
                    <div className="bg-[#748FFC] text-white font-normal w-full text-[18px] flex justify-center items-center">
                      3A
                    </div>
                    <div className="bg-[#BECEE0] text-dark-purple font-normal w-full text-[18px] flex justify-center items-center">
                      3A
                    </div>
                    <div className="bg-[#748FFC] text-white font-normal w-full text-[18px] flex justify-center items-center">
                      3A
                    </div>
                  </div>

                  <div className="flex flex-col border-r">
                    <p className="font-normal pl-4 pr-4 text-white text-[20px]">
                      Aluno
                    </p>
                    <p className="pr-14 text-[18px] pl-4 bg-[#BECEE0] text-dark-purple font-normal text-dark-purple font-normal w-full flex justify-center items-center">
                      Nome do aluno ashuahsjahs
                    </p>
                    <p className="pr-14 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
                      Nome do aluno
                    </p>
                    <p className="pr-14 text-[18px] pl-4 bg-[#BECEE0] text-dark-purple font-normal text-dark-purple font-normal w-full flex justify-center items-center">
                      Nome do aluno
                    </p>
                    <p className="pr-14 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
                      Nome do aluno
                    </p>
                    <p className="pr-14 text-[18px] pl-4 bg-[#BECEE0] text-dark-purple font-normal text-dark-purple font-normal w-full flex justify-center items-center">
                      Nome do aluno
                    </p>
                    <p className="pr-14 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
                      Nome do aluno
                    </p>
                    <p className="pr-14 text-[18px] pl-4 bg-[#BECEE0] text-dark-purple font-normal text-dark-purple font-normal w-full flex justify-center items-center">
                      Nome do aluno
                    </p>
                    <p className="pr-14 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
                      Nome do aluno
                    </p>
                  </div>

                  <div className="flex flex-col ">
                    <p className="font-normal pl-4 pr-4 text-white text-[20px]">
                      Média
                    </p>
                    <p className="bg-[#BECEE0] text-dark-purple font-normal w-full text-[18px] flex justify-center items-center">
                      6,75
                    </p>
                    <p className="bg-[#748FFC] text-white font-normal w-full text-[18px] flex justify-center items-center">
                      6,75
                    </p>
                    <p className="bg-[#BECEE0] text-dark-purple font-normal w-full text-[18px] flex justify-center items-center">
                      6,75
                    </p>
                    <p className="bg-[#748FFC] text-white font-normal w-full text-[18px] flex justify-center items-center">
                      6,75
                    </p>
                    <p className="bg-[#BECEE0] text-dark-purple font-normal w-full text-[18px] flex justify-center items-center">
                      6,75
                    </p>
                    <p className="bg-[#748FFC] text-white font-normal w-full text-[18px] flex justify-center items-center">
                      6,75
                    </p>
                    <p className="bg-[#BECEE0] text-dark-purple font-normal w-full text-[18px] flex justify-center items-center">
                      6,75
                    </p>
                    <p className="bg-[#748FFC] text-white font-normal w-full text-[18px] flex justify-center items-center">
                      6,75
                    </p>
                  </div>
                </div>
                <div className="flex bg-dark-purple rounded-b-lg ">
                  <Stack spacing={2}>
                    <Pagination count={5} showFirstButton showLastButton />
                  </Stack>
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
                    <span>6,75</span>
                    <span>6,75</span>
                    <span>6,75</span>
                    <span>6,75</span>
                    <span>6,75</span>
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
