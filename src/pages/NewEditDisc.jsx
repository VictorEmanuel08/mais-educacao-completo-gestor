import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { app } from "../api/app";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { v4 } from "uuid";

export function NewEditDisc() {
  const { id } = useParams();

  const [disc, setDisc] = useState([]);

  useEffect(() => {
    app
      .get(`/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/${id}`)
      .then((response) => {
        setDisc(response.data["aulas_final"]);
      });
  }, []);

  // console.log(disc);

  const item = {
    id: v4(),
    thumb: "Clean the house 1",
  };

  const item2 = {
    id: v4(),
    thumb: "Clean the house 2",
  };

  const totais = []
  const cont = [];
  const nomes = [];

  // for (let i = 0; i < disc.id; i++) {
  disc.map((aula) => {
    totais.push(aula.id);
    cont.push(aula.thumb);
    nomes.push(aula.title);
  });
  // }

  const itemsUsados = { 'id': totais, 'content': cont, 'assunto': nomes };

  console.log(itemsUsados);


  const [state, setState] = useState({
    todo: {
      title: "Vídeo Aulas",
      items: [item],
    },
    progress: {
      title: "Aulas",
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    //criando uma cópia do item antes de removê-lo do estado
    const itemCopy = { ...state[source.droppableId].items[source.index] };
    setState((prev) => {
      prev = { ...prev };
      //remove o array items de previous
      prev[source.droppableId].items.splice(source.index, 1);

      //adiciona o novo array de items ao local
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  return (
    <div className="flex w-full justify-around">
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className="w-5/12 flex flex-col">
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w-full bg-[#808080] py-0.5 px-0.5 rounded-md flex flex-col"
                    >
                      {data.items.map((el, index) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mb-[10px] text-white p-[5px] border-solid border-2 border-white rounded-md hover:bg-[#123456] active:bg-[#000000]"
                                >
                                  {el.thumb}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
