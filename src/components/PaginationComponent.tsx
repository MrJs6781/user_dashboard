import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import dayjs from "dayjs";

interface updatePaginationProps {
  RowPerPage: number;
  PageNo: number;
  FromDate?: string;
  ToDate?: string;
  Query: string;
  Operand: string;
}

const PaginationComponent: React.FC<{
  perPage: number;
  TotalPageCount: number;
  TotalDataCount: number;
  activePage: number;
  setPerPage: any;
  setCurrentItems: any;
  setIsShowLoading: any;
  setTotalPageCount: any;
  setActivePage: any;
  domainInput: string;
  date: DateRange | undefined;
  Query: string;
}> = ({
  perPage,
  setPerPage,
  setCurrentItems,
  TotalDataCount,
  TotalPageCount,
  setIsShowLoading,
  setTotalPageCount,
  activePage,
  setActivePage,
  domainInput,
  date,
  Query,
}) => {
  const { t } = useTranslation();
  const [length, setLength] = useState<any>([]);
  const [languageID, setLanguageID] = useState("1");

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language_id")) {
      setLanguageID(window.localStorage.getItem("ssss_language_id")!);
    }
  }, []);

  useEffect(() => {
    let arr = [];
    for (let index = 1; index <= TotalPageCount; index++) {
      arr.push(index);
    }
    setLength(arr);
  }, []);

  const changePageHandler = (item: number) => {
    if (languageID == "1") {
      if (date) {
        const getFromDate = dayjs(date?.from)
          .calendar("jalali")
          .format("YYYY/MM/DD");
        const getToDate = dayjs(date?.to)
          .calendar("jalali")
          .format("YYYY/MM/DD");
        mutation.mutate({
          PageNo: item,
          RowPerPage: perPage,
          FromDate: getFromDate,
          ToDate: getToDate,
          Operand: "%",
          Query: Query ? Query : "",
        });
      } else {
        mutation.mutate({
          PageNo: item,
          RowPerPage: perPage,
          Operand: "%",
          Query: Query ? Query : "",
        });
      }
    } else {
      if (date) {
        const getFromDate = dayjs(date?.from).format("YYYY/MM/DD");
        const getToDate = dayjs(date?.to).format("YYYY/MM/DD");
        mutation.mutate({
          PageNo: item,
          RowPerPage: perPage,
          FromDate: getFromDate,
          ToDate: getToDate,
          Operand: "%",
          Query: Query ? Query : "",
        });
      } else {
        mutation.mutate({
          PageNo: item,
          RowPerPage: perPage,
          Operand: "%",
          Query: Query ? Query : "",
        });
      }
    }
  };

  const mutation = useMutation({
    mutationKey: ["consumeWithQuery"],
    mutationFn: async (MutateData: updatePaginationProps) => {
      setIsShowLoading(true);
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}${domainInput}`,
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
        setTotalPageCount(data?.TotalPageCount);
        setPerPage(data?.RowPerPage);
        setActivePage(data?.PageNo);
        let arr = [];
        for (let index = 1; index <= data?.TotalPageCount; index++) {
          arr.push(index);
        }
        setLength(arr);
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

  const chagneSelectHandler = (e: any) => {
    if (languageID == "1") {
      if (date) {
        const getFromDate = dayjs(date?.from)
          .calendar("jalali")
          .format("YYYY/MM/DD");
        const getToDate = dayjs(date?.to)
          .calendar("jalali")
          .format("YYYY/MM/DD");
        mutation.mutate({
          PageNo: 1,
          RowPerPage: +e.target.value,
          FromDate: getFromDate,
          ToDate: getToDate,
          Operand: "%",
          Query: Query ? Query : "",
        });
      } else {
        mutation.mutate({
          PageNo: 1,
          RowPerPage: +e.target.value,
          Operand: "%",
          Query: Query ? Query : "",
        });
      }
    } else {
      if (date) {
        const getFromDate = dayjs(date?.from).format("YYYY/MM/DD");
        const getToDate = dayjs(date?.to).format("YYYY/MM/DD");
        mutation.mutate({
          PageNo: 1,
          RowPerPage: +e.target.value,
          FromDate: getFromDate,
          ToDate: getToDate,
          Operand: "%",
          Query: Query ? Query : "",
        });
      } else {
        mutation.mutate({
          PageNo: 1,
          RowPerPage: +e.target.value,
          Operand: "%",
          Query: Query ? Query : "",
        });
      }
    }
  };

  return (
    <section className="w-full flex items-center justify-center mt-4 gap-4 flex-wrap">
      <div className="flex items-center justify-center gap-4">
        <p
          className={cn("font-vazirM", languageID == "1" ? "" : "font-robotoM")}
        >
          {t("AllData")} : {TotalDataCount}
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <p className="font-vazirM">{t("DisplayTheNumberOnThePage")}</p>
        <select
          name="row_per_page"
          id="row_per_page"
          className={cn(
            "w-[100px] h-[35px] font-semibold font-vazirM border-2 rounded-md outline-none cursor-pointer dark:text-black",
            languageID == "1" ? "" : "font-robotoM"
          )}
          value={perPage}
          onChange={(e) => chagneSelectHandler(e)}
        >
          <option
            className="font-semibold cursor-pointer text-[13px]"
            value="50"
          >
            50
          </option>
          <option
            className="font-semibold cursor-pointer text-[13px]"
            value="100"
          >
            100
          </option>
          <option
            className="font-semibold cursor-pointer text-[13px]"
            value="200"
          >
            200
          </option>
          <option
            className="font-semibold cursor-pointer text-[13px]"
            value="500"
          >
            500
          </option>
          <option
            className="font-semibold cursor-pointer text-[13px]"
            value="1000"
          >
            1000
          </option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {length?.map((item: number) => (
            <button
              className={cn(
                "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
                activePage == item
                  ? "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full bg-gray-900 hover:bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  : "dark:bg-white"
              )}
              type="button"
              key={item}
              onClick={() => changePageHandler(item)}
            >
              <span
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-vazirB",
                  languageID == "1" ? "" : "font-robotoB"
                )}
              >
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaginationComponent;
