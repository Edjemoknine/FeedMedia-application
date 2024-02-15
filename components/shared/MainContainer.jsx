"use client";

import Navbar from "@/components/shared/Navbar";
import { pageTitles } from "@/constant";
import { usePathname } from "next/navigation";

export default function MainContainer({ children }) {
  const pathname = usePathname();
  const regex = /^\/([^\/]+)/;
  const firstPath = pathname.match(regex) ? pathname.match(regex)[0] : pathname;

  const title = pageTitles.find((page) => page.url === firstPath)?.title || "";

  return (
    <section className="flex flex-col flex-1 max-w-3xl px-4 lg:px-4">
      <Navbar />
      <div className="mt-6 mb-20">
        <h1 className="text-xl font-semibold mb-5 text-white sm:text-2xl">
          {title}
        </h1>
        <div className="h-screen overflow-y-scroll custom-scrollbar ">
          {children}
        </div>
      </div>
    </section>
  );
}
