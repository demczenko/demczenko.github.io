import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout, Sidebar } from "./components";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  const { pathname } = useLocation();

  return (
    <Layout>
      <Sidebar />
      <div className="pt-2 pl-2 flex-grow bg-[#111111]">
        <div className="bg-[#363636] rounded-tl-2xl h-full">
          {pathname !== "/" ? <Outlet /> : <Dashboard />}
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default App;
