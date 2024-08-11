import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useFetchDashboardData = () => {
  const fetchData = async () => {
    // گرفتن توکن از کوکی
    const token = Cookies.get("authToken"); // تابع getCookie را خودتان پیاده‌سازی کنید

    // ساختن درخواست با هدر Authorization
    const response = await axios.post(
      "http://test.cloudius.co/User/Dashboard?Type=User",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

  return useQuery({ queryKey: ["getDashboardData"], queryFn: fetchData });
};
