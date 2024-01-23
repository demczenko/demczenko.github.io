import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Sidebar } from "./components";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <Layout>
      <Sidebar />
      <div className="bg-[#363636] w-full">
        <Outlet />
      </div>
      <Toaster />
    </Layout>
  );
};

export default App;
