"use client";

import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";

const Menu: FC = () => {
  const pathname = usePathname();
  const pathNamed = pathname ? pathname : "";

  return (
    <div className="flex space-x-16 text-[16px] mt-5">
      {/* <Link
        href="/easy-mode"
        className={`${
          pathNamed.includes("/easy-mode") ? "glowing-text-primary !pb-5" : ""
        } hover:text-primary`}
      >
        Easy Mode
      </Link> */}
      <Link
        href="/earn"
        className={`${
          pathNamed.includes("/earn") ? "glowing-text-primary !pb-5" : ""
        } hover:text-primary`}
      >
        Earn
      </Link>
      <Link
        href="/borrow"
        className={`${
          pathNamed.includes("/borrow") ? "glowing-text-secondary !pb-5" : ""
        } hover:text-secondary`}
      >
        Borrow
      </Link>
    </div>
  );
};

export default Menu;
