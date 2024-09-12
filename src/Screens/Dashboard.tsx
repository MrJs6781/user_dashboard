import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useFetchDashboardData } from "@/Hooks/useFetchDashboardData";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useFetchDashboardConsume } from "@/Hooks/useFetchDashboardConsume";
import ComboChart from "@/components/LineChart";
import LottiePlayer from "@/components/Loading";
import { cn } from "@/lib/utils";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useTranslation } from "react-i18next";

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
  // {
  //   id: 9,
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
  //       className="lucide lucide-truck"
  //     >
  //       <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
  //       <path d="M15 18H9" />
  //       <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
  //       <circle cx="17" cy="18" r="2" />
  //       <circle cx="7" cy="18" r="2" />
  //     </svg>
  //   ),
  //   bg: "",
  //   title: "VolumeUser",
  // },
];

interface DataItem {
  TimeStamp: string;
  Download: string;
  DownloadB: number;
  Upload: string;
  UploadB: number;
  Consume: string;
  ConsumeB: number;
}

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [labels, setLabels] = useState<string[]>([]);
  const [downloadData, setDownloadData] = useState<number[]>([]);
  const [uploadData, setUploadData] = useState<number[]>([]);
  const [totalData, setTotalData] = useState<number[]>([]);
  const [languageID, setLanguageID] = useState("1");
  const [listSliderBox, setListSliderBox] = useState([]);

  const { data: fetchedData, isLoading: fetchedDataLoading } =
    useFetchDashboardData(+window.localStorage.getItem("ssss_language_id")!);
  const { data: consumeData, isLoading: consumeDataLoading } =
    useFetchDashboardConsume(1);

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language_id")) {
      setLanguageID(window.localStorage.getItem("ssss_language_id")!);
    }
  }, []);

  useEffect(() => {
    if (fetchedData) {
      // console.log(fetchedData)
      if (fetchedData.Status == 0) {
        const NameData = fetchedData?.Name?.split(",");
        const TitleData = fetchedData?.Title?.split(",");
        let arr: any = [];

        dashboardBoxes.map((itemBox) => {
          const findIndexInName = NameData?.findIndex(
            (item: any) => item == itemBox.title
          );
          arr.push(TitleData[findIndexInName]);
          // dashboardBoxes[i].title = TitleData[findIndexInName];
        });
        // console.log(arr)
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
    // console.log(consumeData);
    const parsedLabels = consumeData?.Data?.map(
      (item: DataItem) => item.TimeStamp
    );
    const parsedDownloadData = consumeData?.Data?.map((item: DataItem) =>
      convertToMB(item.Download)
    );
    const parsedUploadData = consumeData?.Data?.map((item: DataItem) =>
      convertToMB(item.Upload)
    );
    const parsedConsumeData = consumeData?.Data?.map((item: DataItem) =>
      convertToMB(item.Consume)
    );

    setLabels(parsedLabels);
    setDownloadData(parsedDownloadData);
    setUploadData(parsedUploadData);
    setTotalData(parsedConsumeData);
  }, [consumeData]);

  const convertToMB = (value: string): number => {
    const valueInLowerCase = value.toLowerCase(); // برای یکسان‌سازی حروف بزرگ و کوچک

    if (valueInLowerCase.includes("kb")) {
      return parseFloat(value);
    } else if (valueInLowerCase.includes("mb")) {
      return parseFloat(value) * 1024;
    } else if (valueInLowerCase.includes("gb")) {
      return parseFloat(value) * 1024 * 1024;
    } else if (valueInLowerCase.includes("b")) {
      return parseFloat(value) / 1024;
    } else {
      return 0;
    }
  };

  if (fetchedDataLoading || consumeDataLoading) {
    return (
      <div className="w-full h-screen overflow-auto flex flex-col items-start">
        <Header
          username={fetchedData?.Data[0]?.UserName}
          titleName={fetchedData?.Data[0]?.Title}
        />
        {dashboardBoxes?.length > 0 && totalData?.length > 0 ? (
          <>
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
            <div className="mt-6 w-full flex items-center justify-center flex-col gap-4">
              <ComboChart
                labels={labels}
                data={{
                  download: downloadData,
                  upload: uploadData,
                  total: totalData,
                }}
              />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <LottiePlayer />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-auto flex flex-col items-start">
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
      <div className="mt-6 w-full flex items-center justify-center flex-col gap-4">
        <ComboChart
          labels={labels}
          data={{
            download: downloadData,
            upload: uploadData,
            total: totalData,
          }}
        />
      </div>
    </div>
  );
}
