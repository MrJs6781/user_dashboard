import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCategoryFetch = (languageId?: number, type?: string) => {
  const fetchData = async () => {
    // گرفتن توکن از کوکی
    const getToken = Cookies.get("authToken"); // تابع getCookie را خودتان پیاده‌سازی کنید

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken}`);

    const response = await fetch(
      `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}Category/Fetch?Type=User`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          languageId,
          ProductType: type,
        }),
        redirect: "follow",
      }
    );
    const data = response.json();
    return data;
  };

  return useQuery({ queryKey: ["getCategoryFetch"], queryFn: fetchData });
};
