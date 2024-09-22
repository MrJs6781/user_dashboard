import { DatePickerWithRange } from "@/components/DatePickerWithJalaliRange";
import Header from "@/components/Header";
import LottiePlayer from "@/components/Loading";
import TrafficTable from "@/components/TrafficTable";
import { Button } from "@/components/ui/button";
import { useFetchTrafficData } from "@/Hooks/useFetchTrafficData";
import { cn } from "@/lib/utils";
import { TrafficQuery, UserTrafficQuery } from "@/types/Traffic";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useTranslation } from "react-i18next";
import PaginationComponent from "@/components/PaginationComponent";
import { DatePickerWithRangeMiladi } from "@/components/DatePickerWithRange";
import { useFetchDashboardDataSlider } from "@/Hooks/useFetchDashboardDataSlider";
import { UserProductResponse } from "@/types/UserProducts";
import RenewCart from "@/components/RenewCart";
import { useCategoryFetch } from "@/Hooks/useFetchCategory";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRenewProductQuery } from "@/types/Renew";
import { useFetchUserTraffic } from "@/Hooks/useFetchUserTraffic";

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
    title: "RemainedTime",
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
    title: "RemainedTraffic",
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
    title: "WalletRemained",
  },
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
    title: "CreationTime",
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
    title: "FirstLogin",
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
    title: "ExpirePeriodDesc",
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
    title: "OnlineCount",
  },
];

