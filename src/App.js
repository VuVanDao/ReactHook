import "./App.scss";
import Header from "./components/Header/Header";
import { Link, Outlet } from "react-router-dom";
import PerfectScrollBar from "react-perfect-scrollbar";
const App = () => {
  return (
    <>
      <div className="app-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="main-container">
          <div className="sidenav-container"></div>
          <div className="app-content">
            <PerfectScrollBar>
              {/* noi chua route con cua admin */}
              <Outlet />
            </PerfectScrollBar>
            {/* render ra may thang con trong Routers app */}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
