import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
// import logo from "../../assets/logo.png";
import { app } from "../../../api/app";
import { useParams } from "react-router-dom";

export function ItemNewEdit() {
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
    <div className="p-3">
      {disc.map((aula) => {
        return (
          <div
            key={aula.id}
            className="select-none flex justify-center items-center flex-col mb-[18px] w-[213px] h-[123px] rounded-lg bg-[#369AFF] active:bg-[#263B4A]"
          >
            <a className="pb-[10px] mt-[40px]">
              <img src={aula.thumb} />
              <div className="flex items-center w-full h-full bg-[#FFFFFF] mt-[15px] rounded-b-lg">
                <p className="text-[#4263EB] text-[15px] p-[10px]">
                  {aula.title}
                </p>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}
