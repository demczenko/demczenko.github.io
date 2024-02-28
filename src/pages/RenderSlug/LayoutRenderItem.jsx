const toCamelCase = {
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  class: "className",
  "font-size": "fontSize",
  "background-color": "backgroundColor",
  "text-decoration": "textDecoration",
  "max-width": "maxWidth",
  "text-align": "textAlign",
};

const toReactStyle = (style_string) => {
  const style = {};
  const styles_to_object = style_string.split(";").filter(Boolean);
  for (let item of styles_to_object) {
    const [name, value] = item.split(":");
    style[name in toCamelCase ? toCamelCase[name] : name] = value;
  }

  return style;
};

const selfClosing = ["img", "br"];

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
