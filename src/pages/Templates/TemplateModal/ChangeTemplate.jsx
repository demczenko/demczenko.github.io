import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const ChangeTemplate = ({ onUpdate, isLoading, placeholder, template_id }) => {
  const [html, setHTML] = useState("");
  const { toast } = useToast();
  const client = useQueryClient();

  useEffect(() => {
    setHTML(placeholder);
  }, []);

  const onChangeTemplateSubmit = async () => {
    if (html.trim().length < 10) {
      toast({
        variant: "destructive",
        title: "Failed to update template",
        description: "Template too small",
      });
    }
    onUpdate({ html: html });
  };

  return (
    <>
      <div className="w-full xl:h-[1000px] md:h-[600px] h-[400px] overflow-y-auto rounded-md block">
        <Textarea
          type="text"
          id="name"
          onChange={(ev) => setHTML(ev.target.value)}
          placeholder="template name"
          value={html}
          className="w-full h-full"
        />
      </div>
      <Button className="mt-6 w-full" onClick={() => onChangeTemplateSubmit()}>
        {isLoading ? (
          <Loader2
            className={cn(" h-4 w-4", {
              "animate-spin": isLoading,
            })}
          />
        ) : (
          "Save"
        )}
      </Button>
    </>
  );
};

export default ChangeTemplate;
