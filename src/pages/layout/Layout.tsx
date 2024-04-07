import { Outlet } from "react-router-dom";
import MenuPanel from "../../components/menuPanel/MenuPanel";

const Layout = () => {
  return (
    <>
      <Outlet />
      <MenuPanel />
    </>
  );
};

export default Layout;
