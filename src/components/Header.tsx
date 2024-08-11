import React from "react";

import { AiOutlineDashboard } from "react-icons/ai";
import { FaChartLine } from "react-icons/fa6";
import { BiSolidSave } from "react-icons/bi";
import { TbMobiledata } from "react-icons/tb";
import { LiaRandomSolid } from "react-icons/lia";
import { FaEdit, FaRegUserCircle } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { ModeToggle } from "./mode-toggle";
import { BiMessageSquareDetail } from "react-icons/bi";

type headerListType = {
  id: number;
  icon: React.ReactNode;
  title: string;
};

const headerListData = [
  {
    id: 1,
    icon: (
      <AiOutlineDashboard className="text-[18px] h-[20px] text-[#00000095] dark:text-[#ffffff]" />
    ),
    title: "داشبورد",
  },
  {
    id: 2,
    icon: (
      <FaChartLine className="text-[18px] h-[20px] text-[#00000095] dark:text-[#ffffff]" />
    ),
    title: "تمدید",
  },
  {
    id: 3,
    icon: (
      <BiSolidSave className="text-[18px] h-[20px] text-[#00000095] dark:text-[#ffffff]" />
    ),
    title: "اعتبار حجمی",
  },
  {
    id: 4,
    icon: (
      <TbMobiledata className="text-[18px] h-[20px] text-[#00000095] dark:text-[#ffffff]" />
    ),
    title: "ریزمصرف",
  },
  {
    id: 5,
    icon: (
      <LiaRandomSolid className="text-[18px] h-[20px] text-[#00000095] dark:text-[#ffffff]" />
    ),
    title: "سابقه اتصال",
  },
  {
    id: 6,
    icon: (
      <FaEdit className="text-[18px] h-[20px] text-[#00000095] dark:text-[#ffffff]" />
    ),
    title: "گزارش خطا",
  },
  {
    id: 7,
    icon: (
      <FaChartBar className="text-[18px] h-[20px] text-[#00000095] dark:text-[#ffffff]" />
    ),
    title: "کاردکس",
  },
  {
    id: 8,
    icon: (
      <FaPowerOff className="text-[18px] h-[20px] text-[#00000095] dark:text-[#ffffff]" />
    ),
    title: "خروج",
  },
];

export default function Header() {
  return (
    <div className="w-full flex items-center justify-between px-6 h-[60px] shadow-xl rounded-br-[15px] rouded-bl-[15px] dark:border-b-[#eeeeee50] dark:border-b">
      <ul className="w-fit flex items-center justify-start gap-4 list-none">
        {headerListData.map((item: headerListType) => (
          <li key={item.id} className="flex items-center gap-2 cursor-pointer">
            {item.icon}
            <p className="text-[13px] font-vazirM text-[#000000] dark:text-white">
              {item.title}
            </p>
          </li>
        ))}
      </ul>
      <span className="flex items-center gap-4">
        <BiMessageSquareDetail className="cursor-pointer text-[20px]"  />
        <ModeToggle />
        <FaRegUserCircle className="cursor-pointer text-[20px]" />
      </span>
    </div>
  );
}
