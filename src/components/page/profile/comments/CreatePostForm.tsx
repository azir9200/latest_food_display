"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/services/postService";
import { ICategory } from "@/types/comments";
import { uploadImagesToCloudinary } from "@/utility/cloudinary";
import { MapPin, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface CreatePostFormProps {
  categories: ICategory[];
  userImage?: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  categories,
  userImage,
}) => {
  const [title, setTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostLocation, setNewPostLocation] = useState("");
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [price, setPrice] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: any) => {
    const filesArray = Array.from(e.target.files) as File[];
    if (filesArray.length > 4) {
      toast.error("You can only upload up to 4 images");
      return;
    }
    setSelectedFiles(filesArray);
    const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls(newImageUrls);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });

          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
            .then((res) => res.json())
            .then((data) => {
              const locationName =
                data.address.city ||
                data.address.town ||
                data.address.suburb ||
                "Current location";
              setNewPostLocation(locationName);
              toast.success(`Location detected: ${locationName}`);
            })
            .catch(() => {
              setNewPostLocation(
                `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
              );
              toast.success("Coordinates detected");
            });
        },
        () => {
          toast.error("Couldn't access your location");
          setLocationDialogOpen(true);
        }
      );
    } else {
      toast.error("Geolocation is not supported");
      setLocationDialogOpen(true);
    }
  };

  const handleCreatePost = async () => {
    try {
      setLoading(true);
      const uploadedUrls = await uploadImagesToCloudinary(selectedFiles);
      const payload = {
        title,
        description: newPostContent,
        price: parseFloat(price) || 0,
        location: newPostLocation,
        image:
          uploadedUrls[0] ||
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300",
        categoryId: selectedCategoryId,
        coordinates,
      };

      const res = await createPost(payload);
      if (res.success) {
        toast.success("Post created!");
        setTitle("");
        setNewPostContent("");
        setPrice("");
        setNewPostLocation("");
        setSelectedCategoryId("");
        setSelectedFiles([]);
        setImagePreviewUrls([]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={userImage ?? ""} />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Share your food discovery</h3>
            {newPostLocation && (
              <div className="text-sm text-gray-500 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {newPostLocation}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Input
          className="mb-4"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          className="mb-4"
          placeholder="Describe the food you discovered..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <Input
          className="mb-4"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <Select
          value={selectedCategoryId}
          onValueChange={setSelectedCategoryId}
        >
          <SelectTrigger className="mb-4 w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {imagePreviewUrls.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {imagePreviewUrls.map((url, index) => (
              <div
                key={index}
                className="relative h-32 rounded overflow-hidden"
              >
                <Image
                  height={500}
                  width={500}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => {
                    setImagePreviewUrls(
                      imagePreviewUrls.filter((_, i) => i !== index)
                    );
                    setSelectedFiles(
                      selectedFiles.filter((_, i) => i !== index)
                    );
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
            />
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Photo
            </Button>
            <Button variant="outline" size="sm" onClick={getCurrentLocation}>
              📍 Use Current Location
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocationDialogOpen(true)}
            >
              ✍️ Enter Manually
            </Button>
          </div>

          <div className="self-end sm:self-auto">
            <Button
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              onClick={handleCreatePost}
              disabled={loading || !title.trim() || !newPostContent.trim()}
            >
              {loading ? "Posting...." : "Post"}
            </Button>
          </div>
        </div>
      </CardContent>

      <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Location</DialogTitle>
            <DialogDescription>
              Could not detect location. Please enter manually.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newPostLocation}
            onChange={(e) => setNewPostLocation(e.target.value)}
            placeholder="e.g. New Market, Dhaka"
          />
          <DialogFooter>
            <Button onClick={() => setLocationDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CreatePostForm;
