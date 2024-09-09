import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";

import { useTranslation } from "react-i18next";

interface ProfileUserProps {
  username: string;
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

export default function ProfileUser({ username }: ProfileUserProps) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="w-[120px] cursor-pointer flex items-center justify-between px-2 border h-[28px]">
          <span className="flex items-center justify-start gap-2">
            <FaUserTie className="text-[20px] w-[14px] h-[14px]" />
            <p className="text-[14px] font-semibold">{username}</p>
          </span>
          <FaAngleDown className="text-[10px]" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] flex flex-col items-start gap-2 px-4">
        {profileUserData.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="w-full flex items-center justify-between px-2 cursor-pointer"
          >
            <Link
              to={item.link}
              className="flex items-center justify-between w-full"
            >
              {item.icon}
              <p className="font-vazirB text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#09203F] to-[#000]">
                {t(item.title)}
              </p>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
