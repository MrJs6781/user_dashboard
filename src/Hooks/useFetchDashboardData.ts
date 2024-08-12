import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchDashboardData = () => {
  const fetchData = async () => {
    // گرفتن توکن از کوکی
    const getToken = Cookies.get("authToken"); // تابع getCookie را خودتان پیاده‌سازی کنید

    // console.log(token);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken}`);

    const response = await fetch(
      "http://test.cloudius.co/User/Dashboard?Type=User",
      {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      }
    );
    const data = response.json();
    return data;
  };

  return useQuery({ queryKey: ["getDashboardData"], queryFn: fetchData });
};
