import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
