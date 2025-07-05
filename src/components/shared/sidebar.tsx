// 'use client';
// import DashboardNav from '@/components/shared/dashboard-nav';
// import { navItems } from '@/constants/data';
// import { navItemsCollaborator } from '@/constants/data';
// import { useSidebar } from '@/hooks/use-sidebar';
// import { cn } from '@/lib/utils';
// import { ChevronsLeft } from 'lucide-react';
// import { useState } from 'react';
// import Logo from '@/assets/Logo2.png';
// import __helpers from '@/helpers';
// type SidebarProps = {
//   className?: string;
// };

// export default function Sidebar({ className }: SidebarProps) {
//   const { isMinimized, toggle } = useSidebar();
//   const [status, setStatus] = useState(false);
//   const token = __helpers.cookie_get('AT');
//   let navItem: any = [];
//   if (token) {
//     const userDetail = __helpers.decodeToken(token);
//     navItem = userDetail?.role === 'ADMIN' ? navItems : navItemsCollaborator;
//     const path = window.location.pathname;

//     if (path === '/') {
//       if (userDetail?.role === 'ADMIN') {
//         window.location.href = '/dashboard-admin';
//       } else {
//         window.location.href = '/subject';
//       }
//     }
//   } else {
//     window.location.href = '/login';
//   }

//   const handleToggle = () => {
//     setStatus(true);
//     toggle();
//     setTimeout(() => setStatus(false), 500);
//   };
//   return (
//     <nav
//       className={cn(
//         `fixed z-10 hidden h-screen  px-3 md:block`,
//         status && 'duration-500',
//         !isMinimized ? 'w-72' : 'w-[80px]',
//         className
//       )}
//     >
//       <div
//         className={cn(
//           'flex items-center px-0 pt-5 md:px-2',
//           isMinimized ? 'justify-center ' : 'justify-between'
//         )}
//       >
//         {!isMinimized && (
//           <h1 className="flex items-center text-2xl font-bold">
//             <img src={Logo} alt="logo" className="h-12 w-12" />
//           </h1>
//         )}
//         <ChevronsLeft
//           className={cn(
//             'size-8 cursor-pointer rounded-full border bg-background text-foreground',
//             isMinimized && 'rotate-180'
//           )}
//           onClick={handleToggle}
//         />
//       </div>
//       <div className="space-y-4 pt-2">
//         <div className="px-2 py-2">
//           <div className="mt-3 space-y-1">
//             <DashboardNav items={navItem} />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
