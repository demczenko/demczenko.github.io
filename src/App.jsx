import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Sidebar } from "./components";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <Layout>
      <Sidebar />
      <div className="pt-2 pl-2 flex-grow bg-[#111111]">
        <div className="bg-[#363636] rounded-tl-2xl h-full">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default App;
