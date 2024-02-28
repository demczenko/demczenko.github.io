import { selfClosing, toCamelCase, toReactStyle } from "@/lib/utils";


const LayoutRenderItem = ({ tag, src, attributes, textContent, children }) => {
  const Tag = `${tag.toLowerCase()}`;

  let attrs = {};
  for (const { value, name } of attributes ?? []) {
    if (name === "style") {
      attrs[name in toCamelCase ? toCamelCase[name] : name] =
        toReactStyle(value);
    } else {
      attrs[name in toCamelCase ? toCamelCase[name] : name] = value;
    }
  }

  if (selfClosing.includes(Tag)) {
    if (Tag === "img") {
      return <Tag {...attrs} src={src} />;
    }
    return <Tag {...attrs} />;
  }

  if (children.length > 0) {
    return <Tag {...attrs}>{children}</Tag>;
  }

  return <Tag {...attrs}>{textContent}</Tag>;
};

export default LayoutRenderItem;
