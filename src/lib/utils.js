import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const toCamelCase = {
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  class: "className",
  "font-size": "fontSize",
  "background-color": "backgroundColor",
  "text-decoration": "textDecoration",
  "max-width": "maxWidth",
  "text-align": "textAlign",

  "padding-right": "paddingRight",
  "padding-left": "paddingLeft",
  "padding-top": "paddingTop",
  "padding-bottom": "paddingBottom",

  "margin-right": "marginRight",
  "margin-left": "marginLeft",
  "margin-top": "marginTop",
  "margin-bottom": "marginBottom",

  "text-transform": "textTransform",
  "vertical-align": "verticalAlign",
};

export const toReactStyle = (style_string) => {
  const style = {};
  const styles_to_object = style_string.split(";").filter(Boolean);
  for (let item of styles_to_object) {
    const [name, value] = item.split(":");
    style[name in toCamelCase ? toCamelCase[name] : name] = value;
  }

  return style;
};

export const selfClosing = ["img", "br"];
