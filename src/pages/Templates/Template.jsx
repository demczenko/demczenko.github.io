import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Options } from "@/components";

const Template = ({ id, template_name, template_json }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Link
        to={id}
        className="flex rounded-xl overflow-hidden  max-w-[320px] hover:-translate-y-2 hover:shadow-2xl shadow-xl transition-transform cursor-pointer">
        <img
          src="https://placehold.co/300x400"
          className="block w-full h-full"
          alt=""
        />
      </Link>
      <div className="flex mt-4">
        <div className="w-full font-medium text-white overflow-hidden truncate">{template_name}</div>
        <div className="w-1/2 flex justify-end">
          <Options options={[
            {
              id: 1,
              name: "Rename",
              onClick: () => setIsModalOpen(true)
            },
            {
              id: 2,
              name: "Archive",
              onClick: () => alert('Under development')
            },
          ]} title={"Manage template"} />
        </div>
      </div>
    </div>
  );
};

export default Template;
