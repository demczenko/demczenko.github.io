import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout, Sidebar } from "./components";
import { Toaster } from "./components/ui/toaster";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  const { pathname } = useLocation();

  return (
    <Layout>
      <Sidebar />
      <div className="pt-2 flex-grow bg-[#111111] relative z-10">
        <Navbar />
        <div className="bg-[#363636] rounded-tl-2xl h-full overflow-hidden">
          {pathname !== "/" ? <Outlet /> : <Dashboard />}
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default App;
