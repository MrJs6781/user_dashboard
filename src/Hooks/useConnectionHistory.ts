import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useConnectionHistory = () => {
  const fetchData = async () => {
    // گرفتن توکن از کوکی
    const getToken = Cookies.get("authToken"); // تابع getCookie را خودتان پیاده‌سازی کنید

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken}`);

    const response = await fetch(
      "http://test.cloudius.co/User/History/Fetch?Type=User",
      {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      }
    );
    const data = response.json();
    return data;
  };

  return useQuery({ queryKey: ["getConnectionHistory"], queryFn: fetchData });
};
