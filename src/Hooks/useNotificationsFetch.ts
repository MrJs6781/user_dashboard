import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchNotificationData = (languageId?: number) => {
  const fetchData = async () => {
    // گرفتن توکن از کوکی
    const getToken = Cookies.get("authToken");

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

    let data = await response.text();

    // حذف تمامی کاراکترهای اینتر و خط جدید از رشته
    const cleanedData = data.replace(/(\r\n|\n|\r)/gm, ""); // حذف تمامی اینترها و کاراکترهای خط جدید
    const jsonData = JSON.parse(cleanedData); // تبدیل رشته به JSON

    return jsonData;
  };

  return useQuery({ queryKey: ["getNotificationData"], queryFn: fetchData });
};
