// import { navItems } from '@/constants/data';
// import { usePathname } from '@/routes/hooks';
// import Heading from './heading';

// // Custom hook to find the matched path
// const useMatchedPath = (pathname: string) => {
//   for (const section of navItems) {
//     for (const item of section.items) {
//       if (item.href === pathname) {
//         return item.title;
//       } else if (pathname.startsWith(item.href + '/') && item.href !== '/') {
//         return item.title;
//       }
//     }
//   }
//   return '';
// };

// export default function Header() {
//   const pathname = usePathname();
//   const headingText = useMatchedPath(pathname);

//   return (
//     <div className="flex flex-1 items-center justify-between bg-secondary px-4">
//       <Heading title={headingText} />
//       {/* Uncomment when needed */}
//       {/* <div className="ml-4 flex items-center md:ml-6">
//         <UserNav />
//         <ModeToggle />
//       </div> */}
//     </div>
//   );
// }
