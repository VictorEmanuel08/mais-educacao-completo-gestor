import React, { useState, useEffect } from "react";
import { app } from "../api/app";
import { useParams } from "react-router-dom";
import MultiselectTwoSides from "react-multiselect-two-sides";
import "./teste.scss";

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

    const [state, setState] = useState({
      options: disc,

      value: [],
    });




  //   const options = oi

  // const { options, value } = state;

  //   const handleChange = (value) => {
  //     setState({ value });
  //   };

  //   options.push(disc);
  // console.log(state)
  // console.log(options[1])
  // const teste = options.length;
  //   const teste = options[1];
  // console.log(options[1])
  // console.log('teste',teste.length)
  //   const selectedCount = value.length;
  //   const availableCount = options.length - selectedCount;

  //   return (
  //     <MultiselectTwoSides
  //       {...state}
  //       className="msts_theme_example"
  //       onChange={handleChange}
  //       availableHeader="Available"
  //       availableFooter={`Available: ${availableCount}`}
  //       selectedHeader="Selected"
  //       selectedFooter={`Selected: ${selectedCount}`}
  //       labelKey="name"
  //       showControls
  //       searchable
  //     />
    // );
  return (
    <div>
      {disc.map((aula) => {
        return (
          <div>
            <div>{aula.id}</div>
            <img src={aula.thumb} />
          </div>
        );
      })}
    </div>
  );
}
