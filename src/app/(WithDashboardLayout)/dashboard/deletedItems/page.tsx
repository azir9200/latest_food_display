import GetAllDeletedUsers from "@/components/dashboard/deletedItems/DeletedUser/GetAllDeletedUsers";
import Users from "@/components/page/Dashboard/Users";
import { getAllDeletedUsers } from "@/services/DeletedItems";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: " Food Book | Dashboard - Deleted - Items",
  description:
    "Manage and approve submitted posts from users on the Food Book dashboard.",
};

const DeletedUsers = async () => {
  const data = await getAllDeletedUsers();
  const users = data?.data;

  return (
    <div>
      <GetAllDeletedUsers users={users} />
      {/* <Users users={users} /> */}
    </div>
  );
};

export default DeletedUsers;
