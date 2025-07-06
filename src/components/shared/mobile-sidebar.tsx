// import DashboardNav from '@/components/shared/dashboard-nav';
// import { Sheet, SheetContent } from '@/components/ui/sheet';
// import { Dispatch, SetStateAction } from 'react';
// import { Link } from 'react-router-dom';
// import Logo from '@/assets/Logo2.png';

// type TMobileSidebarProps = {
//   className?: string;
//   setSidebarOpen: Dispatch<SetStateAction<boolean>>;
//   sidebarOpen: boolean;
// };
// export default function MobileSidebar({
//   setSidebarOpen,
//   sidebarOpen
// }: TMobileSidebarProps) {
//   return (
//     <>
//       <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
//         <SheetContent side="left" className="bg-background !px-0">
//           <div className="space-y-4 py-4">
//             <div className="space-y-4 px-3 py-2">
//               <Link to="/" className="text-2xl font-bold  ">
//                 <img src={Logo} alt="logo" className="w-14" />
//               </Link>
//               <div className="space-y-1 px-2">
//                 <DashboardNav items={navItems} setOpen={setSidebarOpen} />
//               </div>
//             </div>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }
