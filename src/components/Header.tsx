import React from "react";

import { AiOutlineDashboard } from "react-icons/ai";
import { FaChartLine } from "react-icons/fa6";
import { BiSolidSave } from "react-icons/bi";
import { TbMobiledata } from "react-icons/tb";
import { LiaRandomSolid } from "react-icons/lia";
import { FaEdit } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { ModeToggle } from "./mode-toggle";
import { BiMessageSquareDetail } from "react-icons/bi";
import ProfileUser from "./ProfileUser";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type headerListType = {
  id: number;
  icon: React.ReactNode;
  title: string;
  link?: string;
};

const headerListData = [
  {
    id: 1,
    icon: (
      <AiOutlineDashboard className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    ),
    link: "/dashboard",
    title: "داشبورد",
  },
  {
    id: 2,
    icon: (
      <FaChartLine className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    ),
    link: "/products_continuation",
    title: "تمدید",
  },
  {
    id: 3,
    icon: (
      <BiSolidSave className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    ),
    link: "/trafic",
    title: "ترافیک",
  },
  {
    id: 4,
    icon: (
      <TbMobiledata className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    ),
    link: "/micro_consumption",
    title: "ریزمصرف",
  },
  {
    id: 5,
    icon: (
      <LiaRandomSolid className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    ),
    link: "/connection_history",
    title: "سابقه اتصال",
  },
  {
    id: 6,
    icon: (
      <FaEdit className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    ),
    link: "/error_report",
    title: "گزارش خطا",
  },
  {
    id: 7,
    icon: (
      <FaChartBar className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    ),
    link: "/cardex_traffic",
    title: "کاردکس ترافیک",
  },
  {
    id: 8,
    icon: (
      <FaChartBar className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    ),
    link: "/cardex_financial",
    title: "کاردکس مالی",
  },
  {
    id: 9,
    icon: (
      <FaPowerOff className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    ),
    title: "خروج",
  },
];

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logOutHandler = () => {
    Cookies.remove("authToken");
    localStorage.removeItem('UserID');
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div
      className="w-full flex items-center justify-between px-6 h-[60px] dark:border-b-[#eeeeee50] dark:border-b fixed top-0 z-20 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      }}
    >
      <span className="w-[50px] flex lg:hidden items-center justify-start">
        <Sheet>
          <SheetTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-align-justify"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </SheetTrigger>
          <SheetContent style={{ direction: "rtl" }}>
            <SheetHeader>
              <ul className="w-full flex flex-col items-start gap-6 mt-8">
                {headerListData.map((item: headerListType) => {
                  if (item.link) {
                    return (
                      <Link
                        key={item.id}
                        to={item.link}
                        className="flex items-center gap-2 cursor-pointer h-full border-b w-full pb-2"
                      >
                        {item.icon}
                        <p className="text-[13px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
                          {item.title}
                        </p>
                      </Link>
                    );
                  } else {
                    return (
                      <li
                        key={item.id}
                        className="flex items-center gap-2 cursor-pointer h-full"
                        onClick={logOutHandler}
                      >
                        {item.icon}
                        <p className="text-[13px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
                          {item.title}
                        </p>
                      </li>
                    );
                  }
                })}
              </ul>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </span>
      <ul className="w-fit h-full hidden lg:flex items-center justify-start gap-6 list-none">
        {headerListData.map((item: headerListType) => {
          if (item.link) {
            return (
              <Link
                key={item.id}
                to={item.link}
                className={cn("flex items-center gap-2 cursor-pointer")}
              >
                {item.icon}
                <p
                  className={cn(
                    "text-[14px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]",
                    pathname == item.link
                      ? "text-[15px] font-vazirB dark:from-[#ffffff] dark:to-[#ffffff] from-[#000000] to-[#000000] border-b-4 border-black dark:border-white"
                      : ""
                  )}
                >
                  {item.title}
                </p>
              </Link>
            );
          } else {
            return (
              <li
                key={item.id}
                className="flex items-center gap-2 cursor-pointer h-full"
                onClick={logOutHandler}
              >
                {item.icon}
                <p className="text-[14px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
                  {item.title}
                </p>
              </li>
            );
          }
        })}
      </ul>
      <span className="flex items-center gap-4">
        <BiMessageSquareDetail className="cursor-pointer text-[20px]" />
        <ModeToggle />
        <ProfileUser />
      </span>
    </div>
  );
}
