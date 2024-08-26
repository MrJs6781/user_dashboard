import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    title: "ویرایش پروفایل",
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
    title: "تغییر کلمه عبور",
    link: "/edit_password",
  },
];

export default function ProfileUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaRegUserCircle className="cursor-pointer text-[20px]" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] flex flex-col items-start gap-2">
        {profileUserData.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="w-full flex items-center justify-between px-2 cursor-pointer"
             
          >
            <Link
              to={item.link}
              className="flex items-center justify-between w-full"
            >
              <p className="font-vazirB text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#09203F] to-[#000]">
                {item.title}
              </p>
              {item.icon}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
