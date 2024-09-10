import React, { useEffect, useState } from "react";

import { ModeToggle } from "./mode-toggle";
import ProfileUser from "./ProfileUser";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useTranslation } from "react-i18next";
import i18n from "./../../i18n";
import { useFetchNotificationData } from "@/Hooks/useNotificationsFetch";
import LottiePlayer from "./Loading";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IoMdNotificationsOutline } from "react-icons/io";

interface HeaderProps {
  username: string;
  titleName: string;
}

type headerListType = {
  id: number;
  icon?: React.ReactNode;
  title: string;
  link?: string;
};

interface notificaitonType {
  ID: number;
  Title: string;
  Text: string;
}

type ReadNotificationType = {
  NotificationID: string;
};

const headerListData = [
  {
    id: 1,
    link: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    link: "/products_continuation",
    title: "Renew",
  },
  {
    id: 3,
    link: "/trafic",
    title: "Traffic",
  },
  {
    id: 4,
    link: "/micro_consumption",
    title: "MicroConsumption",
  },
  {
    id: 5,
    link: "/connection_history",
    title: "ConnectionHistory",
  },
  {
    id: 6,
    link: "/error_report",
    title: "ErrorReports",
  },
  {
    id: 7,
    link: "/cardex_traffic",
    title: "CardexTraffic",
  },
  {
    id: 8,
    link: "/cardex_financial",
    title: "CardexFinancial",
  },
  {
    id: 8,
    link: "/education",
    title: "Education",
  },
  {
    id: 9,
    title: "Exit",
  },
];

