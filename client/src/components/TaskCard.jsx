import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Check, Close, Delete, Edit } from "@mui/icons-material";
import { Draggable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FlexBetween from "./FlexBetween";
import { EditTaskTitle, deleteTask } from "../api";

const TaskCard = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [task, setTask] = useState(props.task);
  const [updatedTask, setUpdatedTask] = useState("");

  const queryClient = useQueryClient();
  const { mutate: editTask, error: editTaskError } = useMutation({
    mutationFn: EditTaskTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const { mutate: removeTask, error: deleteTaskError } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleUpdateTask = (e) => {
    e.preventDefault();

    editTask({ id: props.id, task: updatedTask });

    setTask(updatedTask);
    setShowEdit(false);
  };

  const handleDeleteTask = (e) => {
    e.preventDefault();

    removeTask(props.id);
  };

  useEffect(() => {
    const error = editTaskError || deleteTaskError;
    if (error) {
      alert(error);
    }
  }, [editTaskError, deleteTaskError]);

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <Card
          sx={{ width: 300, mb: 2 }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <FlexBetween flexWrap="wrap">
            <CardContent>
              {showEdit ? (
                <TextField
                  size="small"
                  variant="standard"
                  defaultValue={task}
                  autoFocus
                  onChange={(e) => setUpdatedTask(e.target.value)}
                />
              ) : (
                <Typography variant="body2" noWrap flexWrap="wrap">
                  {task}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              {showEdit && (
                <IconButton size="small" onClick={handleUpdateTask}>
                  <Check fontSize="small" />
                </IconButton>
              )}
              <IconButton
                size="small"
                onClick={() => setShowEdit((prev) => !prev)}
              >
                {!showEdit ? (
                  <Edit fontSize="small" />
                ) : (
                  <Close fontSize="small" />
                )}
              </IconButton>
              <IconButton size="small" onClick={handleDeleteTask}>
                <Delete fontSize="small" />
              </IconButton>
            </CardActions>
          </FlexBetween>
        </Card>
      )}
    </Draggable>
  );
};

TaskCard.propTypes = {
  task: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
};

export default TaskCard;
