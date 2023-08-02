import PropTypes from "prop-types";
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

AppLayout.propTypes = {
  children: PropTypes.any,
};

export default AppLayout;
