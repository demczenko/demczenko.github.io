import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export function ContextMenuRow({ children, actions }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        {
          actions.map(action => <ContextMenuItem key={action.id} onClick={action.onClick}>{action.name}</ContextMenuItem>)
        }
      </ContextMenuContent>
    </ContextMenu>
  );
}
