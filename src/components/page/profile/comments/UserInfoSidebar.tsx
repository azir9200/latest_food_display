import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/services/AuthService/updateUser";
import { IUser } from "@/types";
import { singleImageUpaload } from "@/utility/cloudinary";
import {
  Calendar,
  Crown,
  Edit,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

// interface IUserData {
//   id: string;
//   name: string;
//   email?: string;
//   image: string;
//   isPremium: boolean;
//   createdAt: string;
//   bio?: string;
//   phone?: string;
//   location?: string;
// }

// interface UserInfoSidebarProps {
//   userData: IUser;
// }

const UserInfoSidebar: React.FC<{ userData: IUser }> = ({ userData }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(userData.name);
  const [editBio, setEditBio] = useState(userData.bio || "");
  const [editPhone, setEditPhone] = useState(userData.phone || "");
  const [editLocation, setEditLocation] = useState(userData.location || "");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(userData.image);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const [uploading, setUploading] = useState(false);

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      let imageUrl = userData.image;

      // If a new image was selected, upload to Cloudinary
      if (selectedImage) {
        try {
          setUploading(true);
          imageUrl = await singleImageUpaload(selectedImage);
          toast.success("Image uploaded successfully!");
        } catch (error) {
          console.log(error);
          toast.error(
            "Failed to upload image. Please check your Cloudinary settings."
          );
          return;
        } finally {
          setUploading(false);
        }
      }

      // TODO: Call API to update profile with all fields
      const profileData = {
        name: editName,
        bio: editBio,
        phone: editPhone,
        location: editLocation,
        image: imageUrl,
      };

      await updateProfile(userData.id, profileData);
      toast.success("Profile updated successfully!");
      setEditDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="sticky top-4">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary/10">
                <AvatarImage
                  src={userData.image || undefined}
                  alt={userData.name}
                />

                <AvatarFallback className="text-3xl">
                  {userData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {userData.isPremium && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full p-2">
                  <Crown className="h-5 w-5 text-white" />
                </div>
              )}
            </div>

            <h2 className="mt-4 text-2xl font-bold">{userData.name}</h2>

            {userData.isPremium && (
              <div className="mt-2 inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                <Crown className="h-3 w-3" />
                Premium Member
              </div>
            )}

            {/* Additional Info */}
            <div className="mt-4 w-full space-y-2 text-left">
              {userData.email && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  {userData.email}
                </div>
              )}
              {userData.phone && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  {userData.phone}
                </div>
              )}
              {userData.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  {userData.location}
                </div>
              )}
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                Joined{" "}
                {new Date(userData.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Bio */}
            {userData.bio && (
              <div className="mt-4 w-full">
                <p className="text-sm text-muted-foreground text-left">
                  {userData.bio}
                </p>
              </div>
            )}

            <Button
              className="mt-6 w-full"
              variant="outline"
              onClick={() => setEditDialogOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Profile Photo</Label>
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 border-2 border-primary/20">
                  <AvatarImage src={imagePreview || undefined} alt="Preview" />

                  <AvatarFallback>{editName.charAt(0)}</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
                <p className="text-xs text-muted-foreground">Max size: 5MB</p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="City, Country"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveProfile}
              disabled={loading || uploading || !editName.trim()}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : loading ? (
                "Saving..."
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserInfoSidebar;
