"use client";

import type { Icon } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useActiveMenu from "~/hooks/use-active-menu";
import { cn } from "~/lib/utils";

interface MenuItemProps {
  label: string;
  href: string;
  icon: Icon;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label,
  href,
  icon: Icon,
}) => {
  const pathname = usePathname();

  const active = useActiveMenu(pathname, href);

  return (
    <Link
      href={href}
      className={cn(
        " flex items-center gap-x-1 self-auto rounded-lg px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-100",
        {
          "text-neutral-800": active,
        },
      )}
    >
      <Icon size={20} />
      {label}
    </Link>
  );
};

export const MenuItemMobile: React.FC<MenuItemProps> = ({
  label,
  href,
  icon: Icon,
}) => {
  const pathname = usePathname();

  const active = useActiveMenu(pathname, href);

  return (
    <Link
      href={href}
      className={cn(
        " flex flex-1 flex-col items-center justify-center  py-2 text-xs font-medium text-neutral-500 hover:bg-neutral-100",
        { "border-b-2 border-b-violet-700 text-neutral-900": active },
      )}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
};
