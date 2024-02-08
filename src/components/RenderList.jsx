import { Heading, List } from "@/components";
import { SkeletonCard } from "./SkeletonCard";

const RenderList = ({ isLoading, list, title, action, component, ...rest }) => {
  const Item = component;
  return (
    <div className="w-full">
      {title && <Heading action={action} title={title} />}
      {isLoading ? (
        <div className="flex gap-2 flex-wrap">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
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

export default RenderList;
