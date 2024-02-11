import React, { useEffect, useRef, useState } from "react";
import ConfigureNode from "./ConfigureNode";
import { v4 as uuidv4 } from "uuid";
import { SkeletonCard } from "@/components/SkeletonCard";

const ProjectTemplatePreview = ({
  setStyle,
  project_id,
  template_html,
  handleUpdateTemplate,
  projectStyle,
  isLoading,
}) => {
  const ref = useRef(null);
  const [open, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState("");
  const [hydratedTemplate, setHydratedTemplate] = useState("");

  useEffect(() => {
    if (!ref.current) return;

    function handleNodeSelect(ev) {
      ev.preventDefault();
      setIsOpen(true);

      const isId = ev.target.getAttribute("data-style-id");
      if (isId) {
        setSelectedNode({
          node: ev.target,
          id: isId,
        });
      } else {
        let id = uuidv4();
        ev.target.setAttribute("data-style-id", id);
        setSelectedNode({
          node: ev.target,
          id: id,
        });
      }
    }

    function handleNodeHighlight(ev) {
      ev.preventDefault();
      const node = ev.target;
      node.classList.add("hovered_node");
    }

    function handleNodeUnHighlight(ev) {
      ev.preventDefault();
      const node = ev.target;
      node.classList.remove("hovered_node");
    }

    ref.current.addEventListener("click", handleNodeSelect);
    ref.current.addEventListener("mouseover", handleNodeHighlight);
    ref.current.addEventListener("mouseout", handleNodeUnHighlight);

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("click", handleNodeSelect);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    const document = new DOMParser().parseFromString(
      template_html,
      "text/html"
    );

    const nodes_to_update = document.querySelectorAll("[data-style-id]");

    if (nodes_to_update) {
      for (const node of nodes_to_update) {
        for (const item of projectStyle) {
          if (item.id === node.getAttribute("data-style-id")) {
            Object.assign(node.style, item.style);
          }
        }
      }
    }

    setHydratedTemplate(document.documentElement.outerHTML);
  }, [projectStyle, template_html]);

  const clear_body_from_style = (body, style) => {
    const nodes_to_clear = body.querySelectorAll("[data-style-id]");
    if (nodes_to_clear) {
      const nodes = Array.from(nodes_to_clear);
      for (const node of nodes) {
        for (const key in node.style) {
          if (typeof key === "string") {
            if (key in style) {
              node.style[key] = "";
            }
          }
        }
      }
    }
    return body;
  };

  const handleStyle = (style) => {
    Object.assign(selectedNode.node.style, style);

    let new_node = {
      id: selectedNode.id,
      project_id: project_id,
      style: style,
      node_id: uuidv4(),
    };

    setStyle(new_node);
    const updated_body = new DOMParser().parseFromString(
      ref.current.innerHTML,
      "text/html"
    ).body;
    const cleared_body = clear_body_from_style(updated_body, style);
    handleUpdateTemplate(cleared_body.innerHTML);
  };

  if (isLoading) {
    return <SkeletonCard style="w-full xl:h-[1000px] md:h-[600px] h-[400px]" />;
  }

  return (
    <>
      <div
        ref={ref}
        dangerouslySetInnerHTML={{
          __html: hydratedTemplate,
        }}
        className="w-full xl:h-[1000px] md:h-[600px] h-[400px] overflow-y-auto rounded-md block p-8 bg-neutral-600"
      />
      <ConfigureNode
        onSubmit={handleStyle}
        open={open}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default ProjectTemplatePreview;
