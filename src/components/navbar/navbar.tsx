"use client";

import { MENU } from "~/lib/data/constants";
import { MenuItem } from "./menu-item";
import Image from "next/image";
import Logo from "../logo";
import type { User } from "~/server/db/schema";

interface NavbarProps {
  user: User | undefined;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <div className=" fixed z-50 w-full bg-neutral-100 p-2 pb-0">
      <div className=" w-full rounded-full border-b bg-white p-4 pl-8">
        <div className="flex w-full items-center justify-between">
          <Logo className=" mr-8" />
          <div className=" hidden w-full flex-1 gap-x-2 overflow-x-scroll [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden ">
            {MENU.map((menu, index) => (
              <MenuItem
                key={index}
                label={menu.label}
                href={menu.href}
                icon={menu.icon}
              />
            ))}
          </div>

          <div className="flex">
            <div className=" relative aspect-square h-10 overflow-hidden rounded-full">
              <Image
                src={user?.image ?? ""}
                alt={user?.name ?? ""}
                fill
                className=" object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
