import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Import } from "lucide-react";

export function TableCartProject({ item, onTableSelect }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{item.table_name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onTableSelect(item)}
        >
          <Import className="w-6 h-6 mr-2" /> Populate
        </Button>
      </CardFooter>
    </Card>
  );
}
