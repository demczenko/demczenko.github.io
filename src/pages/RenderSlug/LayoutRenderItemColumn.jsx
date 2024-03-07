import ErrorPage from "@/ErrorPage";
import { useColumn } from "@/hooks/columns/useColumn";
import { toCamelCase, toReactStyle } from "@/lib/utils";
import React from "react";
import ParagraphSkeleton from "./ParagraphSkeleton";

const LayoutRenderItemColumn = ({
  tag,
  data_slug,
  column_id,
  attributes,
  textContent,
  children
}) => {
  const {
    data: column,
    isError: IsColumnError,
    isLoading: IsColumnLoading,
  } = useColumn(column_id);

  if (IsColumnLoading) {
    return <ParagraphSkeleton />;
  }

  if (IsColumnError) {
    return <ErrorPage title={`Something went wrong while column loading.`} />;
  }

  let attrs = {};
  for (const { value, name } of attributes ?? []) {
    if (name === "style") {
      attrs[name in toCamelCase ? toCamelCase[name] : name] =
        toReactStyle(value);
    } else {
      attrs[name in toCamelCase ? toCamelCase[name] : name] = value;
    }
  }

  const data = data_slug.find((item) => item.table_id === column.table_id);
  const key = column.header;

  const Tag = `${tag.toLowerCase()}`;

  if (column.type === "text") {
    return <Tag {...attrs}>{data ? data.data[key] : textContent}</Tag>;
  }

  if (column.type === "src") {
    return <Tag {...attrs} src={data ? data.data[key] : attributes.src.value} />;
  }

  if (column.type === "href") {
    return (
      <Tag {...attrs} href={data ? data.data[key] : attributes.href}>{children}</Tag>
    );
  }
};

export default LayoutRenderItemColumn;
