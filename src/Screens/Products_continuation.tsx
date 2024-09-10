import { DatePickerWithRange } from "@/components/DatePickerWithJalaliRange";
import Header from "@/components/Header";
import LottiePlayer from "@/components/Loading";
import RenewCart from "@/components/RenewCart";
import RenewTable from "@/components/RenewTable";
import { Button } from "@/components/ui/button";
import { useFetchDashboardData } from "@/Hooks/useFetchDashboardData";
import { useFetchRenew } from "@/Hooks/useFetchRenew";
import { useFetchUserProducts } from "@/Hooks/useFetchUserProducts";
import { cn } from "@/lib/utils";
import { UserProductResponse } from "@/types/UserProducts";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { useMutation } from "@tanstack/react-query";
import { UserRenewQuery } from "@/types/Renew";
import dayjs from "dayjs";

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

export default function Products_continuation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userProductsData, setUserProductsData] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isActiveService, setIsActiveService] = useState("Data");
  const [date, setDate] = useState<DateRange | undefined>();
  const [userRenewDataTable, setUserRenewDataTable] = useState([]);

  const [perPage, setPerPage] = useState(50);
  const [currentItems, setCurrentItems] = useState([]);

  const { isLoading: fetchedDataLoading, data: fetchedData } =
    useFetchDashboardData();
  const { isLoading: userProductsLoading, data: userProducts } =
    useFetchUserProducts({
      languageId: +window.localStorage.getItem("ssss_language_id")!,
    });
  const { isLoading: userRenewLoading, data: userRenew } = useFetchRenew(
    +window.localStorage.getItem("ssss_language_id")!,
    perPage,
    1
  );
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [renewTableHeader, setRenewTableHeader]: any = useState([]);
  const [renewTableHeaderName, setRenewTableHeaderName]: any = useState([]);
  const [userProductsHeader, setUserProductsHeader]: any = useState([]);
  const [TotalDataCount, setTotalDataCount] = useState(0);

  const [TotalPageCount, setTotalPageCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [languageID, setLanguageID] = useState("1");

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language_id")) {
      setLanguageID(window.localStorage.getItem("ssss_language_id")!);
    }
  }, []);

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
    if (userProducts) {
      // console.log(userProducts)
      if (userProducts.Status == 0) {
        let arr: any = [];
        userProducts?.Title.split(",")?.map((renewData: string, i: number) => {
          if (renewData.length > 0) {
            const object = {
              name: userProducts?.Name.split(",")[i],
              title: renewData,
            };
            arr.push(object);
          }
        });
        setUserProductsHeader(arr);
        setUserProductsData(userProducts.Data);
      } else if (userProducts.Status == "-103") {
        Cookies.remove("authToken");
        localStorage.removeItem("UserID");
        navigate("/");
        toast.error(userProducts.Message);
      } else {
        toast.error(userProducts.Message);
      }
    }
  }, [userProducts]);

  useEffect(() => {
    if (userRenew) {
      if (userRenew.Status == 0) {
        setCurrentItems(userRenew?.Data);
        setTotalDataCount(userRenew?.TotalDataCount);
        setTotalPageCount(userRenew?.TotalPageCount);
        let arr: any = [];
        let arr2: any = [];

        userRenew?.Title.split(",")?.map((renewData: string, index: number) => {
          if (renewData.length > 0) {
            arr2.push(userRenew?.Name.split(",")[index]);
            arr.push(renewData);
          }
        });
        setRenewTableHeader(arr);
        setRenewTableHeaderName(arr2);
        setUserRenewDataTable(userRenew.Data);
      }
    }
  }, [userRenew]);

  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const changeSearchProductHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value);
  };

  const searchProductsList = () => {
    setIsShowLoading(true);
    if (date != undefined) {
      const getFromDate = dayjs(date?.from)
        .calendar("jalali")
        .format("YYYY/MM/DD");
      const getToDate = dayjs(date?.to).calendar("jalali").format("YYYY/MM/DD");
      mutation.mutate({
        FromDate: getFromDate,
        ToDate: getToDate,
        Query: searchValue,
        Operand: "%",
        PageNo: "0",
        RowPerPage: "0",
        SortIndex: 0,
      });
    } else {
      mutation.mutate({
        Query: searchValue,
        Operand: "%",
        PageNo: "0",
        RowPerPage: "0",
        SortIndex: 0,
      });
    }
  };

  const mutation = useMutation({
    mutationKey: ["renewFetchWithQuery"],
    mutationFn: async (MutateData: UserRenewQuery) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}User/Renew/Fetch?Type=User`,
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
        setUserRenewDataTable(data?.Data);
        setTotalDataCount(data?.TotalDataCount);
      } else if (data.Status == "-103") {
        toast.info(data.Message);
        setTimeout(() => {
          Cookies.remove("authToken");
          localStorage.removeItem("UserID");
          navigate("/");
        }, 1000);
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

  const searchProductsData = () => {
    setIsShowLoading(true);
    productMutation.mutate({
      Query: searchProduct,
      Operand: "%",
      PageNo: "0",
      RowPerPage: "0",
      SortIndex: 1,
    });
  };

  const productMutation = useMutation({
    mutationKey: ["productFilterWithQuery"],
    mutationFn: async (MutateData: UserRenewQuery) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}Product/Fetch?Type=User`,
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
        setUserProductsData(data?.Data);
      } else if (data.Status == "-103") {
        toast.info(data.Message);
        setTimeout(() => {
          Cookies.remove("authToken");
          localStorage.removeItem("UserID");
          navigate("/");
        }, 1000);
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
      <Header
        username={fetchedData?.Data[0]?.UserName}
        titleName={fetchedData?.Data[0]?.Title}
      />
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        breakpoints={{
          1800: {
            slidesPerView: 6.2,
            spaceBetween: 15,
          },
          1700: {
            slidesPerView: 5.7,
            spaceBetween: 15,
          },
          1600: {
            slidesPerView: 5.5,
            spaceBetween: 15,
          },
          1500: {
            slidesPerView: 5.1,
            spaceBetween: 15,
          },
          1400: {
            slidesPerView: 4.7,
            spaceBetween: 15,
          },
          1300: {
            slidesPerView: 4.3,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 3.9,
            spaceBetween: 15,
          },
          1100: {
            slidesPerView: 3.5,
            spaceBetween: 15,
          },
          920: {
            slidesPerView: 3.1,
            spaceBetween: 15,
          },
          740: {
            slidesPerView: 2.5,
            spaceBetween: 15,
          },
          565: {
            slidesPerView: 2.1,
            spaceBetween: 15,
          },
          425: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          0: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
        }}
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
                <p className="font-vazirB text-[12px] sm:text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
                  {t(item.title)} :{" "}
                </p>
                {item.id == 1 && (
                  <small
                    className={cn(
                      "font-vazirB text-[13px] sm:text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]",
                      languageID == "1" ? "" : "font-robotoB"
                    )}
                  >
                    {fetchedData?.Data[0]?.RemainedTime} {t("Day")}
                  </small>
                )}
                {item.id == 2 && (
                  <small
                    className={cn(
                      "font-vazirB text-[13px] sm:text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]",
                      languageID == "1" ? "" : "font-robotoB"
                    )}
                  >
                    {fetchedData?.Data[0]?.RemainedTraffic}
                  </small>
                )}
                {item.id == 3 && (
                  <small
                    className={cn(
                      "font-vazirB text-[13px] sm:text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]",
                      languageID == "1" ? "" : "font-robotoB"
                    )}
                  >
                    {fetchedData?.Data[0]?.WalletRemained}
                  </small>
                )}
                {/* {item.id == 4 && (
                <small className={cn("font-vazirB text-[13px] sm:text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]" , languageID == "1" ? "" : "")}font-robotoB>
                  {fetchedData?.Data[0]?.RemainedTime}
                </small>
              )} */}
                {item.id == 5 && (
                  <small
                    className={cn(
                      "font-vazirB text-[13px] sm:text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]",
                      languageID == "1" ? "" : "font-robotoB"
                    )}
                    style={{ direction: "ltr" }}
                  >
                    {fetchedData?.Data[0]?.CreationTime
                      ? fetchedData?.Data[0]?.CreationTime
                      : ""}
                  </small>
                )}
                {item.id == 6 && (
                  <small
                    className={cn(
                      "font-vazirB text-[13px] sm:text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]",
                      languageID == "1" ? "" : "font-robotoB"
                    )}
                    style={{ direction: "ltr" }}
                  >
                    {fetchedData?.Data[0]?.FirstLogin
                      ? fetchedData?.Data[0]?.FirstLogin
                      : "_"}
                  </small>
                )}
                {item.id == 7 && (
                  <small
                    className={cn(
                      "font-vazirB text-[13px] sm:text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]",
                      languageID == "1" ? "" : "font-robotoB"
                    )}
                    style={{ direction: "ltr" }}
                  >
                    {fetchedData?.Data[0]?.ExpirationTime
                      ? fetchedData?.Data[0]?.ExpirationTime
                      : "_"}
                  </small>
                )}
                {item.id == 8 && (
                  <small
                    className={cn(
                      "font-vazirB text-[13px] sm:text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]",
                      languageID == "1" ? "" : "font-robotoB"
                    )}
                  >
                    {fetchedData?.Data[0]?.OnlineCount
                      ? fetchedData?.Data[0]?.OnlineCount
                      : 0}
                  </small>
                )}
                {item.id == 9 && (
                  <small
                    className={cn(
                      "font-vazirB text-[13px] sm:text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]",
                      languageID == "1" ? "" : "font-robotoB"
                    )}
                  >
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
      <div className="w-full h-auto mt-8 flex flex-col items-start gap-5 px-6 overflow-y-hidden">
        <div className="w-full flex items-center justify-center gap-8 flex-col sm:flex-row">
          <h5
            className={cn(
              "font-vazirB text-[15px] cursor-pointer",
              isActiveService == "Chart"
                ? "opacity-70"
                : "border-2 p-4 dark:border-white border-black"
            )}
            onClick={() => setIsActiveService("Data")}
          >
            {t("RenewService")}
          </h5>
          <h5
            className={cn(
              "font-vazirB text-[15px] cursor-pointer",
              isActiveService == "Data"
                ? "opacity-70"
                : "border-2 p-4 dark:border-white border-black"
            )}
            onClick={() => setIsActiveService("Chart")}
          >
            {t("LastRenewList")}
          </h5>
        </div>
        {isActiveService == "Data" ? (
          <>
            <div className="w-full flex items-center justify-start gap-4 flex-wrap">
              <span className="w-full max-w-[400px] h-[56px] flex items-center justify-between border px-4 rounded-[12px] outline-none">
                <input
                  type="text"
                  placeholder={t("whatAreYouLookingFor")}
                  value={searchProduct}
                  onChange={(e) => changeSearchProductHandler(e)}
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
                className="bg-[#a855f7] dark:bg-[#1e293b] text-white text-[17px]"
                size="lg"
                onClick={searchProductsData}
              >
                {t("Search")}
              </Button>
            </div>
            {fetchedDataLoading ||
            userProductsLoading ||
            userRenewLoading ||
            isShowLoading ? (
              <LottiePlayer />
            ) : (
              <>
                {userProductsData && userProductsData.length > 0 ? (
                  <ul className="flex items-start justify-start gap-6 flex-wrap mt-4 w-full">
                    {userProductsData &&
                      userProductsData?.map(
                        (item: UserProductResponse, i: number) => (
                          <RenewCart
                            key={i}
                            data={item}
                            index={i + 1}
                            headerData={userProductsHeader}
                          />
                        )
                      )}
                  </ul>
                ) : (
                  <div className="w-full h-[40vh] flex items-center justify-center">
                    <h5 className="text-[15px] sm:text-[18px] font-vazirM">
                      {t("CantFindData")}
                    </h5>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div className="w-full flex items-center justify-start gap-6 flex-wrap">
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
              <DatePickerWithRange date={date} setDate={setDate} />
              <Button
                className="bg-[#a855f7] dark:bg-[#1e293b] text-white text-[17px]"
                size="lg"
                onClick={searchProductsList}
              >
                {t("Search")}
              </Button>
            </div>
            {fetchedDataLoading ||
            userProductsLoading ||
            userRenewLoading ||
            isShowLoading ? (
              <LottiePlayer />
            ) : (
              <div className="w-full flex items-center justify-center overflow-x-scroll min-w-[1200px] flex-col">
                {userRenewDataTable && userRenewDataTable?.length > 0 && (
                  <>
                    <RenewTable
                      data={currentItems}
                      headerData={renewTableHeader}
                      headerDataName={renewTableHeaderName}
                    />
                    <PaginationComponent
                      perPage={perPage}
                      setCurrentItems={setCurrentItems}
                      setPerPage={setPerPage}
                      TotalDataCount={TotalDataCount}
                      TotalPageCount={TotalPageCount}
                      setIsShowLoading={setIsShowLoading}
                      setTotalPageCount={setTotalPageCount}
                      activePage={activePage}
                      setActivePage={setActivePage}
                      domainInput="User/Renew/Fetch?Type=User"
                    />
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
      {userRenewDataTable &&
        userRenewDataTable?.length == 0 &&
        fetchedDataLoading == false &&
        userProductsLoading == false &&
        userRenewLoading == false &&
        isShowLoading == false && (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <h5 className="text-[15px] sm:text-[18px] font-vazirM">
              {t("CantFindData")}
            </h5>
          </div>
        )}
    </div>
  );
}
