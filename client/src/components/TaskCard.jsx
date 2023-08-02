import PropTypes from "prop-types";
import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Check, Close, Edit } from "@mui/icons-material";
import { Draggable } from "react-beautiful-dnd";
import FlexBetween from "./FlexBetween";

const TaskCard = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const [task, setTask] = useState(props.task);
  const [updatedTask, setUpdatedTask] = useState("");

  const handleUpdateTask = (e) => {
    e.preventDefault();

    setTask(updatedTask);
    setShowEdit(false);
  };

  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <Card
          sx={{ width: 300 }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <FlexBetween>
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
                <Typography variant="body2" display="block" noWrap={true}>
                  {props.id} {task}
                </Typography>
              )}
              {/* <Typography variant="caption">Created by Author</Typography> */}
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
