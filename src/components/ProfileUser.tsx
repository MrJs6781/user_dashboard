import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface ProfileUserProps {
  username: string;
  titleName: string;
}

const profileUserData = [
  {
    id: 1,
    icon: (
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
        className="lucide lucide-user"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "EditProfile",
    link: "/edit_profile",
  },
  {
    id: 2,
    icon: (
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
        className="lucide lucide-lock"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "EditPassword",
    link: "/edit_password",
  },
];

export default function ProfileUser({ username, titleName }: ProfileUserProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [languageID, setLanguageID] = useState("1");

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language_id")) {
      setLanguageID(window.localStorage.getItem("ssss_language_id")!);
    }
  }, []);

  const exitUserHandler = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("UserID");
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="w-fit min-w-[120px] cursor-pointer flex items-center gap-4 justify-between px-2 border h-[28px]">
          <span className="flex items-center justify-start gap-2">
            <FaUserTie className="text-[20px] w-[14px] h-[14px]" />
            <p className="text-[14px] font-semibold">{titleName}</p>
          </span>
          <FaAngleDown className="text-[10px]" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] flex flex-col items-start gap-2 px-4">
        <span
          className="w-full px-2 pb-4 pt-2 flex items-center gap-2 border-b"
          style={
            languageID == "1" ? { direction: "rtl" } : { direction: "ltr" }
          }
        >
          <FaUserTie className="w-[24px] h-[24px]" />
          <p className="text-[14px] font-semibold font-vazirB">
            {t("Username")} : {username}
          </p>
        </span>
        {profileUserData.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="w-full flex items-center justify-between px-2 cursor-pointer"
          >
            <Link
              to={item.link}
              className="flex items-center justify-end w-full"
            >
              <p className="font-vazirB text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#09203F] to-[#000]">
                {t(item.title)}
              </p>
              {item.icon}
            </Link>
          </DropdownMenuItem>
        ))}
        <span
          className="w-full px-2 pb-4 pt-2 flex items-center justify-end gap-2 border-t cursor-pointer"
          onClick={exitUserHandler}
        >
          <p className="text-[14px] font-semibold font-vazirB">{t("Exit")}</p>
          <GiExitDoor className="w-[24px] h-[24px]" />
        </span>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
