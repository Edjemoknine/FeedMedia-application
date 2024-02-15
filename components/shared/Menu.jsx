"use client";

import { menuLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();
  return (
    <div>
      {menuLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`flex gap-4 items-center  my-2 text-sm justify-start hover:bg-[#2563eb] rounded-lg py-1.5 px-4 ${
              isActive && "bg-[#2563eb]"
            }`}
          >
            {link.icon} <p className="text-white">{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;
