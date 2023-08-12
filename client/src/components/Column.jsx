import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Droppable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FlexBetween from "./FlexBetween";
import TaskCard from "./TaskCard";

import { addTask } from "../api";

const Column = ({ title, columnId, data, type }) => {
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState("");

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleSubmitTask = (e) => {
    e.preventDefault();

    mutate({ type, task, createdBy: "64cba118df5fdbf069d624dd" });

    setTask("");
    setShowForm(false);
  };

  return (
    <Box height={100} mr={10}>
      <Card sx={{ minWidth: 320 }}>
        <CardContent>
          <FlexBetween>
            <Typography
              variant="body1"
              color="text.primary"
              textTransform="capitalize"
              gutterBottom
            >
              {title}
            </Typography>
            <Chip label={data?.length ?? 0} size="small" />
          </FlexBetween>
        </CardContent>

        <Droppable droppableId={`${columnId}`}>
          {(provided) => (
            <CardContent
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              <FlexBetween flexDirection="column" mb={2}>
                {data?.map((task, i) => (
                  <TaskCard
                    key={task._id}
                    task={task.task}
                    index={i}
                    id={task._id}
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
