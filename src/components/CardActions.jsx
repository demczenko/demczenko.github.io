import { Button } from "@/components/ui/button";

const CardActions = ({ actions }) => {
  return (
    <div className="flex gap-2 items-center justify-start">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="outline"
          size="sm"
          className="bg-slate-950 rounded-md text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
          onClick={action.onClick}>
          {"icon" in action && action.icon} {action.name}
        </Button>
      ))}
    </div>
  );
};

export default CardActions;
