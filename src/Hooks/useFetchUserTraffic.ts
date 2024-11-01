import { UserProducts } from "@/types/UserProducts";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchUserTraffic = ({
  Operand,
  PageNo,
  Query,
  RowPerPage,
  SortIndex,
  languageId,
  ProductType
}: UserProducts) => {
  const fetchData = async () => {
    // گرفتن توکن از کوکی
    const getToken = Cookies.get("authToken"); // تابع getCookie را خودتان پیاده‌سازی کنید

    // console.log(token);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken}`);

    const RequestBody = {
      Operand,
      PageNo,
      Query,
      RowPerPage,
      SortIndex,
      languageId,
      ProductType,
    };

    const response = await fetch(
      `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}Product/Fetch?Type=User`,
      {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify(RequestBody),
      }
    );
    const data = response.json();
    return data;
  };

  return useQuery({ queryKey: ["getUserTrafficData"], queryFn: fetchData });
};
