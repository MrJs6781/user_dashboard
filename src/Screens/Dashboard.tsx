import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useFetchDashboardData } from "@/Hooks/useFetchDashboardData";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ResponseData } from "@/types/Dashboard";

const dashboardBoxes = [
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
        className="lucide lucide-repeat-2"
      >
        <path d="m2 9 3-3 3 3" />
        <path d="M13 18H7a2 2 0 0 1-2-2V6" />
        <path d="m22 15-3 3-3-3" />
        <path d="M11 6h6a2 2 0 0 1 2 2v10" />
      </svg>
    ),
    title: "تعداد روزهای باقیمانده",
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
        className="lucide lucide-download"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    ),
    title: "مقدار حجم باقیمانده",
  },
  {
    id: 3,
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
        className="lucide lucide-wallet-cards"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
        <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
      </svg>
    ),
    title: "موجودی کیف پول",
  },
  // {
  //   id: 4,
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       className="lucide lucide-user"
  //     >
  //       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
  //       <circle cx="12" cy="7" r="4" />
  //     </svg>
  //   ),
  //   title: "تعداد کاربران زیر مجموعه",
  // },
  {
    id: 5,
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
        className="lucide lucide-calendar"
      >
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
    title: "تاریخ ساخت",
  },
  {
    id: 6,
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
        className="lucide lucide-check"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
    title: "زمان اولین اتصال",
  },
  {
    id: 7,
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
        className="lucide lucide-ban"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m4.9 4.9 14.2 14.2" />
      </svg>
    ),
    title: "تاریخ انقضا",
  },
  {
    id: 8,
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
        className="lucide lucide-users"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "تعداد آنلاین با این کاربری",
  },
  {
    id: 9,
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
        className="lucide lucide-truck"
      >
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    ),
    title: "کاربر حجمی",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<ResponseData>();

  const { data: fetchedData, isLoading: loadingDashboardData } =
    useFetchDashboardData();

  useEffect(() => {
    if (fetchedData) {
      console.log(fetchedData);
      if (fetchedData.Status == 0) {
        setDashboardData(fetchedData);
      } else if (fetchedData.Status == "-103") {
        Cookies.remove("authToken");
        localStorage.clear();
        navigate("/");
        toast.error(fetchedData.Message);
      } else {
        toast.error(fetchedData.Message);
      }
    }
  }, [fetchedData]);

  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col items-start"
      style={{ direction: "rtl" }}
    >
      <Header dashboardData={dashboardData?.Data[0]} />
      <ul className="w-full auto_grid items-center justify-start gap-4 sm:gap-6 mt-6 px-6">
        {dashboardBoxes?.map((item) => (
          <li
            key={item.id}
            className="w-full h-[65px] flex items-start justify-start p-4 rounded-[8px] shadow-xl dark:border gap-3"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {item.icon}
            <span className="flex flex-col items-start gap-1">
              <p className="font-vazirB text-[10px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#09203F] to-[#000]">
                {item.title} :{" "}
              </p>
              {item.id == 1 && (
                <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                  {fetchedData?.Data[0]?.RemainedTime} روز
                </small>
              )}
              {item.id == 2 && (
                <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                  {fetchedData?.Data[0]?.RemainedTraffic}
                </small>
              )}
              {item.id == 3 && (
                <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                  {fetchedData?.Data[0]?.WalletRemained} تومان
                </small>
              )}
              {/* {item.id == 4 && (
                <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                  {fetchedData?.Data[0]?.RemainedTime}
                </small>
              )} */}
              {item.id == 5 && (
                <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                  {fetchedData?.Data[0]?.CreationTime
                    ? fetchedData?.Data[0]?.CreationTime
                    : ""}
                </small>
              )}
              {item.id == 6 && (
                <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                  {fetchedData?.Data[0]?.FirstLogin
                    ? fetchedData?.Data[0]?.FirstLogin
                    : "مشخص نیست"}
                </small>
              )}
              {item.id == 7 && (
                <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                  {fetchedData?.Data[0]?.ExpirationTime
                    ? fetchedData?.Data[0]?.ExpirationTime
                    : "ندارد"}
                </small>
              )}
              {item.id == 8 && (
                <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                  {fetchedData?.Data[0]?.OnlineCount
                    ? fetchedData?.Data[0]?.OnlineCount
                    : "ندارد"}
                </small>
              )}
              {item.id == 9 && (
                <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                  {fetchedData?.Data[0]?.IsTrafficBase == true
                    ? "میباشد"
                    : "نمیباشد"}
                </small>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
