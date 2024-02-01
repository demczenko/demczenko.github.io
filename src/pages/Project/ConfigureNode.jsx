import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ConfigureNode = ({ open, onOpenChange, onSubmit }) => {
  const [bgcolor, setBgColor] = useState("");
  const [color, setColor] = useState("");

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit node style</DialogTitle>
          <DialogDescription>
            Make changes to node here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Text color
            </Label>
            <Input
              onChange={(ev) => setColor(ev.target.value)}
              id="name"
              type="color"
              value={color}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bg" className="text-right">
              Background color
            </Label>
            <Input
              onChange={(ev) => setBgColor(ev.target.value)}
              id="bg"
              value={bgcolor}
              type="color"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onSubmit({
                color: color,
                backgroundColor: bgcolor,
              });
              onOpenChange(false);
              setColor("");
              setBgColor("");
            }}
            type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigureNode;
