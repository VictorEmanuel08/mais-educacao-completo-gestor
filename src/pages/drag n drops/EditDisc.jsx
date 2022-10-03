import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import logo from "../../assets/logo.png";
import { app } from "../../api/app";
import { useParams } from "react-router-dom";
import { ItemNewEdit } from "./items/ItemNewEdit";

export function EditDisc() {
  const { id } = useParams();

  const [aula, setAula] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(
        "/escolas/users/professores/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
      );
      setAula(response.data);
    };
    getData();
  }, []);

  const [boardData, setBoardData] = useState(aula);

  // useEffect(() => {
  //   if (process.browser) {
  //     setReady(true);
  //   }
  // }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
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
    setBoardData(newBoardData);
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

        {/* {ready && ( */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-3 gap-0">
            {Object.entries(aula).map((board, bIndex) => {
            {/* {boardData.map((board, bIndex) => { */}
              return (
                <div key={board.name}>
                  <Droppable droppableId={bIndex.toString()}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="bg-dark-purple p-3 w-[300px] h-full select-none"
                      >
                        <h4 className="flex justify-between items-center">
                          <span className="text-2xl text-[#FFFFFF] mt-4 mb-2 ">
                            <p>{board[1].name}</p>
                          </span>
                        </h4>

                        { 
                        board[1].items.length > 0 &&
                        board[1].items.map((item, iIndex) => {
                          return (
                            <ItemNewEdit key={item.id} data={item} index={iIndex}/>
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
      </main>
    </div>
  );
}
