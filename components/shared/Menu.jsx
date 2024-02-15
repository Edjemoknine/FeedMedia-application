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
            className={`flex gap-4  my-3 justify-start hover:bg-sky-400 rounded-lg py-2 px-4 ${
              isActive && "bg-sky-400"
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
