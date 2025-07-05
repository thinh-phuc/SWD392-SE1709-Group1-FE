'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Icons } from '@/components/ui/icons';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/use-sidebar';
import { usePathname } from '@/routes/hooks';
import __helpers from '@/helpers';

interface DashboardNavProps {
  items: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export default function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<number, boolean>
  >({});

  const toggleGroup = (index: number) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!items?.length) return null;

  return (
    <nav className="grid flex-1 items-start gap-2 ">
      <TooltipProvider>
        {items.map((group, groupIndex) => {
          const isGroupCollapsed = collapsedGroups[groupIndex];

          return (
            <div key={groupIndex} className="mb-4 space-y-2">
              <div
                className={cn(
                  'flex items-center justify-between px-2',
                  isMinimized && 'justify-center'
                )}
              >
                {!isMinimized ? (
                  <h4 className="text-xs font-semibold uppercase text-gray-500">
                    {group.title}
                  </h4>
                ) : (
                  __helpers.isMobile() && (
                    <button
                      onClick={() => toggleGroup(groupIndex)}
                      className="flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {isGroupCollapsed ? (
                        <ChevronDown className="size-4" />
                      ) : (
                        <ChevronUp className="size-4" />
                      )}
                    </button>
                  )
                )}
                {!isMinimized && (
                  <button
                    onClick={() => toggleGroup(groupIndex)}
                    className="flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {isGroupCollapsed ? (
                      <ChevronDown className="size-4" />
                    ) : (
                      <ChevronUp className="size-4" />
                    )}
                  </button>
                )}
              </div>

              {!isMinimized && !isGroupCollapsed && (
                <div className="space-y-1">
                  {group.items.map((item, index) => {
                    if (!item.href) return null;
                    const Icon = Icons[item.icon || 'arrowRight'];

                    return (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <Link
                            to={item.disabled ? '/' : item.href}
                            className={cn(
                              'flex items-center gap-2 overflow-hidden rounded-md py-2 pl-4 text-sm font-medium hover:text-muted-foreground',
                              path === item.href
                                ? 'bg-white text-black hover:text-black'
                                : 'transparent',
                              item.disabled && 'cursor-not-allowed opacity-80'
                            )}
                            onClick={() => {
                              if (setOpen) setOpen(false);
                            }}
                          >
                            <Icon className="size-5" />
                            {(isMobileNav ||
                              (!isMinimized && !isMobileNav)) && (
                              <span className="truncate">{item.title}</span>
                            )}
                          </Link>
                        </TooltipTrigger>

                        <TooltipContent
                          align="center"
                          side="right"
                          sideOffset={8}
                          className={!isMinimized ? 'hidden' : 'inline-block'}
                        >
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              )}

              {isMinimized && (
                <>
                  {group.items.map((item, index) => {
                    if (!item.href) return null;
                    const Icon = Icons[item.icon || 'arrowRight'];

                    return (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <Link
                            to={item.disabled ? '/' : item.href}
                            className={cn(
                              'flex items-center gap-2 overflow-hidden rounded-md py-2 pl-2 text-sm font-medium hover:text-muted-foreground',
                              path === item.href
                                ? 'bg-white text-black hover:text-black'
                                : 'transparent',
                              item.disabled && 'cursor-not-allowed opacity-80'
                            )}
                            onClick={() => {
                              if (setOpen) setOpen(false);
                            }}
                          >
                            <Icon className="size-5" />
                            {(isMobileNav ||
                              (!isMinimized && !isMobileNav)) && (
                              <span className="truncate">{item.title}</span>
                            )}
                          </Link>
                        </TooltipTrigger>
                      </Tooltip>
                    );
                  })}
                </>
              )}
            </div>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
