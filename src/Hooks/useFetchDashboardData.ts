import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchDashboardData = (props : number) => {
  const fetchData = async () => {
    // گرفتن توکن از کوکی
    const getToken = Cookies.get("authToken"); // تابع getCookie را خودتان پیاده‌سازی کنید

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getToken}`);

    console.log(props);

    const response = await fetch(
      `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}User/Dashboard?Type=User`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ languageId: props }),
        redirect: "follow",
      }
    );
    const data = response.json();
    return data;
  };

  return useQuery({ queryKey: ["getDashboardData"], queryFn: fetchData });
};
