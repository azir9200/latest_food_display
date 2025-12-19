// import Users from "@/components/page/Dashboard/Users";

"use client";
import NotFoundProudct from "@/components/dashboard/NotFoundProudct";
import UserTable from "@/components/dashboard/UserTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deletedUser, roleUpdate } from "@/services/userService";
import { IUser, UserRole } from "@/types";
import { Search, ShieldCheck, Star, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DeletedUserTable from "./deletedUserTable";

interface IusersProps {
  users: IUser[];
}
const GetAllDeletedUsers: React.FC<IusersProps> = async ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePremium, setCurrentPagePremium] = useState(1);
  const [currentPageAdmin, setCurrentPageAdmin] = useState(1);
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const usersPerPage = 5;

  const handleDeleteUser = async (id: string) => {
    console.log("handle delete", id);
    const res = await deletedUser(id);
    console.log("delete user", res);
    if (res.success) {
      toast.success("User deleted");
    } else {
      toast.error(`${res.data.meta.constraint}` || "Something is Wrong");
    }
  };

  const handleUpdateRole = async (id: string, role: UserRole) => {
    await roleUpdate(id, role);
    toast.success(`User role updated to ${role}`);
  };

  const filteredUsers: IUser[] = searchQuery
    ? users?.filter(
        (user: IUser) =>
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.name &&
            user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : users;

  const premiumUsers: IUser[] = filteredUsers?.filter((user) => user.isPremium);
  const AdminUsers: IUser[] = filteredUsers?.filter(
    (user) => user.role === "ADMIN"
  );
  const NormalUser: IUser[] = filteredUsers?.filter(
    (user) => user.role === "USER"
  );

  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);
  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const premiumTotalPages = Math.ceil(premiumUsers?.length / usersPerPage) || 1;
  const adminTotalPages = Math.ceil(AdminUsers?.length / usersPerPage) || 1;
  const userTotalPages = Math.ceil(NormalUser?.length / usersPerPage) || 1;
  const paginatedPremium = premiumUsers?.slice(
    (currentPagePremium - 1) * usersPerPage,
    currentPagePremium * usersPerPage
  );
  const paginatedAdmin = AdminUsers?.slice(
    (currentPageAdmin - 1) * usersPerPage,
    currentPageAdmin * usersPerPage
  );
  const paginatedNormal = NormalUser?.slice(
    (currentPageUser - 1) * usersPerPage,
    currentPageUser * usersPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions.
          </p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
              setCurrentPagePremium(1);
              setCurrentPageAdmin(1);
              setCurrentPageUser(1);
            }}
          />
        </div>

        <Tabs defaultValue="all" className="w-[390px] md:w-full">
          <TabsList className="flex w-full overflow-x-auto whitespace-nowrap gap-2 scrollbar-hide">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              All Users
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {filteredUsers?.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              Premium
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {premiumUsers?.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" />
              ADMIN
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {AdminUsers?.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              USER
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {NormalUser?.length}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* All Users Tab with Pagination */}
          <TabsContent value="all" className="mt-6">
            {paginatedUsers?.length > 0 ? (
              <>
                <DeletedUserTable
                  users={paginatedUsers}
                  onDeleteUser={handleDeleteUser}
                  onUpdateRole={handleUpdateRole}
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {(currentPage - 1) * usersPerPage + 1}-
                    {Math.min(currentPage * usersPerPage, filteredUsers.length)}{" "}
                    of {filteredUsers.length}
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <NotFoundProudct
                title="No users found"
                details="Try adjusting your search or filters."
              />
            )}
          </TabsContent>

          {/* Premium Users */}
          <TabsContent value="premium" className="mt-6">
            {paginatedPremium?.length > 0 ? (
              <>
                <UserTable
                  users={paginatedPremium}
                  onDeleteUser={handleDeleteUser}
                  onUpdateRole={handleUpdateRole}
                />
                {premiumUsers?.length > 0 && premiumTotalPages > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {(currentPagePremium - 1) * usersPerPage + 1}-
                      {Math.min(
                        currentPagePremium * usersPerPage,
                        premiumUsers.length
                      )}{" "}
                      of {premiumUsers.length}
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPagePremium((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPagePremium === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: premiumTotalPages }, (_, i) => (
                        <Button
                          key={i + 1}
                          variant={
                            currentPagePremium === i + 1 ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPagePremium(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPagePremium((p) =>
                            Math.min(premiumTotalPages, p + 1)
                          )
                        }
                        disabled={currentPagePremium === premiumTotalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <NotFoundProudct
                title="No premium users"
                details="No users with premium access at the moment."
              />
            )}
          </TabsContent>

          {/* Admin Users */}
          <TabsContent value="admin" className="mt-6">
            {paginatedAdmin?.length > 0 ? (
              <>
                <UserTable
                  users={paginatedAdmin}
                  onDeleteUser={handleDeleteUser}
                  onUpdateRole={handleUpdateRole}
                />
                {AdminUsers?.length > 0 && adminTotalPages > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {(currentPageAdmin - 1) * usersPerPage + 1}-
                      {Math.min(
                        currentPageAdmin * usersPerPage,
                        AdminUsers.length
                      )}{" "}
                      of {AdminUsers.length}
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPageAdmin((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPageAdmin === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: adminTotalPages }, (_, i) => (
                        <Button
                          key={i + 1}
                          variant={
                            currentPageAdmin === i + 1 ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPageAdmin(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPageAdmin((p) =>
                            Math.min(adminTotalPages, p + 1)
                          )
                        }
                        disabled={currentPageAdmin === adminTotalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <NotFoundProudct
                title="No admin users"
                details="No admin roles assigned yet."
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// export default Users;
export default GetAllDeletedUsers;
