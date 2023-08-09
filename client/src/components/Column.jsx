import PropTypes from "prop-types";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import FlexBetween from "./FlexBetween";
import TaskCard from "./TaskCard";
import useTaskProvider from "../context/task/useTaskProvider";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ title, columnId, data, type }) => {
  const { setTasks: setData, generateId } = useTaskProvider();
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState("");

  const handleSubmitTask = (e) => {
    e.preventDefault();

    const obj = { type, task, id: generateId() };

    setData((prev) => [...prev, obj]);

    setTask("");
    setShowForm(false);
  };

  return (
    <Box height={100} mr={10}>
      <Card sx={{ minWidth: 320 }}>
        <CardContent>
          <FlexBetween>
            <Typography variant="body1" color="text.primary" gutterBottom>
              {title}
            </Typography>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </FlexBetween>
        </CardContent>

        <Droppable droppableId={`${columnId}`}>
          {(provided) => (
            <CardContent ref={provided.innerRef} {...provided.droppableProps}>
              <FlexBetween flexDirection="column" mb={2}>
                {data.map((task, i) => (
                  <TaskCard
                    key={task.id}
                    task={task.task}
                    index={i}
                    id={task.id}
                  />
                ))}
                {provided.placeholder}
              </FlexBetween>
            </CardContent>
          )}
        </Droppable>

        {showForm && (
          <CardContent>
            <TextField
              id={`add-${title.split(" ").join("-")}`}
              label={title}
              multiline
              rows={2}
              fullWidth
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder={`Enter ${title} task`}
            />
          </CardContent>
        )}

        <CardActions>
          {!showForm && (
            <Button size="small" fullWidth onClick={() => setShowForm(true)}>
              Add a Card
            </Button>
          )}
          {showForm && (
            <FlexBetween ml={1.5}>
              <Button
                sx={{ display: "block" }}
                variant="contained"
                size="small"
                onClick={handleSubmitTask}
              >
                Add
              </Button>
              <IconButton onClick={() => setShowForm(false)}>
                <CloseIcon />
              </IconButton>
            </FlexBetween>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

Column.propTypes = {
  title: PropTypes.string,
  columnId: PropTypes.number,
  data: PropTypes.array,
  type: PropTypes.string,
};

export default Column;
