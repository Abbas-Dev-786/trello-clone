import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "../../api";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  // const [tasks, setTasks] = useState([{ type: "todo", tasks: [] }, {}, {}]);
  const { data, error } = useQuery(["tasks"], getAllTasks);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    setTasks(data?.data?.tasks);
  }, [data]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.any,
};

export default TaskProvider;
