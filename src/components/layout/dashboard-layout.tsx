import { SidebarProvider } from '@/components/ui/sidebar';
import __helpers from '@/helpers';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen  ">
      <SidebarProvider defaultOpen={true}>
        <main className="w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
}
