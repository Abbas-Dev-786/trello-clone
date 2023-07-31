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

const MainCard = ({ title }) => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState("");

  const handleSubmitTask = (e) => {
    e.preventDefault();

    setData((prev) => [...prev, task]);
    setTask("");
    setShowForm(false);
  };

  return (
    <Box height={100}>
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

        <CardContent>
          <FlexBetween flexDirection="column" gap={2}>
            {data.map((task, i) => (
              <TaskCard key={i} task={task} />
            ))}
          </FlexBetween>
        </CardContent>

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

export default MainCard;
