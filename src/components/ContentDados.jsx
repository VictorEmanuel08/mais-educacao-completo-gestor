import ApexChart from "react-apexcharts";
import React, { Component } from "react";
import Select from "react-select";
import { width } from "@mui/system";

function ContentDados() {
  const options = {
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

  const series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  const optionsSelectSeries = [
    { value: "", label: "" },
    { value: "3 ano", label: "3 ano" },
    { value: "2 ano", label: "2 ano" },
    { value: "1 ano", label: "1 ano" },
  ];

  const optionsSelectDisciplina = [
    { value: "", label: "" },
    { value: "Fisica", label: "Fisica" },
    { value: "Matemática", label: "Matemática" },
    { value: "Português", label: "Português" },
  ];

  const optionsSelectTurma = [
    { value: "", label: "" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];

  const optionsSelectAluno = [
    { value: "", label: "" },
    { value: "Nário", label: "Nário" },
    { value: "João", label: "João" },
    { value: "Fylip", label: "Fylip" },
    { value: "Victor", label: "Victor" },
  ];

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color,
        backgroundColor: color,
        height: 5,
      }}
    />
  );

  return (
    <div className="flex flex-col pl-12 w-full">
      <div className="w-full flex flex-col p-6 pt-4 bg-white rounded-lg shadow-md shaow-[#333] pr-10">
        <p className="text-[#4263EB] font-semibold">Dados</p>
        <div className="w-full flex flex-row p-6 pt-2 pr-10 grid grid-cols-4 gap-4 pb-1">
          <div className="flex flex-col text-[#4263EB]">
            <p className="text-[20px] font-semibold">Série</p>
            <select
              options={optionsSelectSeries}
              className="bg-[#FFFFFF] w-4/5 text-[16px]"
            >
              {optionsSelectSeries.map((seriesSelect) => (
                <option>{seriesSelect.value}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col text-[#4263EB]">
            <p className="text-[20px] font-semibold">Disciplina</p>
            <select
              options={optionsSelectDisciplina}
              className="bg-[#FFFFFF] w-4/5 text-[16px]"
            >
              {optionsSelectDisciplina.map((disciplinasSelect) => (
                <option>{disciplinasSelect.value}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col text-[#4263EB]">
            <p className="text-[20px]">Turma</p>
            <select
              options={optionsSelectTurma}
              className="bg-[#FFFFFF] w-4/5 text-[16px]"
            >
              {optionsSelectTurma.map((turmasSelect) => (
                <option>{turmasSelect.value}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col text-[#4263EB]">
            <p className="text-[20px]">Aluno</p>
            <select
              options={optionsSelectAluno}
              className="bg-[#FFFFFF] w-4/5 text-[16px]"
            >
              {optionsSelectAluno.map((alunosSelect) => (
                <option>{alunosSelect.value}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col p-6 pt-6 bg-white rounded-lg shadow-md shaow-[#333] pr-10 mt-4">
        <div className="p-10">
          <p className="text-[#02C4B2] text-[45px] font-semibold ">
            UEB Primavera
          </p>
          <p className="text-[#748FFC] text-[25px] font-semibold mt-8 mb-4 pb-12 border-b border-[#4263EB]">
            Física - 3 ano
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 pl-16 pb-12">
          {/* <div className="flex justify-between"> */}
          <div className="flex flex-col">
            <p className="text-[#02C4B2] font-bold">Tempo na plataforma</p>
            <div className="flex flex-row text-[18px] pt-2">
              <p className="text-[#748FFC] font-semibold">Tempo em aula:</p>
              <p className="text-[#748FFC] font-bold pl-20">90 min</p>
            </div>
            <div className="flex flex-row text-[18px]">
              <p className="text-[#748FFC] font-semibold">
                Tempo em atividade:
              </p>
              <p className="text-[#748FFC] font-bold pl-9">22 min</p>
            </div>
          </div>

          <div className="flex flex-col pl-12">
            <p className="text-[#02C4B2] font-bold">Participação</p>
            <div className="flex flex-row text-[18px] pt-2 justify-between">
              <p className="text-[#748FFC] font-semibold">Aulas assistidas:</p>
              <p className="text-[#748FFC] font-bold">25</p>
            </div>
            <div className="flex flex-row text-[18px] justify-between">
              <p className="text-[#748FFC] font-semibold">
                Atividades realizadas:
              </p>
              <p className="text-[#748FFC] font-bold ">16</p>
            </div>
            <div className="flex flex-row text-[18px] justify-between">
              <p className="text-[#748FFC] font-semibold">Materiais lidos:</p>
              <p className="text-[#748FFC] font-bold">12</p>
            </div>
          </div>

          <div className="flex flex-col items-center ">
            <p className="text-[#02C4B2] font-bold">Média</p>
            <p className="text-[#748FFC] mt-8 text-[100px] font-bold">5.1</p>
          </div>
        </div>

        <div className="flex flex-col pl-16 pb-12">
          <div className="flex flex-row ">
            <p className="text-[#02C4B2] font-bold mr-4">Evolução</p>
            <a className="text-[#748FFC] font-bold mr-4">Exportar XLS</a>
            <a className="text-[#748FFC] font-bold mr-4">Exportar PDF</a>
          </div>

          <div className="flex flex-row">
            <div className="grid grid-cols-2 gap-2">
              <div>CHECKBOX</div>
              <ApexChart
                className="mt-48"
                options={options}
                series={series}
                type="area"
                height={350}
                width={700}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDados;
