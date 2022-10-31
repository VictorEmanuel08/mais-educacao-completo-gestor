import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import logo from "../../assets/logo.png";
import { app } from "../../api/app";
import { useParams } from "react-router-dom";
import { Calendario } from "../../components/Calendario";
import { ItemNewEdit } from "./items/ItemNewEdit";
import { ComponentMiniHeader } from "../../components/ComponentMiniHeader";
import MenuIcon from "@mui/icons-material/Menu";

import EyesCloked from "../../assets/hidden.png";
import EyesOpen from "../../assets/view.png";

export function EditAula2() {
  const [aula, setAula] = useState([]);
  const [ready, setReady] = useState(true);
  const [text, setText] = useState();
  const [clicked, setClicked] = useState(true);
  const [clicked2, setClicked2] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(
        "/escolas/users/professores/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
      );
      setAula(response.data);
    };
    getData();
  }, []);

  function switchEyes() {
    setClicked(!clicked);
  }
  function switchEyesGlobal(e) {
    e.preventDefault();
    setClicked2(!clicked2);
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      setReady(true);
    }
  }, []);

  async function AddAula() {
    try {
      await app.post("/conteudos", {
        name: text,
        id_disciplina: "0edbbd06-e902-4714-a18e-ddd4dc82ddeb",
        id_bimestre: "1cc1aee8-7cf6-48f1-9f9d-24434704ba9b",
        created_by: "a8b56ba5-8dbb-4d51-ba74-e0c4f717081f",
        array_conteudos: listaAulas,
        // array_atividades: listaAtividades,
        // array_materiais: listaMateriais,
        // type: ["aula", "atividade", "aula"],
      });
      document.location.reload(true);
      alert("Conteudo cadastrado!");
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    }
  }

  const listaAulas = [];

  const [addItemArray, setAddItemArray] = useState([]);
  // const listaAtividades = [];
  // const listaMateriais = [];

  const AulasToConteudo = (id, type) => {
    const Valores = { id, type };
    setAddItemArray([...addItemArray, Valores]);
    // console.log(addItemArray);
  };

  console.log(addItemArray);

  const ConteudoToAulas = (id) => {
    const Valores = { id };
    setAddItemArray(addItemArray.filter((index) => index.id !== Valores.id));
    // console.log(addItemArray);
  };

  // ###########################
  // function AulasToConteudo(id, type) {
  //   listaAulas.push({ id, type });
  // }

  // function AtividadesToConteudo(id) {
  //   listaAulas.push({ id: id, type: "atividade" });
  // }

  // function MateriaisToConteudo(id) {
  //   listaAulas.push({ id: id, type: "material" });
  // }

  // function ConteudoToAulas(id, type) {
  //   listaAulas.pop({ id, type });
  // }

  // function ConteudoToAtividades(id) {
  //   listaAulas.pop({ id: id, type: "atividade" });
  // }

  // function ConteudoToMateriais(id) {
  //   listaAulas.pop({ id: id, type: "material" });
  // }

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = aula;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );

    // Coluna 0: Aulas
    // Coluna 1: Conteudo = junção de tudo
    // Coluna 2: Atividades
    // Coluna 3: Materiais

    if (re.source.droppableId == 0 && re.destination.droppableId == 1) {
      AulasToConteudo(dragItem.id, "aula");
    } else if (re.source.droppableId == 2 && re.destination.droppableId == 1) {
      AulasToConteudo(dragItem.id, "atividade");
    } else if (re.source.droppableId == 3 && re.destination.droppableId == 1) {
      AulasToConteudo(dragItem.id, "material");
    } else if (re.source.droppableId == 1 && re.destination.droppableId == 0) {
      ConteudoToAulas(dragItem.id, "aula");
    } else if (re.source.droppableId == 1 && re.destination.droppableId == 2) {
      ConteudoToAulas(dragItem.id, "atividade");
    } else if (re.source.droppableId == 1 && re.destination.droppableId == 3) {
      ConteudoToAulas(dragItem.id, "material");
    } else {
    }
  };

  return (
    <div className="flex flex-col w-full h-full text-2xl bg-dark-theme">
      <div className="w-full h-16 bg-dark-purple relative">
        <div className="p-4">
          <a href="/home">
            <img
              src={logo}
              alt="logo maisEducaÃ§ÃĢo"
              className={`cursor-pointer duration-500 w-40`}
            />
          </a>
        </div>
        <div className="absolute top-5 right-5 text-white ">
          <ul className="flex">
            <li className="pr-2">
              <IoMdPerson />
            </li>
            <li className="pr-2">
              <MdOutlineNotifications />
            </li>
            <li className="pr-2">
              <IoMdExit />
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-row">
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex relative w-full h-ful">
              {aula.map((board, bIndex) => {
                return (
                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`
                          ${
                            board.name == "aulas"
                              ? "bg-dark-purple p-3 w-[300px] h-full select-none"
                              : "0"
                          }
                          ${
                            board.name == "conteudos"
                              ? `h-full w-[60rem] mt-6 flex flex-col bg-white rounded-lg shadow-md shaow-[#333] ml-20 scrollbar-thin scrollbar-thumb-[#EDF2FF]-700 scrollbar-track-[#EDF2FF]-300 overflow-y-scroll`
                              : "0"
                          }

                          ${
                            board.name == "atividades"
                              ? `absolute top-0 right-0 w-[350px] h-1/2 bg-dark-purple`
                              : "0"
                          }
                          ${
                            board.name == "materiais"
                              ? `absolute bottom-0 right-0 w-[350px] h-1/2 bg-dark-purple`
                              : "0"
                          }
                          
                          `}
                        >
                          <div className="flex ">
                            <div className="text-[22px] text-[#FFFFFF] font-roboto mb-4 ">
                              <p>
                                {board.name == "aulas" ? `Vídeo Aulas` : ""}
                                {board.name == "atividades" ? `Atividades` : ""}
                                {board.name == "materiais" ? `Materiais` : ""}
                              </p>
                            </div>

                            {board.name === "conteudos" ? (
                              <div className="w-full relative">
                                <div>
                                  <ComponentMiniHeader />
                                  <div className="w-[180px] flex justify-between items-center flex-row absolute top-5 right-5">
                                    <button className="py-[2px] px-[15px] text-[14px] bg-[#FFFFFF] rounded-md">
                                      Cancelar
                                    </button>
                                    <button
                                      className="text-white text-[14px] py-[2px] px-[15px] bg-[#3B5BDB] rounded-md"
                                      type="submit"
                                      onClick={() => AddAula()}
                                    >
                                      Salvar
                                    </button>
                                  </div>
                                </div>
                                <div className="flex flex-col p-8 w-full ">
                                  <div className="flex flex-row justify-between">
                                    <input
                                      placeholder="Título do conteúdo"
                                      className="bg-[#EDF2FF] rounded-lg border-none text-[16px] text-[#131313] font-roboto mb-4 p-1 pl-4 w-1/3 outline-none placeholder:text-[14px] font-light"
                                      type="texte"
                                      onChange={(e) => setText(e.target.value)}
                                    />
                                    {clicked2 ? (
                                      <button
                                        className="w-[25px] h-[25px]"
                                        onClick={switchEyesGlobal}
                                      >
                                        <img
                                          className="w-[25px] h-[25px]"
                                          src={EyesOpen}
                                          alt=""
                                        />
                                      </button>
                                    ) : (
                                      <button
                                        onClick={switchEyesGlobal}
                                        className="w-[25px] h-[25px]"
                                      >
                                        <img
                                          className="w-[25px] h-[25px]"
                                          src={EyesCloked}
                                          alt=""
                                        />
                                      </button>
                                    )}
                                  </div>
                                  {board.items.length == 0 && (
                                    <div className="bg-[#EDF2FF] h-[150px] rounded-lg mb-4 p-1 pl-4 flex items-center justify-center">
                                      <p className="text-center text-[#707070] text-[18px] font-roboto">
                                        Nenhuma aula cadastrada
                                      </p>
                                    </div>
                                  )}

                                  {board.name == "conteudos"
                                    ? board.items.length > 0 &&
                                      board.items.map((item, iIndex) => {
                                        return (
                                          <div className="bg-[#EDF2FF] rounded-lg p-4">
                                            <div className="flex flex-row items-center">
                                              <div className="w-1/3 flex items-center">
                                                <ItemNewEdit
                                                  key={item.id}
                                                  data={item}
                                                  index={iIndex}
                                                />
                                              </div>
                                              <div>
                                                <p className="text-[#343434] text-[16px] font-semibold">
                                                  {item.title}
                                                </p>
                                              </div>
                                              <div>
                                                {clicked ? (
                                                  <button
                                                    className="w-[25px] h-[25px] ml-4"
                                                    onClick={() => switchEyes()}
                                                  >
                                                    <img
                                                      src={EyesOpen}
                                                      alt=""
                                                      className="w-[25px] h-[25px]"
                                                    />
                                                  </button>
                                                ) : (
                                                  <button
                                                    className="w-[25px] h-[25px] ml-4"
                                                    onClick={() => switchEyes()}
                                                  >
                                                    <img
                                                      className="w-[25px] h-[25px]"
                                                      src={EyesCloked}
                                                      alt=""
                                                    />
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })
                                    : ""}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          {board.name == "aulas"
                            ? board.items.length > 0 &&
                              board.items.map((item, iIndex) => {
                                return (
                                  <div className="flex items-center">
                                    <MenuIcon className="text-[#FFFFFF] active:text-[#263B4A] opacity-1 mb-8" />
                                    <ItemNewEdit
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                    />
                                  </div>
                                );
                              })
                            : ""}

                          {board.name == "atividades"
                            ? board.items.length > 0 &&
                              board.items.map((item, iIndex) => {
                                return (
                                  <div className="flex items-center">
                                    {/* <MenuIcon className="text-[#FFFFFF] active:text-[#263B4A] opacity-1 mb-8" /> */}
                                    <ItemNewEdit
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                    />
                                    <p className="text-[#343434] text-[16px] font-semibold">
                                      {item.title}
                                    </p>
                                  </div>
                                );
                              })
                            : ""}

                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
      {/* <Calendario /> */}
    </div>
  );
}
