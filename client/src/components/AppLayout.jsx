import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
};

export default AppLayout;
