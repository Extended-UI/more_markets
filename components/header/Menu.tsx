"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menus } from "@/utils/const";

const Menu: FC = () => {
  const pathname = usePathname();
  const pathNamed = pathname ? pathname : "";

  return (
    <div className="flex space-x-16 text-[16px] mt-5">
      {menus.map((menu) => (
        <Link
          key={menu}
          href={`/${menu.toLowerCase()}`}
          className={`${
            pathNamed.includes(menu.toLowerCase())
              ? "glowing-text-primary !pb-5"
              : ""
          } hover:text-primary`}
        >
          {menu}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
