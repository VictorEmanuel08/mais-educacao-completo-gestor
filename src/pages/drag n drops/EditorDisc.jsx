import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import logo from "../../assets/logo.png";
import { app } from "../../api/app";
import { useParams } from "react-router-dom";

export function Editordisc() {
  const { id } = useParams();

  const [disc, setDisc] = useState([]);

  useEffect(() => {
    app
      .get(`/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/${id}`)
      .then((response) => {
        setDisc(response.data["aulas_final"]);
        // console.log(response.data["aulas_final"]);
      });
  }, []);

  // console.log(disc);

  const totais = []
  const cont = []
  const nomes = []

  // for(let i=0; i < disc.length; i++){
  disc.map((aula) => {
    // console.log(aula.id)
    totais.push(aula.id);
    cont.push(aula.thumb);
    nomes.push(aula.title);
  });
  // console.log(totais)
  // console.log(nomes)
  // }

  const itemsUsados = [{ id: totais, content: cont, assunto: nomes }];

  console.log(itemsUsados);

  const itemsAnother = [
    { id: uuid(), content: "Thumbnail", assunto: "Divisão e fração" },
    { id: uuid(), content: "Thumbnail", assunto: "Adição" },
    { id: uuid(), content: "Thumbnail", assunto: "Revisão primeiro sem..." },
    { id: uuid(), content: "Thumbnail", assunto: "Multiplicação" },
  ];

  const columnsFromBackend = {
    1: {
      title: "aulas",
      name: "Vídeo Aulas",
      items: itemsUsados,
    },
    2: {
      title: "disciplina",
      name: "Matemática > 1 ano",
      items: [],
    },
    // 3: {
    //   title: "atividades",
    //   name: "Atividades cadastradas",
    //   items: itemsAnother,
    // },
  };

  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
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

        <div className="flex h-fit bg-dark-purple leading-none pt-[40px]">
          <DragDropContext
            onDragEnd={(result) => (
              console.log(result),
              onDragEnd(result, columns, setColumns),
              console.log(
                `Id do item arrastado: ${result.draggableId} \nId da coluna final: ${result.destination.droppableId}`
              )
            )}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  className={`flex flex-col
                ${columnId == 1 ? "pl-4" : "0"}
                ${
                  columnId == 2
                    ? "bg-[#ffffff] w-full h-full flex mt-[-40px] border-x-[41px] border-y-[20px] border-[#EDF2FF] "
                    : "0"
                }
                }`}
                  key={columnId}
                >
                  <h2
                    className={`font-[sans-serif] text-[#FFFFFF] 
                ${columnId == 1 ? "pr-4" : "0"}
                ${columnId == 2 ? "text-dark-purple p-8" : "0"}
                  `}
                  >
                    {column.title == "aulas" ? `${column.name}` : ""}
                    {column.title == "disciplina" ? `${column.name}` : ""}
                  </h2>

                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`w-60 ${
                              columnId == 2
                                ? "ml-4 w-11/12 border-dashed border-2 border-[#4263EB] rounded-lg ?"
                                : "0"
                            }
                            `}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`select-none flex justify-center items-center flex-col mb-[18px] w-[213px] h-[123px] rounded-lg bg-[#369AFF] active:bg-[#263B4A] ${
                                          column.title == "disciplina" ? (
                                            <div>oi</div>
                                          ) : (
                                            ""
                                          )
                                        }
                                        `}
                                      >
                                        <p className="text-white pb-[10px] mt-[40px]">
                                          {/* {item.content} */}
                                          {/* <img src={item.thumb} /> */}
                                          {column.title == "aulas"
                                            ? `${item.assunto}`
                                            : ""}
                                          {column.title == "disciplina"
                                            ? `${item.assunto}`
                                            : ""}
                                          {column.title == "atividades"
                                            ? `${item.assunto}`
                                            : ""}
                                        </p>
                                        {/* <img src={item.thumb} alt={'Thumb'} /> */}
                                        <div className="flex items-center w-[213px] h-[35px] bg-[#FFFFFF] mt-[15px] rounded-b-lg">
                                          <p className="text-[#4263EB] text-[15px] p-[10px]">
                                            {item.assunto}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>

        {/* {disc.map((aula) => {
          return (
            <div key={aula.id}>
              {aula.title}
              
            </div>
            
          );
        })} */}
      </main>
    </div>
  );
}

// export default Editordisc;
