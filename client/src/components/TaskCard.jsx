import { Check, Close, Edit } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useState } from "react";

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
    <Card sx={{ width: 300 }}>
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
              {task}
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
          <IconButton size="small" onClick={() => setShowEdit((prev) => !prev)}>
            {!showEdit ? <Edit fontSize="small" /> : <Close fontSize="small" />}
          </IconButton>
        </CardActions>
      </FlexBetween>
    </Card>
  );
};

export default TaskCard;
