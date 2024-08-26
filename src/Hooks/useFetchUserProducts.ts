import { UserProducts } from "@/types/UserProducts";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useFetchUserProducts = ({
  Operand,
  PageNo,
  Query,
  RowPerPage,
  SortIndex,
  languageId
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
      languageId
    };

    const response = await fetch(
      "http://test.cloudius.co/Product/Fetch?Type=User",
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

  return useQuery({ queryKey: ["getUserProductsData"], queryFn: fetchData });
};
