import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid'
import { IoMdPerson, IoMdExit } from 'react-icons/io'
import { MdOutlineNotifications } from 'react-icons/md'
// import ArtImg from '../assets/Capas/ART.png'
// import GeoImg from '../assets/Capas/GEO.png'
// import MatImg from '../assets/Capas/Mat.png'
// import FisImg from '../assets/Capas/FIS.png'
// import QuiImg from '../assets/Capas/QUI.png'

const itemsFromBackend = [
  { id: uuid(), content: '1' },
  { id: uuid(), content: '2' },
  { id: uuid(), content: '3' },
  { id: uuid(), content: '4' },
  { id: uuid(), content: '5' }
]

const itemsAnother = [
  { id: uuid(), content: '6' },
  { id: uuid(), content: '7' },
  { id: uuid(), content: '8' },
  { id: uuid(), content: '9' },
  { id: uuid(), content: '10' }
]

const columnsFromBackend = {
  colunaEsquerda: {
    name: '',
    items: itemsFromBackend
  },
  colunaMeio: {
    name: '',
    items: []
  },
  colunaDireita: {
    name: ' ',
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
    <div className="flex w-full min-h-screen font-sans bg-dark-theme ">
      {/* <DragDropContext> */}
      <main className="text-2xl font-semibold flex-1 bg-dark-theme gap-6">
        <div className="w-full h-16 bg-dark-purple relative">
          <div className="absolute right-5 pt-5 text-white">
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
        <div className="flex h-screen bg-dark-purple relative duration-300 p-6 pt-8">
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
                  className="flex flex-col items-center bg-black"
                  key={columnId}
                >
                  {/* <h2>{column.name}</h2> */}
                  <div style={{ margin: 8 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? 'lightblue'
                                : 'lightgrey'
                            }}
                            className="p-4 w-60 min-h-full"
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    // const list = Array.from(item.content)
                                    // list.push(item.id)
                                    // console.log('Lista:', list)

                                    // console.log(
                                    //   `Nome do item: ${item.content} \nId do item: ${item.id} \nNome da coluna:${column.name} \nId da coluna: ${columnId}`
                                    // )

                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: 'none',
                                          padding: 16,
                                          margin: '0 0 8px 0',
                                          minHeight: '50px',
                                          backgroundColor: snapshot.isDragging
                                            ? '#263B4A'
                                            : '#456C86',
                                          color: 'white',
                                          ...provided.draggableProps.style
                                        }}
                                      >
                                        {item.content}
                                        {/* <img src={item.thumb} alt={'Thumb'} /> */}
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
