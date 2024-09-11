import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchErrorReports = (languageId?: number , RowPerPage? : number , PageNo? : number) => {
  const fetchData = async () => {
    // گرفتن توکن از کوکی
    const getToken = Cookies.get("authToken"); // تابع getCookie را خودتان پیاده‌سازی کنید

    // console.log(token);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken}`);

    const response = await fetch(
      `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}User/Log/Fetch?Type=User`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          languageId,
          RowPerPage: RowPerPage ? RowPerPage : 50,
          PageNo: PageNo ? PageNo : 1,
        }),
        redirect: "follow",
      }
    );
    const data = response.json();
    return data;
  };

  return useQuery({ queryKey: ["getErrorReport"], queryFn: fetchData });
};
