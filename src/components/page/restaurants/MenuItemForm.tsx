import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IMenuItem } from "@/types/restaurant";
import { singleImageUpaload } from "@/utility/cloudinary";
// import { MenuItem } from "@/types/restaurant";
// import { singleImageUpaload } from "@/utlity/cloudinary";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface MenuItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: IMenuItem;
  onSubmit: (data: Omit<IMenuItem, "id">) => void;
}

const MenuItemForm = ({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: MenuItemFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    if (initialData && open) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price?.toString() || "");
      setCategory(initialData.category || "");
      setImage(initialData.image || "");
      setSelectedFile(null);
    }

    // Add mode হলে reset
    if (!initialData && open) {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
      setSelectedFile(null);
    }
  }, [initialData, open]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !price) {
      toast.error("Please fill in name and price");
      return;
    }

    try {
      let finalImage = initialData?.image || "";

      if (selectedFile) {
        setUploading(true);
        finalImage = await singleImageUpaload(selectedFile);
        toast.success("Image uploaded!");
      }

      onSubmit({
        name,
        description,
        price: parseFloat(price),
        category,
        image: finalImage,
      });

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
      setSelectedFile(null);
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Menu Item" : "Add Menu Item"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Name *</Label>
            <Input
              id="item-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Truffle Risotto"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-description">Description</Label>
            <Textarea
              id="item-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Creamy arborio rice with black truffle..."
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="item-price">Price *</Label>
              <Input
                id="item-price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="32"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-category">Category</Label>
              <Input
                id="item-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Main Course"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Image</Label>
            <div className="flex items-center gap-4">
              {image && (
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    height={80}
                    width={80}
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {image ? "Change" : "Upload"}
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : initialData ? (
              "Update Item"
            ) : (
              "Add Item"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemForm;
