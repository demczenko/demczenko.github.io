import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useTemplateUpdate } from "@/hooks/templates/useTemplateUpdate";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

const ChangeTemplate = ({ placeholder, template_id }) => {
  const [html, setHTML] = useState("");
  const { toast } = useToast();
  const client = useQueryClient();

  useEffect(() => {
    setHTML(placeholder);
  }, []);

  const {
    mutate: updateTemplate,
    isLoading: isTemplateUpdateLoading,
    isError: isTemplateUpdateError,
  } = useTemplateUpdate(template_id);

  const onChangeTemplateSubmit = async () => {
    if (html.trim().length < 10) {
      toast({
        variant: "destructive",
        title: "Failed to update template",
        description: "Template too small",
      });
    }
    updateTemplate(
      {
        template_html: html,
      },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to update template",
            description: "Something went wrong",
          });
        },
        onSettled: () => {
          client.invalidateQueries(`template-${template_id}`);
        },
        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Template name successfully updated",
          });
        },
      }
    );
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
        {isTemplateUpdateLoading ? (
          <Loader2
            className={cn(" h-4 w-4", {
              "animate-spin": isTemplateUpdateLoading,
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