export default function Header({ username , titleName }: HeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: notificationData, isLoading: notificationLoading } =
    useFetchNotificationData(1);
  const [getLanguageId, setLanguageId] = useState("1");
  const [showSingleNotification, setShowSingleNotification] =
    useState<notificaitonType>({ ID: 0, Text: "", Title: "" });
  const [showAllNotification, setShowAllNotification] = useState([]);
  const [languageID, setLanguageID] = useState("1");

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language")) {
      const getLang = window.localStorage.getItem("ssss_language")!;
      setLanguageID(getLang)
      if (getLang == "en") {
        const getHTML = window.document.getElementById("root_parent");
        getHTML?.style.setProperty("direction", "ltr");
        getHTML?.setAttribute("lang", "en");
        changeLanguage("en");
        setLanguageId("0");
      } else {
        const getHTML = window.document.getElementById("root_parent");
        getHTML?.style.setProperty("direction", "rtl");
        getHTML?.setAttribute("lang", "fa");
        changeLanguage("fa");
        setLanguageId("1");
      }
    } else {
      const getHTML = window.document.getElementById("root_parent");
      getHTML?.style.setProperty("direction", "rtl");
      getHTML?.setAttribute("lang", "fa");
      changeLanguage("fa");
      setLanguageId("1");
    }
  }, []);

  useEffect(() => {
    setShowAllNotification(notificationData?.Data);
  }, [notificationData]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const logOutHandler = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("UserID");
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const mutation = useMutation({
    mutationKey: ["ReadNotificaion"],
    mutationFn: async (MutateData: ReadNotificationType) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}Notification/Read?Type=User`,
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
      // console.log(data);
      if (data.Status == "0") {
        showAllNotification.pop()
        // setShowAllNotification(data?.Data);
        // setTotalDataCount(data?.TotalDataCount);
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
      // setIsShowLoading(false);
    },
    onError: (err: any) => {
      console.log(err);
      // setIsShowLoading(false);
    },
  });

  const showNotificationHandler = (notificationInput: notificaitonType) => {
    mutation.mutate({
      NotificationID: `${notificationInput.ID}`,
    });
    setShowSingleNotification(notificationInput);
  };

  const changeOpenHandler = () => {
    setShowSingleNotification({ ID: 0, Text: "", Title: "" });
  };

  return (
    <div
      className="w-full flex items-center justify-between px-6 h-[60px] dark:border-b-[#eeeeee50] border-b dark:border-b fixed top-0 z-20 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      }}
    >
      <span className="w-[50px] flex lg_2:hidden items-center justify-start">
        <Sheet>
          <SheetTrigger>
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
              className="lucide lucide-align-justify"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <ul className="w-full flex flex-col items-start gap-6 mt-8">
                {headerListData.map((item: headerListType) => {
                  if (item.link) {
                    return (
                      <Link
                        key={item.id}
                        to={item.link}
                        className={cn(
                          "flex items-center gap-2 cursor-pointer h-full border-b w-full pb-2 gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]",
                          pathname == item.link
                            ? "text-[17px] font-vazirB dark:from-[#ffffff] dark:to-[#ffffff] from-[#000000] to-[#000000] px-2 py-1 border-b-2 border-purple-600 dark:border-white"
                            : ""
                        )}
                      >
                        {item.icon}
                        <p className="text-[13px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
                          {t(item.title)}
                        </p>
                      </Link>
                    );
                  } else {
                    return (
                      <li
                        key={item.id}
                        className="flex items-center gap-2 cursor-pointer h-full"
                        onClick={logOutHandler}
                      >
                        {item.icon}
                        <p className="text-[13px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
                          {t(item.title)}
                        </p>
                      </li>
                    );
                  }
                })}
              </ul>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </span>
      <ul className="w-fit h-full hidden lg_2:flex items-center justify-start gap-6 list-none">
        {headerListData.map((item: headerListType) => {
          if (item.link) {
            return (
              <Link
                key={item.id}
                to={item.link}
                className={cn("flex items-center gap-2 cursor-pointer")}
              >
                {item.icon}
                <p
                  className={cn(
                    "text-[14px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]",
                    pathname == item.link
                      ? "text-[15px] font-vazirB dark:from-[#ffffff] dark:to-[#ffffff] from-[#000000] to-[#000000] px-2 py-1 border-b-2 border-purple-600 dark:border-white"
                      : ""
                  )}
                >
                  {t(item.title)}
                </p>
              </Link>
            );
          } else {
            return (
              <li
                key={item.id}
                className="flex items-center gap-2 cursor-pointer h-full"
                onClick={logOutHandler}
              >
                {item.icon}
                <p className="text-[16px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]">
                  {t(item.title)}
                </p>
              </li>
            );
          }
        })}
      </ul>
      <span className="flex items-center justify-center h-full gap-4">
        <span className="relative h-[20px]">
          <Dialog onOpenChange={changeOpenHandler}>
            <DialogTrigger>
              <IoMdNotificationsOutline className="cursor-pointer w-[20px] h-[20px] relative" />
              {showAllNotification && showAllNotification.length > 0 && (
                <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center bg-red-500 absolute top-[-10px] right-[-10px]">
                  <p className={cn("text-[12px] font-semibold text-white font-vazirB" , languageID == "1" ? "" : "font-robotoB")}>
                    {notificationData?.Data?.length}
                  </p>
                </span>
              )}
            </DialogTrigger>
            <DialogContent
              style={
                getLanguageId == "1"
                  ? { direction: "rtl" }
                  : { direction: "ltr" }
              }
              className="w-[75%] sm:w-full"
            >
              <DialogHeader>
                <DialogTitle className="w-full flex items-center justify-center">
                  {t("Notifications")}
                </DialogTitle>
                {notificationLoading ? (
                  <LottiePlayer />
                ) : (
                  <DialogDescription>
                    {showSingleNotification.Title.length > 0 ? (
                      <div className="mb-4 grid grid-cols-[0px_1fr] items-start pb-4 last:mb-0 last:pb-0 mt-4">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full" />
                        <div className="space-y-2">
                          <p className="text-[11px] sm:text-[17px] font-medium leading-none w-fit font-vazirB">
                            {showSingleNotification?.Title}
                          </p>
                          <p
                            className="text-[11px] sm:text-sm text-muted-foreground w-fit font-vazirM"
                            style={
                              getLanguageId == "1"
                                ? { textAlign: "right" }
                                : { textAlign: "left" }
                            }
                          >
                            {showSingleNotification?.Text}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {showAllNotification?.map(
                          (notification: notificaitonType, index: number) => (
                            <div
                              key={index}
                              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 mt-4"
                            >
                              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                              <div
                                className="space-y-2 cursor-pointer"
                                onClick={() =>
                                  showNotificationHandler(notification)
                                }
                              >
                                <p className="text-[11px] sm:text-[17px] font-medium leading-none w-fit font-vazirB">
                                  {notification.Title}
                                </p>
                                <p
                                  className="text-[11px] sm:text-sm text-muted-foreground w-fit truncate font-vazirM"
                                  style={
                                    getLanguageId == "1"
                                      ? { textAlign: "right" }
                                      : { textAlign: "left" }
                                  }
                                >
                                  {notification.Text}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </DialogDescription>
                )}
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </span>
        <ModeToggle />
        <ProfileUser username={username} titleName={titleName} />
      </span>
    </div>
  );
}
