import { Heading, List } from "@/components";
import { SkeletonCard } from "./SkeletonCard";
import { TableService } from "@/api/tables/init";
import { TemplatesService } from "@/api/templates/init";
import { ProjectService } from "@/api/projects/init";
import { ColumnService } from "@/api/columns/init";
import { ComponentsService } from "@/api/components/init";
import { DataTableService } from "@/api/tables data/init";
import { ProjectStyleService } from "@/api/projects_style/init";
import { useQuery } from "react-query";
import { useState } from "react";
import ErrorPage from "@/ErrorPage";

const serviceMap = {
  components: ComponentsService,
  templates: TemplatesService,
  tables: TableService,
  projects: ProjectService,
  data_tables: DataTableService,
  project_styles: ProjectStyleService,
  columns: ColumnService,
};

const RenderList = ({
  list,
  service,
  query,
  restrictHeigh,
  title,
  action,
  component,
  ...rest
}) => {
  if (list) {
    return (
      <FetchedList
        rest={rest}
        list={list}
        title={title}
        action={action}
        restrictHeigh={restrictHeigh}
        component={component}
      />
    );
  } else {
    return (
      <FetchList
        action={action}
        title={title}
        rest={rest}
        service={service}
        query={query}
        restrictHeigh={restrictHeigh}
        component={component}
      />
    );
  }
};

const FetchedList = ({
  action,
  rest,
  title,
  list,
  restrictHeigh,
  component,
}) => {
  const Item = component;

  return (
    <div className="w-full">
      {title && <Heading action={action} title={title} />}
      {restrictHeigh ? (
        <div className="max-h-[600px] overflow-auto">
          <List>
            {list.map((item, i) => (
              <Item key={i} item={item} {...rest} />
            ))}
          </List>
        </div>
      ) : (
        <List>
          {list.map((item, i) => (
            <Item key={i} item={item} {...rest} />
          ))}
        </List>
      )}
    </div>
  );
};

const FetchList = ({
  title,
  action,
  rest,
  service,
  query,
  restrictHeigh,
  component,
}) => {
  const [dataList, setList] = useState([]);

  if (!(service in serviceMap)) {
    throw new Error("Service " + service + " not found in servicemap.");
  }

  const {
    status,
    isLoading,
    data,
    error: isError,
    isFetching,
  } = useQuery(service, async () => {
    const response = await serviceMap[service].getAll(query);
    setList(response);
  });

  const Item = component;
  return (
    <div className="w-full">
      {title && <Heading action={action} title={title} />}
      {isLoading ? (
        <div className="flex gap-2 flex-wrap">
          <SkeletonCard />
        </div>
      ) : (
        <>
          {restrictHeigh ? (
            <div className="max-h-[600px] overflow-auto">
              <List>
                {dataList.map((item, i) => (
                  <Item key={i} item={item} {...rest} />
                ))}
              </List>
            </div>
          ) : (
            <List>
              {dataList.map((item, i) => (
                <Item key={i} item={item} {...rest} />
              ))}
            </List>
          )}
        </>
      )}
      {isError && (
        <ErrorPage
          title={`Something went wrong while ${
            title && title.toLowerCase()
          } loading...`}
        />
      )}
    </div>
  );
};
export default RenderList;
