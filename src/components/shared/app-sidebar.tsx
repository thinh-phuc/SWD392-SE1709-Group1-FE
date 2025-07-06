'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import { ceoNavItems } from '@/constants/data';
import {
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  User,
  MilkIcon as Cow
} from 'lucide-react';
import { usePathname, useRouter } from '@/routes/hooks';
import { useAuth } from '@/routes/hooks/use.auth';
import { Icons } from '../ui/icons';
import __helpers from '@/helpers';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useGetMyInfo } from '@/queries/user.query';
import LogoPNG from '@/assets/logo.jpg';
export const company = {
  name: 'LiveStock',
  logo: Cow
};

export default function AppSidebar() {
  const { data: session } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const {} = useGetMyInfo();
  const infoUser = useSelector((state: RootState) => state.auth.infoUser);

  const handleLogout = () => {
    __helpers.cookie_delete('AT');
    window.location.href = '/login';
  };
  const role = __helpers.getUserRole();
  const isCEO = role.includes('Giám Đốc');

  const navItems = isCEO ? ceoNavItems : ceoNavItems;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
    >
      <SidebarHeader className=" py-2">
        <div className="flex items-center gap-3 py-2 text-emerald-700 dark:text-emerald-400">
          <div>
            {/* <company.logo className="size-5" /> */}
            <img src={LogoPNG} alt="LiveStock Logo" className="size-8" />
          </div>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate text-lg font-bold">{company.name}</span>
            <span className="truncate text-xs text-emerald-600/80 dark:text-emerald-400/80"></span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden ">
        {navItems.map((parent, index) => (
          <SidebarGroup key={index} className="">
            <SidebarGroupLabel className=" text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {parent.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {parent?.detail.map((item) => {
                const Icon = item.icon ? Icons[item.icon] : Icons.dashboard;
                const isActive = pathname === item.url;

                return item?.items && item?.items?.length > 0 ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={isActive}
                          className={`my-1 rounded-lg transition-all hover:bg-slate-100 dark:hover:bg-slate-800 ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                              : ''
                          }`}
                        >
                          <div
                            className={`mr-3 flex size-5 items-center justify-center rounded-md ${
                              isActive
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            <Icon className="size-4" />
                          </div>
                          <span className="font-medium">{item.title}</span>
                          <ChevronRight
                            className={`ml-auto size-4 transition-transform duration-200 ${
                              isActive
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-400 dark:text-slate-500'
                            } group-data-[state=open]/collapsible:rotate-90`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => {
                            const isSubActive = pathname === subItem.url;
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubActive}
                                  className={`rounded-lg pl-9 transition-all ${
                                    isSubActive
                                      ? 'bg-emerald-50 font-medium text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                                  }`}
                                >
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className={`my-1 rounded-lg transition-all hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                          : ''
                      }`}
                    >
                      <a href={item.url}>
                        <div
                          className={`mr-3 flex size-5 items-center justify-center rounded-md ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200  dark:border-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="rounded-lg hover:bg-slate-100 data-[state=open]:bg-slate-100 dark:hover:bg-slate-800 data-[state=open]:dark:bg-slate-800"
                >
                  <Avatar className="h-10 w-10 rounded-lg border-2 border-white shadow-sm dark:border-slate-800">
                    <AvatarImage
                      src={session?.user?.image || ''}
                      alt={session?.user?.name || ''}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-semibold text-white">
                      {getInitials(infoUser?.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-2 grid flex-1 text-left leading-tight">
                    <span className="truncate font-semibold text-slate-800 dark:text-slate-200">
                      {infoUser?.userName || 'admin'}
                    </span>
                    <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {infoUser?.email || 'admin@livesctock.com'}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-slate-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border border-slate-200 shadow-lg dark:border-slate-700"
                side="bottom"
                align="end"
                sideOffset={6}
              >
                <DropdownMenuItem
                  onClick={() => router.push(`/user-profile`)}
                  className="cursor-pointer gap-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <User size={17} className="text-slate-500" />
                  <span>Thông tin tài khoản</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
                <DropdownMenuItem
                  onClick={() => handleLogout()}
                  className="cursor-pointer gap-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut size={17} />
                  <span>Thoát</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
