import React, { useRef } from "react";
import SelectSlug from "./SelectSlug";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { copy } from "@/hooks/copy";
import { Copy, LoaderIcon } from "lucide-react";
import LayoutRenderItemBody from "./LayoutRenderItemBody";
import LayoutRenderItemComponent from "./LayoutRenderItemComponent";

const Toolbar = ({
  layout,
  isLoading,
  setSelectedSlug,
  selectedSlug,
  project_id,
}) => {
  const ref = useRef();
  const { toast } = useToast();

  const handleCopy = () => {
    copy(ref.current.innerHTML);
    toast({
      variant: "success",
      title: "Success",
      description: "Template successfully copied",
    });
  };

  // TODO: copy template
  return (
    <>
      <div className="h-0 w-0 overflow-hidden" ref={ref}>
        {layout.layout.map((item) => {
          if (item.type === "template") {
            return (
              <LayoutRenderItemBody
                selectedSlug={selectedSlug}
                project_id={project_id}
                key={item.id}
                item={item}
              />
            );
          } else {
            return (
              <LayoutRenderItemComponent
                selectedSlug={selectedSlug}
                project_id={project_id}
                key={item.id}
                item={item}
              />
            );
          }
        })}
      </div>
      <div className="absolute flex grow justify-between items-center md:top-4 top-2 md:left-4 left-2 md:right-4 right-2 z-50">
        <Button
          disabled={isLoading}
          size="sm"
          variant="outline"
          onClick={handleCopy}>
          {isLoading ? (
            <LoaderIcon className="animate-spin w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
        <SelectSlug
          selectedSlug={selectedSlug}
          setSelectedSlug={setSelectedSlug}
          project_id={project_id}
        />
      </div>
    </>
  );
};

export default Toolbar;
