import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer.jsx"
import Header from "../components/Header.jsx";

const MainLayout = () => {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
    </>
  )
};

export default MainLayout;