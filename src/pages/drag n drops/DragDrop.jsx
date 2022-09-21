import React, { useState, useEffect } from "react";
import { app } from "../../api/app";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdNewLabel, MdOutlineNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export function DragDrop() {
  //   const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();

  const [disc, setDisc] = useState([]);

  useEffect(() => {
    app
      .get(`/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/${id}`)
      .then((response) => {
        setDisc(response.data["aulas_final"]);
      });
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToHome = () => {
    navigate("/home");
  };

  //   const onDragEnd = ({source, destination}) => {
  //     const newList = [...disc]
  //     const [removed] = newList.splice(source.index, 1)
  //     newList.splice(destination.index, 0, removed)

  //     const activeItem = newList.findIndex(e => e.id === discId)
  //     setActiveIndex(activeIndex)
  //     dispatchEvent(setBoards)
  //   };

  const columnsFromBackend = {
    1: {
      title: "aulas",
      name: "Vídeo Aulas",
      items: disc,
    },
    2: {
      title: "disciplina",
      name: "Matemática > 1 ano",
      items: [],
    },
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
    <div className="flex w-full min-h-screen font-sans bg-dark-theme">
      <main className="text-2xl font-semibold flex-1 bg-dark-theme gap-6">
        <div className="w-full h-16 bg-dark-purple relative">
          <div className="p-4">
            <img
              src={logo}
              alt="logo maisEducaÃ§ÃĢo"
              className={`cursor-pointer duration-500 w-[160px]`}
            />
          </div>
          <div className="absolute top-5 right-5 text-white">
            <ul className="flex">
              <li className="pr-2">
                <IoMdPerson onClick={goToHome} className="cursor-pointer" />
              </li>
              <li className="pr-2">
                <MdOutlineNotifications />
              </li>
              <li className="pr-2">
                <IoMdExit
                  onClick={logout}
                  className="cursor-pointer"
                  alt="sair"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="flex h-fit bg-dark-purple leading-none pt-[40px]">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              key={"list-board-droppable"}
              droppableId={"list-board-droppable"}
            >
              {(provided) => {
                return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {disc.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            //   selected={index === activeindex}
                            component={Link}
                            to={`/dragdrop/${item.id}`}
                            style={{
                              cursor: snapshot.isDragging
                                ? "grab"
                                : "pointer!important",
                            }}
                          >
                            <div
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <img src={item.thumb} />
                              {item.title}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </div>
      </main>
    </div>
  );
}
