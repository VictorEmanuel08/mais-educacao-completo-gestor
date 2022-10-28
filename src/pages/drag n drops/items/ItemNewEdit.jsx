import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import MenuIcon from "@mui/icons-material/Menu";

export function ItemNewEdit({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex justify-center flex-col items-center mb-[30px] w-[200px] h-[100px] rounded-lg "
        >
          <a className="flex flex-row items-center  active:opacity-50">
            <MenuIcon className="text-[#4263EB] active:text-[#263B4A] opacity-1 mr-1" />
            <img src={data.thumb} />
          </a>
        </div>
      )}
    </Draggable>
  );
}
