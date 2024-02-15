"use client";

import { menuLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <div className="flex bottom-0 z-20 w-full bg-gray-900 px-6 py-3 items-center justify-between md:hidden  ">
      {menuLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`flex gap-2 items-center  hover:bg-sky-400 rounded-lg py-2 px-4 ${
              isActive && "bg-sky-400"
            }`}
          >
            {link.icon}{" "}
            <p className="text-white text-xs sm:hidden hidden">{link.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Footer;
