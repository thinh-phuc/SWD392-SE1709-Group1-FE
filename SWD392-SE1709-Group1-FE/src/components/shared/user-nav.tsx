// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu';
// import { LogOut } from 'lucide-react';
// import __helpers from '@/helpers';
// import { setInfoUser } from '@/redux/auth.slice';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { Skeleton } from '../ui/skeleton';

// export default function UserNav() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (dataInfoUser) {
//       dispatch(setInfoUser(dataInfoUser));
//     }
//   }, []);
//   const handleLogout = () => {
//     __helpers.cookie_delete('AT');
//     window.location.href = '/login';
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className={`relative h-14 w-14 rounded-full`}>
//           {isPending ? (
//             <Skeleton className="h-10 w-10 rounded-full" />
//           ) : (
//             <Avatar className="h-10 w-10">
//               <AvatarImage
//                 src={
//                   dataInfoUser?.avatar
//                     ? dataInfoUser.avatar
//                     : 'https://ui-avatars.com/api/?name=John+Doe&background=random'
//                 }
//                 alt={''}
//               />
//               <AvatarFallback>Admin</AvatarFallback>
//             </Avatar>
//           )}
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56" align="end" forceMount>
//         <DropdownMenuLabel className="font-normal">
//           <div className="flex flex-col space-y-1">
//             <p className="text-sm font-medium leading-none">{'Admin'}</p>
//             <p className="text-xs leading-none text-muted-foreground">
//               {'admin@gmail.com'}
//             </p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         {/* <DropdownMenuGroup>
//           <DropdownMenuItem>
//             Profile
//             <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             Billing
//             <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             Settings
//             <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//           </DropdownMenuItem>
//           <DropdownMenuItem>New Team</DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator /> */}
//         <DropdownMenuItem onClick={handleLogout}>
//           Log out
//           <DropdownMenuShortcut>
//             <LogOut size={16} />
//           </DropdownMenuShortcut>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
