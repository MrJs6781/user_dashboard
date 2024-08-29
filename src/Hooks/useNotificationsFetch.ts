import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchNotificationData = (languageId?: number) => {
  const fetchData = async () => {
    // گرفتن توکن از کوکی
    const getToken = Cookies.get("authToken"); // تابع getCookie را خودتان پیاده‌سازی کنید

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken}`);

    const response = await fetch(
      "http://test.cloudius.co/Notification/Fetch?Type=User",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ SortIndex: 1, languageId }),
        redirect: "follow",
      }
    );
    const data = response.text();
    return data;
  };

  return useQuery({ queryKey: ["getNotificationData"], queryFn: fetchData });
};
