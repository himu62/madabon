import { Outlet } from "react-router";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

const Layout = () => {
  return (
    <div>
      <title>まだぼん</title>
      <>
        <Drawer opened={true} />
        <>
          <Header title="Header" />
          <>
            <Outlet />
          </>
        </>
      </>
    </div>
  );
};

export default Layout;