export default function Trafic() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [trafficDataTable, setTrafficDataTable] = useState([]);
  const [date, setDate] = useState<DateRange | undefined>();
  const [justActiveState, setJustActiveState] = useState(true);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [trafficTableHeader, setTrafficTableHeader] = useState([]);
  const [trafficTableHeaderName, setTrafficTableHeaderName] = useState([]);

  const [TotalDataCount, setTotalDataCount] = useState(0);
  const [TotalPageCount, setTotalPageCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [currentItems, setCurrentItems] = useState([]);
  const [languageID, setLanguageID] = useState("1");
  const [listSliderBox, setListSliderBox] = useState([]);
  const [dateMiladi, setDateMiladi] = useState<DateRange | undefined>();

  const [isActiveService, setIsActiveService] = useState("Data");
  const [searchTraffic, setSearchTraffic] = useState("");
  const [userTrafficHeader, setUserTrafficHeader]: any = useState([]);
  const [userTrafficData, setUserTrafficData] = useState([]);

  const [userProductType, setUserProductType] = useState("");
  const [categoryData, setCategoryData] = useState<any>([]);
  const [allCategoryData, setAllCategoryData] = useState<any>([]);

  const { data: fetchedData, isLoading: fetchedDataLoading } =
    useFetchDashboardDataSlider(
      +window.localStorage.getItem("ssss_language_id")!
    );
  const { data: trafficData, isLoading: trafficDataLoading } =
    useFetchTrafficData(
      +window.localStorage.getItem("ssss_language_id")!,
      perPage,
      1
    );
  const { isLoading: userTrafficLoading, data: userTraffic } =
    useFetchUserTraffic({
      languageId: +window.localStorage.getItem("ssss_language_id")!,
    });
  const { data: fetchCategoryData } = useCategoryFetch(
    +window.localStorage.getItem("ssss_language_id")!,
    "t"
  );

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language_id")) {
      setLanguageID(window.localStorage.getItem("ssss_language_id")!);
    }
  }, []);

  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.Status == 0) {
        const NameData = fetchedData?.Name?.split(",");
        const TitleData = fetchedData?.Title?.split(",");
        let arr: any = [];

        dashboardBoxes.map((itemBox) => {
          const findIndexInName = NameData?.findIndex(
            (item: any) => item == itemBox.title
          );
          arr.push(TitleData[findIndexInName]);
        });
        setListSliderBox(arr);
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
    if (trafficData) {
      if (trafficData.Status == 0) {
        setCurrentItems(trafficData?.Data);
        setTotalDataCount(trafficData?.TotalDataCount);
        setTotalPageCount(trafficData?.TotalPageCount);
        let arr: any = [];
        let arr2: any = [];

        trafficData?.Title.split(",")?.map((data: string, index: number) => {
          if (data.length > 0) {
            arr2.push(trafficData?.Name.split(",")[index]);
            arr.push(data);
          }
        });
        setTrafficTableHeader(arr);
        setTrafficTableHeaderName(arr2);
        setTrafficDataTable(trafficData.Data);
      } else {
        toast.error(trafficData.Message);
      }
    }
  }, [trafficData]);

  useEffect(() => {
    if (userTraffic) {
      if (userTraffic.Status == 0) {
        // console.log(userTraffic)
        let arr: any = [];
        userTraffic?.Title.split(",")?.map((renewData: string, i: number) => {
          if (renewData.length > 0) {
            const object = {
              name: userTraffic?.Name.split(",")[i],
              title: renewData,
            };
            arr.push(object);
          }
        });
        setUserTrafficHeader(arr);
        setUserTrafficData(userTraffic.Data);
      } else if (userTraffic.Status == "-103") {
        Cookies.remove("authToken");
        localStorage.removeItem("UserID");
        navigate("/");
        toast.error(userTraffic.Message);
      } else {
        toast.error(userTraffic.Message);
      }
    }
  }, [userTraffic]);

  useEffect(() => {
    if (fetchCategoryData) {
      if (fetchCategoryData.Status == 0) {
        let arr: any = [];
        let arr2: any = [];
        fetchCategoryData?.Data?.map((item: any) => {
          if (item.Title && item.Title.length > 0) {
            arr.push(item.Title);
            arr2.push(item);
          }
        });
        setCategoryData(arr);
        setAllCategoryData(arr2);
      } else if (fetchCategoryData.Status == "-103") {
        Cookies.remove("authToken");
        localStorage.removeItem("UserID");
        navigate("/");
        toast.error(fetchCategoryData.Message);
      } else {
        toast.error(fetchCategoryData.Message);
      }
    }
  }, [fetchCategoryData]);

  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const searchProductsList = () => {
    setIsShowLoading(true);
    if (languageID == "1") {
      if (date != undefined) {
        const getFromDate = dayjs(date?.from)
          .calendar("jalali")
          .format("YYYY/MM/DD");
        const getToDate = dayjs(date?.to)
          .calendar("jalali")
          .format("YYYY/MM/DD");
        mutation.mutate({
          FromDate: getFromDate,
          ToDate: getToDate,
          Query: searchValue,
          Operand: "%",
          PageNo: `${activePage}`,
          RowPerPage: `${perPage}`,
          SortIndex: 0,
          languageID: window.localStorage.getItem("ssss_language_id")!,
        });
      } else {
        mutation.mutate({
          Query: searchValue,
          Operand: "%",
          PageNo: `${activePage}`,
          RowPerPage: `${perPage}`,
          SortIndex: 0,
          languageID: window.localStorage.getItem("ssss_language_id")!,
        });
      }
    } else {
      if (dateMiladi != undefined) {
        const getFromDate = dayjs(dateMiladi?.from).format("YYYY/MM/DD");
        const getToDate = dayjs(dateMiladi?.to).format("YYYY/MM/DD");
        mutation.mutate({
          FromDate: getFromDate,
          ToDate: getToDate,
          Query: searchValue,
          Operand: "%",
          PageNo: `${activePage}`,
          RowPerPage: `${perPage}`,
          SortIndex: 0,
          languageID: window.localStorage.getItem("ssss_language_id")!,
        });
      } else {
        mutation.mutate({
          Query: searchValue,
          Operand: "%",
          PageNo: `${activePage}`,
          RowPerPage: `${perPage}`,
          SortIndex: 0,
          languageID: window.localStorage.getItem("ssss_language_id")!,
        });
      }
    }
  };

  const mutation = useMutation({
    mutationKey: ["trafficWithQuery"],
    mutationFn: async (MutateData: TrafficQuery) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        `${
          import.meta.env.VITE_WEB_SERVICE_DOMAIN
        }User/Traffic/Fetch?Type=User`,
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
        setCurrentItems(data?.Data);
        setTrafficDataTable(data?.Data);
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

  const changeSearchTrafficHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTraffic(e.target.value);
  };

  const searchTrafficData = () => {
    setIsShowLoading(true);
    productMutation.mutate({
      Query: searchTraffic,
      Operand: "%",
      PageNo: `${activePage}`,
      RowPerPage: `${perPage}`,
      SortIndex: 1,
      LanguageID: window.localStorage.getItem("ssss_language_id")!,
    });
  };

  const productMutation = useMutation({
    mutationKey: ["productFilterWithQuery"],
    mutationFn: async (MutateData: UserTrafficQuery) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        `${
          import.meta.env.VITE_WEB_SERVICE_DOMAIN
        }User/Traffic/Fetch?Type=User`,
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
        setUserTrafficData(data?.Data);
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

  const changeSelectHandler = (event: string) => {
    setUserProductType(event);
    setIsShowLoading(true);
    setUserProductType(event);
    const findItem = allCategoryData.find((item: any) => item.Title == event);
    if (event == "All") {
      TrafficMutation.mutate({
        Query: "",
        Operand: "%",
        ProductType: "t",
        PageNo: `${activePage}`,
        RowPerPage: `${perPage}`,
        SortIndex: 1,
        languageID: window.localStorage.getItem("ssss_language_id")!,
      });
    } else {
      TrafficMutation.mutate({
        Query: "",
        Operand: "%",
        ProductType: "t",
        CategoryID: findItem?.CategoryID,
        PageNo: `${activePage}`,
        RowPerPage: `${perPage}`,
        SortIndex: 1,
        languageID: window.localStorage.getItem("ssss_language_id")!,
      });
    }
  };

  const TrafficMutation = useMutation({
    mutationKey: ["productFilterWithQuery"],
    mutationFn: async (MutateData: UserRenewProductQuery) => {
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
        // console.log(data);
        setUserTrafficData(data?.Data);
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
                  {listSliderBox[index]} :{" "}
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
      <div className="w-full flex items-center justify-center gap-8 flex-col sm:flex-row mt-6">
        <h5
          className={cn(
            "font-vazirB text-[15px] cursor-pointer",
            isActiveService == "Chart"
              ? "opacity-70"
              : "border-2 p-4 dark:border-white border-black"
          )}
          onClick={() => setIsActiveService("Data")}
        >
          {t("TrafficService")}
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
          {t("LastTrafficList")}
        </h5>
      </div>
      {isActiveService == "Data" ? (
        <section className="w-[98%] mx-auto flex flex-col items-start gap-4 p-4 pt-8">
          <div className="w-full mx-auto flex items-center justify-start gap-4 flex-wrap">
            <Select
              value={userProductType}
              onValueChange={(event) => changeSelectHandler(event)}
              dir={languageID == "1" ? "rtl" : "ltr"}
            >
              <SelectTrigger className="w-[180px] h-[56px] font-vazirM focus:ring-0 focus:ring-opacity-0">
                <SelectValue placeholder={t("FilterBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="font-vazirM" value="All">
                  {t("All")}
                </SelectItem>
                {categoryData?.map((item: string, i: number) => (
                  <SelectItem className="font-vazirM" value={item} key={i}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="w-full max-w-[400px] h-[56px] flex items-center justify-between border px-4 rounded-[12px] outline-none">
              <input
                type="text"
                placeholder={t("whatAreYouLookingFor")}
                value={searchTraffic}
                onChange={(e) => changeSearchTrafficHandler(e)}
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
              onClick={searchTrafficData}
            >
              {t("Search")}
            </Button>
          </div>
          {fetchedDataLoading ||
          trafficDataLoading ||
          userTrafficLoading ||
          isShowLoading ? (
            <LottiePlayer />
          ) : (
            <>
              {userTrafficData && userTrafficData.length > 0 ? (
                <ul className="flex items-start justify-start gap-6 flex-wrap w-full mx-auto mt-8">
                  {userTrafficData &&
                    userTrafficData?.map(
                      (item: UserProductResponse, i: number) => (
                        <RenewCart
                          key={i}
                          data={item}
                          index={i + 1}
                          headerData={userTrafficHeader}
                          isTraffic={true}
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
        </section>
      ) : (
        <div className="w-full h-auto flex flex-col items-start gap-5 px-6 overflow-y-hidden pt-8 p-4">
          <div className="w-full flex items-center justify-start gap-6 flex-wrap">
            <span className="w-fit flex items-center justify-start gap-2">
              <Checkbox
                checked={justActiveState}
                onCheckedChange={() => {
                  setJustActiveState(!justActiveState);
                }}
                id="terms1"
              />
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("DisplayOnlyActive")}
              </label>
            </span>
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
            {languageID == "1" ? (
              <DatePickerWithRange date={date} setDate={setDate} />
            ) : (
              <DatePickerWithRangeMiladi
                date={dateMiladi}
                setDate={setDateMiladi}
              />
            )}
            <Button
              className="bg-[#a855f7] dark:bg-[#1e293b] text-white md:text-[17px]"
              onClick={searchProductsList}
              size="lg"
            >
              {t("Search")}
            </Button>
          </div>
          {fetchedDataLoading || trafficDataLoading || isShowLoading ? (
            <LottiePlayer />
          ) : (
            <div
              className="w-full flex items-center justify-center overflow-x-scroll min-w-[800px] flex-col"
              style={{ scrollbarWidth: "none" }}
            >
              <>
                {trafficDataTable?.length > 0 && (
                  <>
                    <TrafficTable
                      data={currentItems}
                      headerData={trafficTableHeader}
                      headerDataName={trafficTableHeaderName}
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
                      date={languageID == "1" ? date : dateMiladi}
                      Query={searchValue}
                      domainInput="User/Traffic/Fetch?Type=User"
                    />
                  </>
                )}
                {trafficDataTable?.length == 0 &&
                  fetchedDataLoading == false &&
                  trafficDataLoading == false &&
                  isShowLoading == false && (
                    <div className="w-full h-[50vh] flex items-center justify-center">
                      <h5 className="text-[15px] sm:text-[18px] font-vazirM">
                        {t("CantFindData")}
                      </h5>
                    </div>
                  )}
              </>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
