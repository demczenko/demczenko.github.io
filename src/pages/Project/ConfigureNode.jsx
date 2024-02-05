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
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [err, setError] = useState(true);

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
            <Label htmlFor="name" className="text-left">
              Section Name{" "}
            </Label>
            <Input
              onChange={(ev) => setName(ev.target.value)}
              id="name"
              value={name}
              type="text"
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Text color
            </Label>
            <p
              style={{ backgroundColor: color }}
              className="rounded-full h-6 w-6 col-span-1"
            />
            <Input
              onChange={(ev) => {
                if (ev.target.value.trim().includes("#")) {
                  setColor(ev.target.value);
                  setError(false);
                } else {
                  setError(true);
                }
              }}
              id="name"
              value={color}
              type="text"
              className="col-span-4"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bg" className="text-left">
              Background color{" "}
            </Label>
            <p
              style={{ backgroundColor: bgcolor }}
              className="rounded-full h-6 w-6 col-span-1"
            />
            <Input
              onChange={(ev) => {
                if (ev.target.value.trim().includes("#")) {
                  setBgColor(ev.target.value);
                  setError(false);
                } else {
                  setError(true);
                }
              }}
              id="bg"
              value={bgcolor}
              type="text"
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={err}
            onClick={() => {
              if (name.trim().length < 3) {
                return;
              }
              onSubmit({
                color: color,
                backgroundColor: bgcolor,
                name: name,
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
