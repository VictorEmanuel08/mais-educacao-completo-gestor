import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import MenuIcon from "@mui/icons-material/Menu";
import { app } from "../../../api/app";
import { useParams } from "react-router-dom";

export function ItemNewEdit(data) {
  const { id } = useParams();

  const [disc, setDisc] = useState([]);

  useEffect(() => {
    app
      .get(`/aulas/series/f076177d-ea29-4695-87bb-14a0a8a29c7b/${id}`)
      .then((response) => {
        setDisc(response.data["aulas_final"]);
      });
      console.log(disc)
  }, []);

  return (
    <div className="bg-dark-purple">
      {disc.map((aula) => {
        return (
          <div
            key={aula.id}
            className="cursor-pointer flex justify-center items-center flex-col mb-[30px] w-[200px] h-[100px] rounded-lg"
          >
            <a className="flex flex-row items-center ">
              <MenuIcon className="text-[#FFFFFF] active:text-[#263B4A] opacity-1" />
              <img src={aula.thumb} />
            </a>
          </div>
        );
      })}
    </div>
  );
}
