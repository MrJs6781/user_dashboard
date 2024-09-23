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
      `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}Notification/Fetch?Type=User`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ languageId }),
        redirect: "follow",
      }
    );

    let data = await response.text();

    const cleanedData = data.replace(/(\r\n|\n|\r)/gm, "\\n")
    const jsonData = JSON.parse(cleanedData);

    return jsonData;
  };

  return useQuery({ queryKey: ["getNotificationData"], queryFn: fetchData });
};
