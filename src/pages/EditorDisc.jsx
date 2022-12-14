import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid'
import { IoMdPerson, IoMdExit } from 'react-icons/io'
import { MdOutlineNotifications } from 'react-icons/md'
import logo from '../assets/logo.png'
// import ArtImg from '../assets/Capas/ART.png'
// import GeoImg from '../assets/Capas/GEO.png'
// import MatImg from '../assets/Capas/Mat.png'
// import FisImg from '../assets/Capas/FIS.png'
// import QuiImg from '../assets/Capas/QUI.png'

const itemsFromBackend = [
  { id: uuid(), content: 'Thumbnail', assunto: 'Divisão e fração' },
  { id: uuid(), content: 'Thumbnail', assunto: 'Adição' },
  { id: uuid(), content: 'Thumbnail', assunto: 'Multiplicação' },
  { id: uuid(), content: 'Thumbnail', assunto: 'Equações' },
  { id: uuid(), content: 'Thumbnail', assunto: 'Álgebra' },
  { id: uuid(), content: 'Thumbnail', assunto: 'Álgebra 2' }
]

const itemsAnother = [
  { id: uuid(), content: 'Thumbnail', assunto: 'Divisão e fração' },
  { id: uuid(), content: 'Thumbnail', assunto: 'Adição' },
  { id: uuid(), content: 'Thumbnail', assunto: 'Revisão primeiro sem...' },
  { id: uuid(), content: 'Thumbnail', assunto: 'Multiplicação' }
]

const columnsFromBackend = {
  1: {
    title: 'aulas',
    name: 'Vídeo Aulas',
    items: itemsFromBackend
  },
  2: {
    title: 'disciplina',
    name: 'Matemática > 1 ano',
    items: []
  },
  3: {
    title: 'atividades',
    name: 'Atividades cadastradas',
    items: itemsAnother
  }
}

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return
  const { source, destination } = result

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }
}

function App() {
  const [columns, setColumns] = useState(columnsFromBackend)
  return (
    <div className="flex w-full h-screen font-sans bg-dark-theme ">
      {/* <DragDropContext> */}
      <main className="text-2xl font-semibold flex-1 bg-dark-theme gap-6 ">
        <div className="w-full h-16 bg-dark-purple relative">
          <div className="p-4">
            <img
              src={logo}
              alt="logo maisEducação"
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
            {/* <div style={{ display: "flex", justifyContent: "center", height: "100%" }}> */}
          </div>
        </div>
        <div className="flex flex-wrap h-fit justify-between bg-dark-purple leading-none pt-[40px]">
          <DragDropContext
            onDragEnd={result => (
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
                  ${columnId == 1 ? 'pl-4' : '0'}
                  ${
                    columnId == 2
                      ? 'bg-[#ffffff] w-8/12 h-full flex mt-[-40px] border-x-[41px] border-y-[20px] border-[#EDF2FF] '
                      : '0'
                  }
                  ${columnId == 3 ? 'flex items-center' : '0'}
                  }`}
                  key={columnId}
                >
                  <h2
                    className={`font-[sans-serif] text-[#FFFFFF] 
                  ${columnId == 1 ? 'pr-4' : '0'}
                  ${columnId == 2 ? 'text-dark-purple p-8' : '0'}
                  ${columnId == 3 ? 'pr-4' : '0'}
                    `}
                  >
                    {column.title == 'aulas' ? `${column.name}` : ''}
                    {column.title == 'disciplina' ? `${column.name}` : ''}
                    {column.title == 'atividades' ? `${column.name}` : ''}
                  </h2>

                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`w-60 h-screen ${
                              columnId == 2
                                ? 'ml-4 w-11/12 border-dashed border-2 border-[#4263EB] rounded-lg p-4 ?'
                                : '0'
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
                                          column.title == 'disciplina' ? (
                                            <div>oi</div>
                                          ) : (
                                            ''
                                          )
                                        }
                                        `}
                                      >
                                        <p className="text-white pb-[10px] mt-[40px]">
                                          {/* {item.content} */}
                                          {column.title == 'aulas'
                                            ? `${item.content}`
                                            : ''}
                                          {column.title == 'disciplina'
                                            ? `${item.content}`
                                            : ''}
                                          {column.title == 'atividades'
                                            ? `${item.content}`
                                            : ''}
                                        </p>
                                        {/* <img src={item.thumb} alt={'Thumb'} /> */}
                                        <div className="flex items-center w-[213px] h-[35px] bg-[#FFFFFF] mt-[15px] rounded-b-lg">
                                          <p className="text-[#4263EB] text-[15px] p-[10px]">
                                            {item.assunto}
                                          </p>
                                        </div>
                                      </div>
                                    )
                                  }}
                                </Draggable>
                              )
                            })}
                            {provided.placeholder}
                          </div>
                        )
                      }}
                    </Droppable>
                  </div>
                </div>
                // OUTRA DIV
              )
            })}
          </DragDropContext>
        </div>
      </main>
    </div>
  )
}

export default App
