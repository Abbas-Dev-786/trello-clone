import AppLayout from "../components/AppLayout";
import Board from "../components/Board";
import TaskProvider from "../context/task/TaskProvider";

const Home = () => {
  return (
    <AppLayout>
      <TaskProvider>
        <Board />
      </TaskProvider>
    </AppLayout>
  );
};

export default Home;
