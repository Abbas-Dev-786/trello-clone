import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  // const [tasks, setTasks] = useState([{ type: "todo", tasks: [] }, {}, {}]);
  const [tasks, setTasks] = useState([]);

  const generateId = () => `task-${Date.now()}`;

  return (
    <TaskContext.Provider value={{ tasks, setTasks, generateId }}>
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.any,
};

export default TaskProvider;
