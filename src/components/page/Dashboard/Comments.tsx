"use client";
import CommentCard from "@/components/dashboard/CommentCart";
import NotFoundProudct from "@/components/dashboard/NotFoundProudct";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  deletedComment,
  updateComment,
} from "@/services/commentService/commentDel";
// import { deletedComment, updateComment } from "@/services/commentService";
import { IComments } from "@/types/comments";
import { MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CommentsProps {
  postComments: IComments[];
}

const Comments: React.FC<CommentsProps> = ({ postComments }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id: string) => {
    const confirmed = toast("Are you sure you want to delete this comment?");

    if (!confirmed) return;

    try {
      const res = await deletedComment(id);

      if (res?.success) {
        toast.success("Comment deleted successfully");
      } else {
        toast.error(res?.message || "Failed to delete comment");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting");
    }
  };
  const handleEdit = async (id: string, commentText: string) => {
    try {
      const res = await updateComment(id, commentText);

      if (res?.success) {
        toast.success("Comment updated successfully");
      } else {
        toast.error(res?.message || "Failed to update comment");
      }
    } catch (error) {
      toast.error("Something went wrong while updating");
    }
  };

  const filteredComments: IComments[] =
    postComments?.filter((comment: IComments) =>
      comment.commentText?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Comments Moderation</h1>
          <p className="text-muted-foreground">
            Review and moderate user comments.
          </p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search comments..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="All">
          <TabsList>
            <TabsTrigger value="All" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              All
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {filteredComments.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="All" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  id={comment.id}
                  user={comment.user}
                  content={comment.commentText}
                  postTitle={comment.post?.title}
                  createdAt={comment.createdAt.toString()}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>

            {filteredComments.length === 0 && (
              <NotFoundProudct
                title="No comments found"
                details="There are no comment posts yet"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Comments;
