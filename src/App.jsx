import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Sidebar } from "./components";

const App = () => {
  return (
    <Layout>
      <Sidebar />
      <div className="bg-[#363636] w-full">
        <Outlet />
      </div>
    </Layout>
  );
};

export default App;
