import React from "react";
import { Link } from "react-router-dom";

const PreviewTemplate = ({ href, template_html }) => {
  return (
    <>
      {href ? (
        <Link
          to={href}
          className="flex rounded-xl overflow-hidden max-w-[320px] hover:-translate-y-2 hover:shadow-2xl shadow-xl transition-transform cursor-pointer">
          <iframe
            className="max-w-[300px] h-[400px] pointer-events-none"
            srcDoc={template_html}></iframe>
        </Link>
      ) : (
        <iframe
          className="max-w-[300px] h-[400px] pointer-events-none"
          srcDoc={template_html}></iframe>
      )}
    </>
  );
};

export default PreviewTemplate;
