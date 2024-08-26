import ConnectionHistoryTable from "@/components/ConnectionHistoryTable";
import Header from "@/components/Header";
import LottiePlayer from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useConnectionHistory } from "@/Hooks/useConnectionHistory";
import { useFetchDashboardData } from "@/Hooks/useFetchDashboardData";
import { cn } from "@/lib/utils";
import { ConnectionHistoryWithQuery } from "@/types/ConnectionHistory";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PaginationComponent from "@/components/PaginationComponent";

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

export default function ConnectionHistory() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [connectionHistoryData, setConnectionHistoryData] = useState([]);
  const [connectionHistoryTableHeader , setConnectionHistoryTableHeader] = useState([]);
  const [perPage , setPerPage] = useState(10);
  const [currentItems , setCurrentItems] = useState([]);

  const { data: fetchedData, isLoading: fetchedDataLoading } =
    useFetchDashboardData();
  const { data: connectionHistory, isLoading: connectionHistoryLoading } =
    useConnectionHistory(1);

  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.Status == 0) {
      } else if (fetchedData.Status == "-103") {
        Cookies.remove("authToken");
            localStorage.removeItem('UserID');;
        navigate("/");
        toast.error(fetchedData.Message);
      } else {
        toast.error(fetchedData.Message);
      }
    }
  }, [fetchedData]);

  useEffect(() => {
    if (connectionHistory) {
      if (connectionHistory.Status == 0) {
        let arr: any = [];
        connectionHistory?.Title.split(",")?.map((renewData: string) => {
          if (renewData.length > 0) {
            arr.push(renewData);
          }
        });
        setConnectionHistoryTableHeader(arr);
        setConnectionHistoryData(connectionHistory?.Data);
      } else {
        toast.error(connectionHistory.Message);
      }
    }
  }, [connectionHistory]);

  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const searchProductsList = () => {
    setIsShowLoading(true);
    mutation.mutate({
      Query: searchValue,
      Operand: "%",
      PageNo: 0,
      RowPerPage: 0,
      SortIndex: 0,
    });
  };

  const mutation = useMutation({
    mutationKey: ["historyWithQuery"],
    mutationFn: async (MutateData: ConnectionHistoryWithQuery) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        "http://test.cloudius.co/User/History/Fetch?Type=User",
        {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
          body: JSON.stringify(MutateData),
        }
      );
      const ResponseData = response.json();
      return ResponseData;
    },
    onSuccess: (data: any) => {
      if (data.Status == "0") {
        setConnectionHistoryData(data?.Data);
      } else {
        toast.error(data.Message);
      }
      setIsShowLoading(false);
    },
    onError: (err: any) => {
      console.log(err);
      setIsShowLoading(false);
    },
  });

  if (fetchedDataLoading || connectionHistoryLoading || isShowLoading) {
    return <LottiePlayer />;
  }

  return (
    <div
      className="w-full h-auto overflow-auto flex flex-col items-start mb-12"
       
    >
      <Header />
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        breakpoints={{
          1000: {
            slidesPerView: 4.5,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          0: {
            slidesPerView: 1.4,
            spaceBetween: 15,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        className="w-full mt-12 px-6 bg-transparent h-[160px]"
      >
        {dashboardBoxes?.map((item, index) => (
          <SwiperSlide
            style={{
              width: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              cursor: "grab",
            }}
            key={item.id}
          >
            <li
              key={item.id}
              className={cn(
                "w-full h-[65px] flex items-start justify-start p-4 rounded-[8px] shadow-xl dark:border gap-3 fade_in_animation"
              )}
              style={
                {
                  backdropFilter: "blur(20px)",
                  "--i": index + 1, // تعیین مقدار --i برای هر آیتم
                } as React.CSSProperties
              } // نوع‌دهی اجباری به عنوان CSSProperties
            >
              {item.icon}
              <span className="flex flex-col items-start gap-1">
                <p className="font-vazirB text-[10px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
                  {item.title} :{" "}
                </p>
                {item.id == 1 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.RemainedTime} روز
                  </small>
                )}
                {item.id == 2 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.RemainedTraffic}
                  </small>
                )}
                {item.id == 3 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.WalletRemained} تومان
                  </small>
                )}
                {/* {item.id == 4 && (
                <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                  {fetchedData?.Data[0]?.RemainedTime}
                </small>
              )} */}
                {item.id == 5 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.CreationTime
                      ? fetchedData?.Data[0]?.CreationTime
                      : ""}
                  </small>
                )}
                {item.id == 6 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.FirstLogin
                      ? fetchedData?.Data[0]?.FirstLogin
                      : "مشخص نیست"}
                  </small>
                )}
                {item.id == 7 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.ExpirationTime
                      ? fetchedData?.Data[0]?.ExpirationTime
                      : "ندارد"}
                  </small>
                )}
                {item.id == 8 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.OnlineCount
                      ? fetchedData?.Data[0]?.OnlineCount
                      : "ندارد"}
                  </small>
                )}
                {item.id == 9 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.IsTrafficBase == true
                      ? "میباشد"
                      : "نمیباشد"}
                  </small>
                )}
              </span>
            </li>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full h-auto mt-6 flex flex-col items-start gap-5 px-6 overflow-y-hidden">
        <div className="w-full flex items-center justify-start gap-6 flex-wrap">
          <span className="w-full max-w-[400px] h-[56px] flex items-center justify-between border px-4 rounded-[12px] outline-none">
            <input
              type="text"
              placeholder="دنبال چی میگردی..."
              value={searchValue}
              onChange={(e) => changeSearchHandler(e)}
              className="w-[90%] h-full border-none outline-none text-[14px] font-semibold bg-transparent placeholder:text-[13px] font-vazirS"
            />
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
              className="lucide lucide-search cursor-pointer"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <Button
            className="bg-[#a855f7] dark:bg-[#1e293b] text-white md:text-[17px]"
            onClick={searchProductsList}
            size="lg"
          >
            جستجو کنید
          </Button>
        </div>
        <div className="w-full flex items-center justify-center overflow-x-scroll min-w-[800px] flex-col">
          <ConnectionHistoryTable data={currentItems} headerData={connectionHistoryTableHeader} />
          <PaginationComponent paginationData={connectionHistoryData} perPage={perPage} setCurrentItems={setCurrentItems} setPerPage={setPerPage} />
        </div>
      </div>
    </div>
  );
}
