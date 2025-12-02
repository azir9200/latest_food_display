"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IComments } from "@/types/comments";



interface IUserData {
  comments: IComments[];
}

const CommentsTab: React.FC<{ userData: IUserData }> = ({ userData }) => {
  console.log(userData, "sdfjsdf");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {userData?.comments.map((comment) => (
            <li
              key={comment.id}
              className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
            >
              <p className="text-sm text-gray-500">
                On:{" "}
                <a
                  href="#"
                  className="font-medium text-streetgrub-darkblue hover:text-streetgrub-orange"
                >
                  {comment?.post?.title}
                </a>
              </p>
              <p className="mt-1 text-gray-600 line-clamp-2">
                {comment?.commentText}
              </p>
              <p className="text-xs text-gray-500 mt-1">{comment?.createdAt}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CommentsTab;
