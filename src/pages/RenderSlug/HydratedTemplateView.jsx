import ErrorPage from "@/ErrorPage";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useLayout } from "@/hooks/layouts/useLayout";
import LayoutRenderItemComponent from "./LayoutRenderItemComponent";
import LayoutRenderItemBody from "./LayoutRenderItemBody";
import NotFound from "@/NotFound";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const HydratedTemplateView = ({ layout_id, project, selectedSlug }) => {
  const { toast } = useToast();

  const ref = useRef();
  const {
    data: layout,
    isError: isLayoutError,
    isLoading: isLayoutLoading,
  } = useLayout(layout_id);

  if (isLayoutLoading) {
    return <SkeletonCard />;
  }

  if (isLayoutError) {
    return <ErrorPage title={`Something went wrong while layout loading.`} />;
  }

  if (!layout) {
    return (
      <NotFound
        title={"Layout you are trying to access not found."}
        action={{ to: "/layouts", title: "Go to layouts" }}
      />
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <title>Beliani</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&subset=cyrillic-ext,latin-ext" rel="stylesheet">

        <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#ececec">
                </v:background>
            <![endif]-->
        <!--[if gte mso 10]>
                <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
            <![endif]-->
    </head>

    <body class="body" width="100%" style="width:100% !important; padding:0 !important; margin:0 auto !important; font-family: 'Open Sans', sans-serif!important; font-size:13px; color:#000000; text-align:left; background-color:#ececec;">
    ${ref.current.innerHTML}
    </body>
    </html>
    `);
    toast({
      variant: "success",
      title: "Success",
      description: "Template successfully copied",
    });
  };

  return (
    <div className="relative w-full h-full">
      <Button
        disabled={isLayoutLoading}
        size="sm"
        className="top-4 right-8 absolute z-50"
        variant="outline"
        onClick={handleCopy}>
        <Copy className="w-4 h-4" />
      </Button>
      <div
        className="absolute inset-0 z-40 w-full overflow-y-auto rounded-md block"
        ref={ref}>
        {layout.layout.map((item) => {
          if (item.type === "template") {
            return (
              <LayoutRenderItemBody
                selectedSlug={selectedSlug}
                project_id={project.id}
                key={item.id}
                item={item}
              />
            );
          } else {
            return (
              <LayoutRenderItemComponent
                selectedSlug={selectedSlug}
                project_id={project.id}
                key={item.id}
                item={item}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default HydratedTemplateView;
