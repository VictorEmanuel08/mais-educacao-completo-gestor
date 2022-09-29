import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import logo from "../../assets/logo.png";
import { app } from "../../api/app";
import { useParams } from "react-router-dom";
import { ItemNewEdit } from "./items/ItemNewEdit";

export function NewEditDisc() {
  const { id } = useParams();

  const [aula, setAula] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(
        "/escolas/users/professores/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
      );
      setAula(response.data);
    };
    getData();
    // app
    //   .get(
    //     "/escolas/users/professores/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
    //   )
    //   .then((response) => {
    //     setAula(response.data["aulas"].items);
    //     console.log(aula)
    //   });
  }, []);

  // console.log(aula)

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

        <div className="grid grid-cols-3 gap-0">
          {Object.entries(aula).map((board, index) => {
            console.log(board[1].items);
            return (
              <div key={index} className="bg-dark-purple p-3 w-[300px]">
                <h4 className="flex justify-between items-center">
                  <span className="text-2xl text-[#FFFFFF] mt-4 mb-2 ">
                    <p>{board[1].name}</p>
                    {/* {board[1].items.map((conteudos) => {
                      // console.log(conteudos);
                      return (
                        <div key={conteudos.id}>
                          <a>
                            <img src={conteudos.thumb} />
                          </a>
                        </div>
                      );
                    })} */}
                  </span>
                </h4>

                {board[1].items.lenght > 0 &&
                  board[1].items.map((item, iIndex) => {
                    return (
                      <div>
                        {" "}
                        <ItemNewEdit key={iIndex} data={item} /> asasass{" "}
                      </div>
                    );
                  })}

                {/* <div className="p-3"><ItemNewEdit /></div> */}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
