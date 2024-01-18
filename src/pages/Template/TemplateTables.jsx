import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableContent from "./TableContent";

const TemplateTables = ({ tables }) => {
  return (
    <Tabs defaultValue={tables[0]?.id} className="max-w-[800px]">
      <TabsList className={"w-full"}>
        {tables.map((item) => (
          <TabsTrigger className={"w-full"} key={item.id} value={item.id}>{item.table_name}</TabsTrigger>
        ))}
      </TabsList>
      {tables.map((item) => (
        <TabsContent key={item.id} value={item.id}>
          <TableContent table={item} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TemplateTables;
