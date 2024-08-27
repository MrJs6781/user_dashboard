import React, { useEffect } from "react";

import { ModeToggle } from "./mode-toggle";
import { BiMessageSquareDetail } from "react-icons/bi";
import ProfileUser from "./ProfileUser";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { IoLanguage } from "react-icons/io5";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import i18n from "./../../i18n";
import { useTranslation } from "react-i18next";

type headerListType = {
  id: number;
  icon?: React.ReactNode;
  title: string;
  link?: string;
};

const headerListData = [
  {
    id: 1,
    // icon: (
    //   <AiOutlineDashboard className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    // ),
    link: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    // icon: (
    //   <FaChartLine className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    // ),
    link: "/products_continuation",
    title: "Renew",
  },
  {
    id: 3,
    // icon: (
    //   <BiSolidSave className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    // ),
    link: "/trafic",
    title: "Traffic",
  },
  {
    id: 4,
    // icon: (
    //   <TbMobiledata className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    // ),
    link: "/micro_consumption",
    title: "MicroConsumption",
  },
  {
    id: 5,
    // icon: (
    //   <LiaRandomSolid className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    // ),
    link: "/connection_history",
    title: "ConnectionHistory",
  },
  {
    id: 6,
    // icon: (
    //   <FaEdit className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    // ),
    link: "/error_report",
    title: "ErrorReports",
  },
  {
    id: 7,
    // icon: (
    //   <FaChartBar className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    // ),
    link: "/cardex_traffic",
    title: "CardexTraffic",
  },
  {
    id: 8,
    // icon: (
    //   <FaChartBar className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    // ),
    link: "/cardex_financial",
    title: "CardexFinancial",
  },
  {
    id: 9,
    // icon: (
    //   <FaPowerOff className="text-[18px] h-[18px] w-[18px] text-[#00000090] dark:text-[#ffffff]" />
    // ),
    title: "Exit",
  },
];

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const logOutHandler = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("UserID");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language")) {
      const getLang = window.localStorage.getItem("ssss_language")!;
      if (getLang == "en") {
        const getHTML = window.document.getElementById("root_parent");
        getHTML?.style.setProperty("direction", "ltr");
        getHTML?.setAttribute("lang", "en");
        changeLanguage("en");
      } else {
        const getHTML = window.document.getElementById("root_parent");
        getHTML?.style.setProperty("direction", "rtl");
        getHTML?.setAttribute("lang", "fa");
        changeLanguage("fa");
      }
    } else {
      const getHTML = window.document.getElementById("root_parent");
      getHTML?.style.setProperty("direction", "rtl");
      getHTML?.setAttribute("lang", "fa");
      changeLanguage("fa");
    }
  }, []);

  const toggleLanguage = () => {
    if (window.localStorage.getItem("ssss_language")) {
      const getLang = window.localStorage.getItem("ssss_language")!;
      if (getLang == "en") {
        window.localStorage.setItem("ssss_language", "fa");
        window.localStorage.setItem("ssss_language_id", "1");
        const getHTML = window.document.getElementById("root_parent");
        getHTML?.style.setProperty("direction", "rtl");
        getHTML?.setAttribute("lang", "fa");
        changeLanguage("fa");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        window.localStorage.setItem("ssss_language", "en");
        window.localStorage.setItem("ssss_language_id", "0");
        const getHTML = window.document.getElementById("root_parent");
        getHTML?.style.setProperty("direction", "ltr");
        getHTML?.setAttribute("lang", "en");
        changeLanguage("en");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } else {
      window.localStorage.setItem("ssss_language", "en");
      window.localStorage.setItem("ssss_language_id", "0");
      const getHTML = window.document.getElementById("root_parent");
      getHTML?.style.setProperty("direction", "ltr");
      getHTML?.setAttribute("lang", "en");
      changeLanguage("en");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
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
      <span className="w-[50px] flex lg_2:hidden items-center justify-start">
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
          <SheetContent>
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
                          {t(item.title)}
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
                          {t(item.title)}
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
      <ul className="w-fit h-full hidden lg_2:flex items-center justify-start gap-6 list-none">
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
                      ? "text-[15px] font-vazirB dark:from-[#ffffff] dark:to-[#ffffff] from-[#000000] to-[#000000] px-2 py-1 border-b-2 border-purple-600 dark:border-white"
                      : ""
                  )}
                >
                  {t(item.title)}
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
                  {t(item.title)}
                </p>
              </li>
            );
          }
        })}
      </ul>
      <span className="flex items-center gap-4">
        <IoLanguage
          className="cursor-pointer text-[20px]"
          onClick={toggleLanguage}
        />
        <BiMessageSquareDetail className="cursor-pointer text-[20px]" />
        <ModeToggle />
        <ProfileUser />
      </span>
    </div>
  );
}
