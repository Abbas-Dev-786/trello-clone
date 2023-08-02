import { useContext } from "react";
import { TaskContext } from "./TaskProvider";

const useTaskProvider = () => {
  const values = useContext(TaskContext);
  return values;
};

export default useTaskProvider;
