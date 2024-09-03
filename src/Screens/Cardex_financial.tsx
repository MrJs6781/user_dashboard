import CardexFinancialTable from "@/components/CardexFinancialTable";
import Header from "@/components/Header";
import LottiePlayer from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useCardexFinancial } from "@/Hooks/useCardexFinancial";
import { useFetchDashboardData } from "@/Hooks/useFetchDashboardData";
import { cn } from "@/lib/utils";
import { TrafficFinancialCardexFetchData } from "@/types/Cardex";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useTranslation } from "react-i18next";
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
    bg: "#a3e635",
    title: "NumberOfDaysLeft",
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
    bg: "",
    title: "AmountOfRemainingVolume",
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
    bg: "",
    title: "WalletBalance",
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
    bg: "",
    title: "dateOfManufacture",
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
    bg: "",
    title: "FirstConnectionTime",
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
    bg: "",
    title: "expirationDate",
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
    bg: "",
    title: "OnlineNumberWithThisUser",
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
    bg: "",
    title: "VolumeUser",
  },
];

export default function CardexFinancial() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [cardexTrafficFinancialData, setCardexTrafficFinancialData] = useState(
    []
  );
  const [cardexFinancialType, setCardexFinancialType] = useState("");
  const [cardexFinancialTableHeader, setCardexFinancialTableHeader] = useState(
    []
  );
  const [cardexFinancialTableHeaderName, setCardexFinancialTableHeaderName] =
    useState([]);
  const [TotalDataCount, setTotalDataCount] = useState(0);

  const [perPage, setPerPage] = useState(50);
  const [currentItems, setCurrentItems] = useState([]);

  const { data: fetchedData, isLoading: fetchedDataLoading } =
    useFetchDashboardData();
  const { data: cardexFinancial, isLoading: cardexFinancialLoading } =
    useCardexFinancial(+window.localStorage.getItem("ssss_language_id")!);

  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.Status == 0) {
      } else if (fetchedData.Status == "-103") {
        Cookies.remove("authToken");
        localStorage.removeItem("UserID");
        navigate("/");
        toast.error(fetchedData.Message);
      } else {
        toast.error(fetchedData.Message);
      }
    }
  }, [fetchedData]);

  useEffect(() => {
    if (cardexFinancial) {
      if (cardexFinancial.Status == 0) {
        setTotalDataCount(cardexFinancial?.TotalDataCount);
        let arr: any = [];
        let arr2: any = [];

        cardexFinancial?.Title.split(",")?.map(
          (data: string, index: number) => {
            if (data.length > 0) {
              arr2.push(cardexFinancial?.Name.split(",")[index]);
              arr.push(data);
            }
          }
        );
        setCardexFinancialTableHeader(arr);
        setCardexFinancialTableHeaderName(arr2);
        setCardexTrafficFinancialData(cardexFinancial?.Data);
      } else {
        toast.error(cardexFinancial.Message);
      }
    }
  }, [cardexFinancial]);

  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const searchProductsList = () => {
    setIsShowLoading(true);
    if (cardexFinancialType.length == 0 || cardexFinancialType == "All") {
      mutation.mutate({
        Query: searchValue,
        Operand: "%",
        PageNo: 0,
        RowPerPage: 0,
        SortIndex: 1,
      });
    } else {
      mutation.mutate({
        Type: cardexFinancialType,
        Query: searchValue,
        Operand: "%",
        PageNo: 0,
        RowPerPage: 0,
        SortIndex: 1,
      });
    }
  };

  const mutation = useMutation({
    mutationKey: ["cardexFinancialTrafficWithQuery"],
    mutationFn: async (MutateData: TrafficFinancialCardexFetchData) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        "http://test.cloudius.co/User/Shop/Cardex?Type=User",
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
        setCardexTrafficFinancialData(data?.Data);
        setTotalDataCount(data?.TotalDataCount);
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

  return (
    <div className="w-full h-auto overflow-auto flex flex-col items-start mb-12">
      <Header />
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        breakpoints={{
          1800: {
            slidesPerView: 7,
            spaceBetween: 15,
          },
          1700: {
            slidesPerView: 6.7,
            spaceBetween: 15,
          },
          1600: {
            slidesPerView: 6.3,
            spaceBetween: 15,
          },
          1500: {
            slidesPerView: 5.8,
            spaceBetween: 15,
          },
          1400: {
            slidesPerView: 5.4,
            spaceBetween: 15,
          },
          1300: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 4.6,
            spaceBetween: 15,
          },
          1100: {
            slidesPerView: 4.2,
            spaceBetween: 15,
          },
          920: {
            slidesPerView: 3.5,
            spaceBetween: 15,
          },
          740: {
            slidesPerView: 2.8,
            spaceBetween: 15,
          },
          565: {
            slidesPerView: 2.4,
            spaceBetween: 15,
          },
          425: {
            slidesPerView: 1.8,
            spaceBetween: 15,
          },
          0: {
            slidesPerView: 1.2,
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
                  {t(item.title)} :{" "}
                </p>
                {item.id == 1 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.RemainedTime} {t("Day")}
                  </small>
                )}
                {item.id == 2 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.RemainedTraffic}
                  </small>
                )}
                {item.id == 3 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.WalletRemained}
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
                      : "_"}
                  </small>
                )}
                {item.id == 7 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.ExpirationTime
                      ? fetchedData?.Data[0]?.ExpirationTime
                      : "_"}
                  </small>
                )}
                {item.id == 8 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.OnlineCount
                      ? fetchedData?.Data[0]?.OnlineCount
                      : "_"}
                  </small>
                )}
                {item.id == 9 && (
                  <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                    {fetchedData?.Data[0]?.IsTrafficBase == true
                      ? t("is")
                      : t("isNot")}
                  </small>
                )}
              </span>
            </li>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full h-auto mt-6 flex flex-col items-start gap-5 px-6 overflow-y-hidden">
        <div className="w-full flex items-center justify-start gap-6 flex-wrap">
          <Select
            value={cardexFinancialType}
            onValueChange={setCardexFinancialType}
          >
            <SelectTrigger className="w-[180px] font-vazirM">
              <SelectValue placeholder={t("TransactionType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-vazirM" value="All">
                {t("All")}
              </SelectItem>
              <SelectItem className="font-vazirM" value="W">
                {t("Wallet")}
              </SelectItem>
              <SelectItem className="font-vazirM" value="I">
                {t("Buy")}
              </SelectItem>
              <SelectItem className="font-vazirM" value="X">
                {t("Sell")}
              </SelectItem>
            </SelectContent>
          </Select>
          <span className="w-full max-w-[400px] h-[56px] flex items-center justify-between border px-4 rounded-[12px] outline-none">
            <input
              type="text"
              placeholder={t("whatAreYouLookingFor")}
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
            {t("Search")}
          </Button>
        </div>
        <div className="w-full flex items-center justify-center overflow-x-scroll min-w-[1500px] flex-col">
          {fetchedDataLoading || cardexFinancialLoading || isShowLoading ? (
            <LottiePlayer />
          ) : (
            <>
              {cardexTrafficFinancialData?.length > 0 ? (
                <>
                  <CardexFinancialTable
                    data={currentItems}
                    headerData={cardexFinancialTableHeader}
                    headerDataName={cardexFinancialTableHeaderName}
                  />
                  <PaginationComponent
                    paginationData={cardexTrafficFinancialData}
                    perPage={perPage}
                    setCurrentItems={setCurrentItems}
                    setPerPage={setPerPage}
                    TotalDataCount={TotalDataCount}
                  />
                </>
              ) : (
                <div className="w-full h-[50vh] flex items-center justify-center">
                  <h5 className="text-[15px] sm:text-[18px] font-vazirM">
                    {t("CantFindData")}
                  </h5>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
