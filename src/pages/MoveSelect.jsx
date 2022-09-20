import React, { useState, useEffect } from "react";
import { app } from "../api/app";
import { useParams } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

export function MoveSelect() {
  const { id } = useParams();

  const [disc, setDisc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await app.get(
        `/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/${id}`
      );
      setDisc(response.data["aulas_final"]);
    };
    fetchData();
  }, []);

  const itemsFromBackend2 = disc;
  // console.log(itemsFromBackend2);

  const columnsFromBackend = {
    1: {
      title: "aulas",
      name: "Vídeo Aulas",
      items: itemsFromBackend2,
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

  console.log(columnsFromBackend[1].items);

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
    <div>
      {/* {teste.map((aula) => {
        return ( */}
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
                                        {column.title == "aulas" ? (
                                          <p>{item.id}</p>
                                        ) : (
                                          // <img src={item.thumb} />
                                          ""
                                        )}
                                        {column.title == "disciplina" ? (
                                          <p>{item.title}</p>
                                        ) : (
                                          // <img src={item.thumb} />
                                          ""
                                        )}
                                      </p>
                                      <div className="flex items-center w-[213px] h-[35px] bg-[#FFFFFF] mt-[15px] rounded-b-lg">
                                        <p className="text-[#4263EB] text-[15px] p-[10px]">
                                          {item.id}
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
      {/* );
      })} */}
    </div>
  );
}
