import { Button } from "@/components/ui/button";
import React from "react";

const ImportConflict = ({ slug, onUpdate, onSkip }) => {
  return (
    <div className="bg-red-200 backdrop-blur-lg rounded-md text-left p-4 space-y-4 mt-2">
      <h2 className="font-medium text-2xl text-gray-800">Import conflict {slug.toUpperCase()}</h2>
      <p className="text-sm text-gray-800 font-medium">
        An item with slug {slug} already exists
      </p>
      <div className="flex justify-between gap-4">
        <Button
          variant="ghost"
          className="w-full border-slate-100 border-2"
          size="sm"
          onClick={onSkip}>
          Skip item
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          size="sm"
          onClick={onUpdate}>
          Update item
        </Button>
      </div>
    </div>
  );
};

export default ImportConflict;
