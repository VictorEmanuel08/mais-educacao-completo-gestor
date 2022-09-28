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

  const [disc, setDisc] = useState([]);

  useEffect(() => {
    app
      .get(`/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/${id}`)
      .then((response) => {
        setDisc(response.data["aulas_final"]);
      });
  }, []);

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

        <div className="p-10">
          <div className="flex justify-between">
            <div className="flex items-center">
              {/* <div className="flex h-fit bg-dark-purple leading-none pt-[40px]">
                <h4 className="font-[sans-serif] text-[#FFFFFF]">
                  Vídeo Aulas
                </h4>
              </div> */}
            </div>
          </div>

          {/* Board columns */}
          <div className="grid grid-cols-4 gap-5 my-5">
            <div className="bg-dark-purple p-3">
              <h4 className="flex justify-between items-center">
                <span className="text-2xl text-[#FFFFFF]">Video Aulas</span>
              </h4>
              <div className="p-3">
                <div className="flex h-fit bg-dark-purple leading-none pt-[40px]">
                  <ItemNewEdit />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
