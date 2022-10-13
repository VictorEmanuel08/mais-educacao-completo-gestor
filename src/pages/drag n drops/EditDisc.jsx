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

export function EditDisc() {
  const { id } = useParams();

  const [aula, setAula] = useState([]);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(
        "/escolas/users/professores/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
      );
      setAula(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      setReady(true);
    }
  }, []);

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
    console.log(re.destination);
  };

  return (
    <div className="flex w-full h-screen font-sans bg-dark-theme ">
      <main className="text-2xl font-semibold flex-1 bg-dark-theme gap-6 ">
        <div className="w-full h-16 bg-dark-purple relative">
          <div className="p-4">
            <img
              src={logo}
              alt="logo maisEducaÃ§ÃĢo"
              className={`cursor-pointer duration-500 w-40`}
            />
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
        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-row">
            {ready && (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-row">
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
                            board.name == "aulas_conteudo"
                              ? `mt-6 w-[60rem] h-screen flex flex-col bg-white rounded-lg shadow-md shaow-[#333] ml-12`
                              : "0"
                          }`}
                            >
                              <div className="flex justify-between items-center">
                                <div className="text-[18px] text-[#FFFFFF] font-roboto mt-4 mb-4 ">
                                  <p>
                                    {board.name == "aulas" ? `Vídeo Aulas` : ""}
                                  </p>
                                </div>
                                {board.name == "aulas_conteudo" ? (
                                  <div className="flex flex-row relative">
                                    <ComponentMiniHeader />
                                    <button
                                      className="absolute right-20 top-5 bg-[#4263EB] rounded-lg px-4"
                                      // onClick={EditarConteudo}
                                    >
                                      <p className="text-[18px] text-[#ffffff] font-poppins">
                                        Editar Conteudo
                                      </p>
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>

                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <ItemNewEdit
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                    />
                                  );
                                })}
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
          <Calendario />
        </div>
      </main>
    </div>
  );
}
