import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { IoMdPerson, IoMdExit } from "react-icons/io";
import { MdOutlineNotifications } from "react-icons/md";
import logo from "../assets/logo.png";
import { app } from "../api/app";
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

  console.log("oi",disc[0])
  // const itemsDisc = [{ id: disc.data["aulas_final"][title] }];
  
  const itemsFromBackend2 = disc
  

  const itemsFromBackend = [
    {
			"id": "02feecf3-57c4-4e36-87b3-4482f19e129a",
			"created_at": "2022-08-31T14:12:40.859Z",
			"updated_at": "2022-09-05T13:55:43.025Z",
			"hash": "596271s1jwq4348",
			"title": "O tempo, formas de registro da História e prod. de conhecimento histórico",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/596271s1jwq4348/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/596271s1jwq4348/cover/cover1.jpg",
			"time": "00:09:41.648",
			"id_conteudo": "cfd833b9-5dd4-464a-9b5a-955b59e4b68a",
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		},
		{
			"id": "0bd8c75c-dd65-4a94-bddf-250f03a1c295",
			"created_at": "2022-08-31T14:12:40.935Z",
			"updated_at": "2022-09-05T13:55:53.560Z",
			"hash": "yub221cvb1eq3d1",
			"title": "O Mediterrâneo como espaço de inter. entre Europa, África e Oriente Médio",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/yub221cvb1eq3d1/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/yub221cvb1eq3d1/cover/cover1.jpg",
			"time": "00:06:57.684",
			"id_conteudo": "cfd833b9-5dd4-464a-9b5a-955b59e4b68a",
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		},
		{
			"id": "179e0422-901a-49de-9c0c-4e58625a807d",
			"created_at": "2022-08-31T14:12:40.954Z",
			"updated_at": "2022-09-05T13:51:21.031Z",
			"hash": "4158d5ftk101vrs",
			"title": "O papel da religião cristã, dos mosteiros e da cultura da Idade Média",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/4158d5ftk101vrs/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/4158d5ftk101vrs/cover/cover1.jpg",
			"time": "00:09:22.829",
			"id_conteudo": null,
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		},
		{
			"id": "1ed5839c-59f2-4a48-952d-b0b722e1d723",
			"created_at": "2022-08-31T14:12:40.924Z",
			"updated_at": "2022-09-05T13:51:20.983Z",
			"hash": "k1oueue151622l3",
			"title": "A pass do mundo antigo para o medieval e a frag. política do ocidente euro",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/k1oueue151622l3/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/k1oueue151622l3/cover/cover1.jpg",
			"time": "00:08:22.236",
			"id_conteudo": null,
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		},
		{
			"id": "2519eb86-9c23-4cae-92f3-4f01a1bbf0f4",
			"created_at": "2022-08-31T14:12:40.903Z",
			"updated_at": "2022-09-05T13:51:20.962Z",
			"hash": "9zw1w0r9ma9w4v4",
			"title": "Formação política na Grécia Antiga e o conceito de cidadania",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/9zw1w0r9ma9w4v4/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/9zw1w0r9ma9w4v4/cover/cover1.jpg",
			"time": "00:08:48.462",
			"id_conteudo": null,
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		},
		{
			"id": "28e28c85-44ad-4b38-8407-296c37a7717d",
			"created_at": "2022-08-31T14:12:40.873Z",
			"updated_at": "2022-09-05T13:51:20.923Z",
			"hash": "52zi2k2r26l1q2d",
			"title": "As origens da humanidade, seus deslocamentos e processos de sedentarização",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/52zi2k2r26l1q2d/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/52zi2k2r26l1q2d/cover/cover1.jpg",
			"time": "00:11:27.854",
			"id_conteudo": null,
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		},
		{
			"id": "331fc4ee-58f9-4b57-8f74-f79efbfe85f7",
			"created_at": "2022-08-31T14:12:40.894Z",
			"updated_at": "2022-09-05T13:51:20.948Z",
			"hash": "556pyoe51qo066g",
			"title": "O Ocidente clássico_ aspectos da Cultura da Grécia e de Roma",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/556pyoe51qo066g/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/556pyoe51qo066g/cover/cover1.jpg",
			"time": "00:09:33.974",
			"id_conteudo": null,
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		},
		{
			"id": "951ccb29-c115-43e1-9018-5bf15133b57f",
			"created_at": "2022-08-31T14:12:40.914Z",
			"updated_at": "2022-09-05T13:51:20.972Z",
			"hash": "yl4pfni6rm21010",
			"title": "Formação política na Roma Antiga e o conceito de império",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/yl4pfni6rm21010/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/yl4pfni6rm21010/cover/cover1.jpg",
			"time": "00:07:40.494",
			"id_conteudo": null,
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		},
		{
			"id": "af38d8e1-0de4-4d2c-b047-97790c8c7268",
			"created_at": "2022-08-31T14:12:40.944Z",
			"updated_at": "2022-09-05T13:51:21.003Z",
			"hash": "1x2yazl8671qnaz",
			"title": "Escravos e servos no mundo antigo e medieval",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/1x2yazl8671qnaz/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/1x2yazl8671qnaz/cover/cover1.jpg",
			"time": "00:08:55.469",
			"id_conteudo": null,
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		},
		{
			"id": "bceca956-ae00-4ac5-b05f-394251691232",
			"created_at": "2022-08-31T14:12:40.883Z",
			"updated_at": "2022-09-05T13:51:20.935Z",
			"hash": "qa5648q5m2sozgy",
			"title": "Povos da Antiguidade nas Américas, na África e no Oriente Médio",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/qa5648q5m2sozgy/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/qa5648q5m2sozgy/cover/cover1.jpg",
			"time": "00:08:25.772",
			"id_conteudo": null,
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		},
		{
			"id": "dd227988-a100-4380-91a0-83ae59790756",
			"created_at": "2022-08-31T14:12:40.961Z",
			"updated_at": "2022-09-05T13:51:21.041Z",
			"hash": "5c00k2gq26j2001",
			"title": "O papel da mulher na Grécia, Roma e Europa medieval",
			"file": "https://cdn.jmvstream.com/vod/vod_11696/f/5c00k2gq26j2001/h/4/playlist.m3u8",
			"rating": null,
			"thumb": "https://cdn.jmvstream.com/vod/vod_11696/f/5c00k2gq26j2001/cover/cover1.jpg",
			"time": "00:09:39.179",
			"id_conteudo": null,
			"id_serie": "f076177d-ea29-4695-87bb-14a0a8a29c7b",
			"id_disciplina": "0edbbd06-e902-4714-a18e-ddd4dc82ddeb"
		}
  ]

  console.log(disc==itemsFromBackend2)

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
          <div className="absolute top-8 right-5 text-white ">
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
                                          {column.title == "aulas"
                                            ? `${item.thumb}`
                                            : ""}
                                          {column.title == "disciplina"
                                            ? `${item.thumb}`
                                            : ""}
                                          {column.title == "atividades"
                                            ? `${item.thumb}`
                                            : ""}
                                        </p>
                                        {/* <img src={item.thumb} alt={'Thumb'} /> */}
                                        <div className="flex items-center w-[213px] h-[35px] bg-[#FFFFFF] mt-[15px] rounded-b-lg">
                                          <p className="text-[#4263EB] text-[15px] p-[10px]">
                                            {item.title}
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
