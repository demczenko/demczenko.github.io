import { ImportIcon } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

const HandleImportCSV = ({onDrop}) => {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="mt-4">
          <p className="group h-[400px] flex items-center justify-center font-semibold w-full bg-blue-100 border-2 border-blue-600 rounded-md border-dashed">
            <span className="text-xl text-center text-slate-50 flex gap-2 group-hover:text-blue-400 transition-colors group-hover:bg-slate-50 rounded-lg p-4 items-center cursor-pointer">
              Drag and drop only CSV file here, or click to select CSV file
              <ImportIcon />
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default HandleImportCSV;
