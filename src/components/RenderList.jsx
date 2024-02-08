import { Heading, List } from "@/components";

const RenderList = ({ list, title, action, component, ...rest }) => {
  const Item = component;
  return (
    <div>
      {title && <Heading action={action} title={title} />}
      <List>
        {list.map((item, i) => (
          <Item key={i} item={item} {...rest} />
        ))}
      </List>
    </div>
  );
};

export default RenderList;
