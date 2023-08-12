import { useEffect, useState, useMemo } from "react";

import { Box, Container } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Column from "./Column";
import useTaskProvider from "../context/task/useTaskProvider";
import { editTaskType } from "../api";

const Board = () => {
  const [columns, setColumns] = useState();
  const { tasks, setTasks } = useTaskProvider();

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: editTaskType,
    onSuccess: (data) => {
      queryClient.setQueryData(["tasks"], data);
    },
  });

  const todos = tasks?.filter((task) => task.type === "todo");
  const progress = tasks?.filter((task) => task.type === "progress");
  const completed = tasks?.filter((task) => task.type === "completed");

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

  useEffect(() => {
    setColumns(initialColumns);

    //eslint-disable-next-line
  }, [tasks]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

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

    //Reorder Task functionality
    if (source.droppableId === destination.droppableId) {
      const reorderedTasks = [...tasks];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      console.log(source, destination);

      const [removedColumn] = reorderedTasks.splice(sourceIndex, 1);
      reorderedTasks.splice(destinationIndex, 0, removedColumn);
      setTasks(reorderedTasks);
    }

    //Swipe task functionality
    if (source.droppableId !== destination.draggableId) {
      const reorderedTasks = [...tasks];
      const taskSwapped = reorderedTasks.find(
        (task) => task._id === draggableId
      );
      taskSwapped.type = columns[+destination.droppableId].type;

      setTasks(reorderedTasks);
      mutate({ id: taskSwapped._id, type: taskSwapped.type });
    }
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
                  {columns?.map((data, i) => (
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
