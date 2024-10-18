import Header from "@/components/Header";
import LottiePlayer from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useFetchTrafficData } from "@/Hooks/useFetchTrafficData";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useTranslation } from "react-i18next";
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
    title: "ExpirationTime",
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

export default function Shop() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [languageID, setLanguageID] = useState("1");

  const [isActiveService, setIsActiveService] = useState("renewalProduct");
  const [userTrafficHeader, setUserTrafficHeader]: any = useState([]);
  const [userTrafficData, setUserTrafficData] = useState([]);

  const [userProductType, setUserProductType] = useState("");
  const [categoryData, setCategoryData] = useState<any>([]);
  const [allCategoryData, setAllCategoryData] = useState<any>([]);

  const [searchBuyProduct, setSearchBuyProduct] = useState("");
  const [searchRenewalProduct, setSearchRenewalProduct] = useState("");
  const [searchTraffic, setSearchTraffic] = useState("");

  const { data: fetchedData, isLoading: fetchedDataLoading } =
    useFetchDashboardDataSlider(
      +window.localStorage.getItem("ssss_language_id")!
    );
  const { isLoading: trafficDataLoading } = useFetchTrafficData(
    +window.localStorage.getItem("ssss_language_id")!,
    1
  );
  const { isLoading: userTrafficLoading, data: userTraffic } =
    useFetchUserTraffic({
      languageId: +window.localStorage.getItem("ssss_language_id")!,
      ProductType: "r",
    });
  const { data: fetchCategoryData } = useCategoryFetch(
    +window.localStorage.getItem("ssss_language_id")!,
    "r"
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
    if (userTraffic) {
      if (userTraffic.Status == 0) {
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

  const changeSearchTrafficHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTraffic(e.target.value);
  };

  const searchTrafficData = () => {
    setIsShowLoading(true);
    TrafficMutation.mutate({
      Query: searchTraffic,
      Operand: "%",
      ProductType: "o",
      SortIndex: 1,
      languageID: window.localStorage.getItem("ssss_language_id")!,
    });
  };

  const changeSelectHandler = (event: string, type: string) => {
    setUserProductType(event);
    setIsShowLoading(true);
    setUserProductType(event);
    const findItem = allCategoryData.find((item: any) => item.Title == event);
    if (event == "All") {
      TrafficMutation.mutate({
        Query: "",
        Operand: "%",
        ProductType: type,
        SortIndex: 1,
        languageID: window.localStorage.getItem("ssss_language_id")!,
      });
    } else {
      TrafficMutation.mutate({
        Query: "",
        Operand: "%",
        ProductType: type,
        CategoryID: findItem?.CategoryID,
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

  const CategoryMutation = useMutation({
    mutationKey: ["getNewCategoryList"],
    mutationFn: async (MutateData: {
      languageId?: string;
      ProductType?: string;
    }) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}Category/Fetch?Type=User`,
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
        // console.log(data)
        let arr: any = [];
        let arr2: any = [];
        data.Data?.map((item: any) => {
          if (item.Title && item.Title.length > 0) {
            arr.push(item.Title);
            arr2.push(item);
          }
        });
        setCategoryData(arr);
        setAllCategoryData(arr2);
        // console.log(data);
        // setUserTrafficData(data?.Data);
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

  const changeTabHandler = (type: string, shopType: string) => {
    setIsShowLoading(true);
    setIsActiveService(type);

    TrafficMutation.mutate({
      Query: "",
      Operand: "%",
      ProductType: shopType,
      SortIndex: 1,
      languageID: window.localStorage.getItem("ssss_language_id")!,
    });

    CategoryMutation.mutate({
      ProductType: shopType,
      languageId: window.localStorage.getItem("ssss_language_id")!,
    });
  };

  const changeSearchBuyProductHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBuyProduct(e.target.value);
  };

  const changeSearchRenewalProductHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchRenewalProduct(e.target.value);
  };

  const searchProductHandler = () => {
    setIsShowLoading(true);
    TrafficMutation.mutate({
      Query: searchBuyProduct,
      Operand: "%",
      ProductType: "t",
      SortIndex: 1,
      languageID: window.localStorage.getItem("ssss_language_id")!,
    });
  };

  const searchRenewalHandler = () => {
    setIsShowLoading(true);
    TrafficMutation.mutate({
      Query: searchRenewalProduct,
      Operand: "%",
      ProductType: "r",
      SortIndex: 1,
      languageID: window.localStorage.getItem("ssss_language_id")!,
    });
  };

  return (
    <div className="w-full h-auto overflow-auto flex flex-col items-start mb-12">
      <Header
        username={fetchedData?.Data[0]?.UserName}
        titleName={fetchedData?.Data[0]?.Title}
      />
      <div className="w-full flex items-center justify-center gap-8 flex-col sm:flex-row mt-24">
        <h5
          className={cn(
            "font-vazirB text-[15px] cursor-pointer",
            isActiveService == "buyProduct"
              ? "border-2 p-4 border-purple-700 rounded-lg"
              : "opacity-70"
          )}
          onClick={() => changeTabHandler("buyProduct", "o")}
        >
          {t("buyProduct")}
        </h5>
        <h5
          className={cn(
            "font-vazirB text-[15px] cursor-pointer",
            isActiveService == "renewalProduct"
              ? "border-2 p-4 border-purple-700 rounded-lg"
              : "opacity-70"
          )}
          onClick={() => changeTabHandler("renewalProduct", "r")}
        >
          {t("renewalProduct")}
        </h5>
        <h5
          className={cn(
            "font-vazirB text-[15px] cursor-pointer",
            isActiveService == "buyTraffic"
              ? "border-2 p-4 border-purple-700 rounded-lg"
              : "opacity-70"
          )}
          onClick={() => changeTabHandler("buyTraffic", "t")}
        >
          {t("buyTraffic")}
        </h5>
      </div>
      {isActiveService == "buyProduct" && (
        <section className="w-[98%] mx-auto flex flex-col items-start gap-4 p-4 pt-8">
          <div className="w-full mx-auto flex items-center justify-start gap-4 flex-wrap">
            <Select
              value={userProductType}
              onValueChange={(event) => changeSelectHandler(event, "t")}
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
                value={searchBuyProduct}
                onChange={(e) => changeSearchBuyProductHandler(e)}
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
              onClick={searchProductHandler}
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
                          isBuyProduct={true}
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
      )}
      {isActiveService == "renewalProduct" && (
        <section className="w-[98%] mx-auto flex flex-col items-start gap-4 p-4 pt-8">
          <div className="w-full mx-auto flex items-center justify-start gap-4 flex-wrap">
            <Select
              value={userProductType}
              onValueChange={(event) => changeSelectHandler(event, "r")}
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
                value={searchRenewalProduct}
                onChange={(e) => changeSearchRenewalProductHandler(e)}
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
              onClick={searchRenewalHandler}
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
      )}
      {isActiveService == "buyTraffic" && (
        <section className="w-[98%] mx-auto flex flex-col items-start gap-4 p-4 pt-8">
          <div className="w-full mx-auto flex items-center justify-start gap-4 flex-wrap">
            <Select
              value={userProductType}
              onValueChange={(event) => changeSelectHandler(event, "o")}
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
      )}
    </div>
  );
}
