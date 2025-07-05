import __helpers from '@/helpers';
import { Header } from './header';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-screen  ">
      <Header />
      <main className="w-full">{children}</main>
    </div>
  );
}
