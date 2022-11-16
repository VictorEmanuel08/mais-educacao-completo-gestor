import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { app } from "../../api/app";
import { ItemAulaEdit } from "./items/ItemAulaEdit";
import { ItemAtivEdit } from "./items/ItemAtivEdit";
import { ItemContEdit } from "./items/ItemContEdit";
import { ComponentMiniHeader } from "../../components/ComponentMiniHeader";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "react-modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import EyesCloked from "../../assets/hidden.png";
import EyesOpen from "../../assets/view.png";
import { Header } from "../../components/header";
import { Checkbox } from "@mui/material";
import { Modalcomponent } from "../../components/Modalcomponent";

export function EditAula() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [aula, setAula] = useState([]);
  const [bimestre, setBimestre] = useState([]);
  const [bimestreId, setBimestreId] = useState(null);
  const [ready, setReady] = useState(true);
  const [text, setText] = useState();
  const [clicked, setClicked] = useState(true);
  const [clicked2, setClicked2] = useState(true);

  const [disc, setDisc] = useState();
  const [addItemArray, setAddItemArray] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectValue, setSelectValue] = useState("Múltipla escolha"); // multipla

  const [alternativa, setAlternativa] = useState([]);
  const [alternativaId, setAlternativaId] = useState("");

  const [questao, SetQuestao] = useState([]);

  const optionTipo = [
    { id: 1, nome: "Múltipla escolha" },
    { id: 2, nome: "Subjetiva" },
  ];

  const addQuestao = (e) => {
    e.preventDefault();

    SetQuestao([...questao, ""]);
    console.log(questao);
  };

  const addAlternativa = (e) => {
    e.preventDefault();

    setAlternativa([...alternativa, ""]);
  };

  const handleChangeAlternativa = (e, index) => {
    alternativa[index] = e.target.value;
    setAlternativa([...alternativa]);
    console.log(alternativa);
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/bimestres/`);
      setBimestre(response.data["bimestres"]);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(
        `/escolas/users/professores/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/${id}`
      );
      setAula(response.data);
    };
    getData();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/disciplinas/${id}`);
      setDisc(response.data.disciplina.name);
    };
    getData();
  }, [id]);

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

  const handleBimestre = function (e) {
    const getCondensaId = e.target.value;
    setBimestreId(getCondensaId);
  };
  // console.log(bimestreId);

  async function AddAula() {
    try {
      await app.post("/conteudos", {
        name: text,
        id_disciplina: id,
        created_by: user,
        array_conteudos: addItemArray,
        id_bimestre: bimestreId,
        status: true,
      });
      document.location.reload(true);
      alert("Conteudo cadastrado!");
    } catch {
      alert("Ocorreu um erro. Tente novamente.");
    }
  }

  const AulasToConteudo = (id, type) => {
    const Valores = { id, type };
    setAddItemArray([...addItemArray, Valores]);
  };
  // console.log(addItemArray);

  const ConteudoToAulas = (id) => {
    const Valores = { id };
    setAddItemArray(addItemArray.filter((index) => index.id !== Valores.id));
  };

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
    <div className="flex flex-col w-full h-full text-2xl bg-dark-theme relative">
      <Header />

      <div className="flex flex-row">
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex relative w-full">
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
                              ? "bg-dark-purple w-[300px] h-screen select-none scrollbar-thin "
                              : "0"
                          }
                          ${
                            board.name == "conteudos"
                              ? `h-[40rem] w-[60rem] mt-6 flex flex-col bg-white rounded-lg shadow-md shaow-[#333] ml-20 scrollbar-thin `
                              : "0"
                          }

                          ${
                            board.name == "atividades"
                              ? `absolute top-0 right-0 w-[350px] h-1/2 bg-dark-purple`
                              : "0"
                          }
                          ${
                            board.name == "materiais"
                              ? `absolute bottom-0 right-0 w-[350px] h-1/2 bg-dark-purple `
                              : "0"
                          }

                          `}
                        >
                          <div className="flex justify-center">
                            <div className="text-[22px] text-[#FFFFFF] font-roboto mb-4">
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

                                    <div className=" rounded-lg w-[200px] mb-5 flex justify-center text-zinc-700">
                                      <select
                                        name=""
                                        id=""
                                        className="text-[14px] w-[200px] border-none outline-none"
                                        onClick={handleBimestre}
                                      >
                                        <option className="text-[12px]">
                                          Selecione o Bimestre
                                        </option>
                                        {bimestre.map((bim) => {
                                          return (
                                            <option key={bim.id} value={bim.id}>
                                              {bim.number}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
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
                                                <ItemContEdit
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

                          {board.name == "atividades" ? (
                            <div className="flex justify-center text-dark-purple">
                              <Modalcomponent />
                            </div>
                          ) : (
                            ""
                          )}

                          {board.name == "aulas"
                            ? board.items.length > 0 &&
                              board.items.map((item, iIndex) => {
                                return (
                                  <div className="flex items-center justify-center">
                                    {/* <MenuIcon className="text-[#FFFFFF] active:text-[#263B4A] opacity-1 mb-8" /> */}
                                    <ItemAulaEdit
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
                                  <div className="flex items-center justify-center">
                                    <ItemAtivEdit
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                    />
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
    </div>
  );
}
