import LayoutRenderItem from "@/pages/RenderSlug/LayoutRenderItem";
import LayoutRenderItemColumn from "@/pages/RenderSlug/LayoutRenderItemColumn";

const useHydrate = ({ template, data_slug }) => {
  if (!template || !data_slug) return [];
  const document = new DOMParser().parseFromString(template, "text/html");

  const iterate = (node) => {
    const id = node.getAttribute("data-column-id");
    const children = Array.from(node.children);
    if (id) {
      return {
        Component: LayoutRenderItemColumn,
        props: {
          tag: node.tagName,
          data_slug: data_slug,
          attributes: node.attributes,
          column_id: id,
          textContent: node.textContent,
          children: children.length > 0 ? children.map(iterate) : [],
        },
      };
    } else {
      return {
        Component: LayoutRenderItem,
        props: {
          tag: node.tagName,
          attributes: node.attributes,
          src: node.src,
          textContent: node.textContent,
          children: children.length > 0 ? children.map(iterate) : [],
        },
      };
    }
  };

  return {
    parsed_template: [iterate(document.body)],
    style: document.head.style
  };
};

export default useHydrate;
