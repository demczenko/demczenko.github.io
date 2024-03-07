import LayoutRenderItem from "@/pages/RenderSlug/LayoutRenderItem";
import LayoutRenderItemColumn from "@/pages/RenderSlug/LayoutRenderItemColumn";
import { v4 as uuidv4 } from "uuid";
const useHydrate = ({ template, data_slug }) => {
  if (!template || !data_slug) return [];
  const document = new DOMParser().parseFromString(template, "text/html");

  const iterate = (node) => {
    const id = node.getAttribute("data-column-id");
    const children = Array.from(node.children);
    if (id) {
      return (
        <LayoutRenderItemColumn
          key={uuidv4()}
          column_id={id}
          attributes={node.attributes}
          tag={node.tagName}
          data_slug={data_slug}>
          {children.map(iterate)}
        </LayoutRenderItemColumn>
      );
    } else {
      const props = {
        tag: node.tagName,
        attributes: node.attributes,
        src: node.src,
        textContent: node.textContent,
        children: children.length > 0 ? children.map(iterate) : [],
      };

      return <LayoutRenderItem key={uuidv4()} {...props} />;
    }
  };

  return {
    parsed_template: [iterate(document.body)],
    style: document.head.querySelector("style").innerHTML,
  };
};

export default useHydrate;
