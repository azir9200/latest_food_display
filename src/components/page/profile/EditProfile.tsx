"use client";

import { Edit } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { useState } from "react";

const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* ---- Trigger Button ---- */}
      <DialogTrigger asChild>
        <Button className="bg-orange-400 text-white">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>

      {/* ---- Dialog Content ---- */}
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
          <DialogDescription>Fill the form below.</DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input placeholder="Post title" />
          </div>

          <div className="space-y-2">
            <Label>Slug *</Label>
            <Input placeholder="my-new-post" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
