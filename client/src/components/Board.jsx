import { Box, Container } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import useTaskProvider from "../context/task/useTaskProvider";
import { useEffect, useMemo, useState } from "react";

const Board = () => {
  const { tasks, setTasks } = useTaskProvider();
  const todos = tasks.filter((task) => task.type === "todo");
  const progress = tasks.filter((task) => task.type === "progress");
  const completed = tasks.filter((task) => task.type === "completed");

  const initialColumns = useMemo(
    () => [
      {
        title: "To Do 📝",
        columnId: 0,
        data: todos,
        type: "todo",
      },
      {
        title: "In Progress ⏳",
        columnId: 1,
        data: progress,
        type: "progress",
      },
      {
        title: "Completed ✅",
        columnId: 2,
        data: completed,
        type: "completed",
      },
    ],
    [todos, progress, completed]
  );

  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    setColumns(initialColumns);

    //eslint-disable-next-line
  }, [tasks]);

  const handleDragEnd = (results) => {
    const { source, destination, type, draggableId } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "column") {
      const reorderedColumns = [...columns];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedColumn] = reorderedColumns.splice(sourceIndex, 1);
      reorderedColumns.splice(destinationIndex, 0, removedColumn);

      return setColumns(reorderedColumns);
    }

    const reorderedTasks = [...tasks];

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const [removedColumn] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, removedColumn);
    setTasks(reorderedTasks);

    const taskSwapped = reorderedTasks.find((task) => task.id === draggableId);
    taskSwapped.type = columns[+destination.droppableId].type;
    setTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="wrapper">
        <Container maxWidth="xl">
          <Droppable droppableId="board" type="column" direction="horizontal">
            {(provided) => (
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  pt={5}
                  px={5}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {columns.map((data, i) => (
                    <Draggable
                      draggableId={`${data.columnId}`}
                      index={i}
                      key={data.columnId}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Column {...data} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </Box>
                {provided.placeholder}
              </>
            )}
          </Droppable>
        </Container>
      </div>
    </DragDropContext>
  );
};

export default Board;
