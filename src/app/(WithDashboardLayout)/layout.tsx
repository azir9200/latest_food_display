import AdminHeader from "@/components/adminLayout/AdminHeader";
import AdminSidebar from "@/components/adminLayout/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="hidden md:block w-[196px]">
          <AdminSidebar />
        </div>
        <div className="flex-1 w-full">
          <AdminHeader />
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
