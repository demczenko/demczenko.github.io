import ErrorPage from "@/ErrorPage";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useColumn } from "@/hooks/columns/useColumn";
import React from "react";

const LayoutRenderItemColumn = ({ tag, data_slug, column_id, textContent }) => {
  const {
    data: column,
    isError: IsColumnError,
    isLoading: IsColumnLoading,
  } = useColumn(column_id);

  if (IsColumnLoading) {
    return <SkeletonCard />;
  }

  if (IsColumnError) {
    return <ErrorPage title={`Something went wrong while column loading.`} />;
  }

  const data = data_slug.find((item) => item.table_id === column.table_id);
  const key = column.header;

  const Tag = `${tag.toLowerCase()}`;

  if (column.type === "text") {
    return <Tag>{data ? data.data[key] : textContent}</Tag>;
  }

  if (column.type === "src") {
    return <Tag src={data ? data.data[key] : attributes.src} />;
  }

  if (column.type === "href") {
    return <Tag href={data ? data.data[key] : attributes.href}></Tag>;
  }
};

export default LayoutRenderItemColumn;
