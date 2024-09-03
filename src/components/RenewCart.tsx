import { UserProductResponse } from "@/types/UserProducts";
import { UserRenewAdd } from "@/types/Renew";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface RenewCartProps {
  data: UserProductResponse;
  index: number;
  headerData: { name: string; title: string }[];
}

export default function RenewCart({ data, index, headerData }: RenewCartProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [findImageUrlIndex, setFindImageUrlIndex] = useState(0);

  useEffect(() => {
    const find = headerData?.findIndex((item) => item.name == "ImageUrl");
    setFindImageUrlIndex(find);
  }, []);

  const handleSubmit = () => {
    mutation.mutate({
      ProductID: `${data.ProductID}`,
      Description: "",
    });
  };

  const mutation = useMutation({
    mutationKey: ["renewAdd"],
    mutationFn: async (MutateData: UserRenewAdd) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        "http://test.cloudius.co/User/Renew/Add?Type=User",
        {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
          body: JSON.stringify(MutateData),
        }
      );
      const ResponseData = response.json();
      return ResponseData;
    },
    onSuccess: (data: any) => {
      console.log(data);
      if (data.Status == "0") {
        toast.success(data.Message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (data.Status == "-103") {
        toast.info(data.Message);
        setTimeout(() => {
          Cookies.remove("authToken");
          localStorage.removeItem("UserID");
          navigate("/");
        }, 1000);
      } else {
        toast.error(data.Message);
      }
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return (
    <div
      className="w-full sm:max-w-[280px] md:max-w-[350px] flex flex-col items-start gap-4 rounded-[12px] border fade_in_animation"
      style={
        {
          "--i": index + 1, // تعیین مقدار --i برای هر آیتم
        } as React.CSSProperties
      }
    >
      <img
        src={
          (data as any)[findImageUrlIndex]
            ? (data as any)[findImageUrlIndex]
            : "/public/product_image.jpg"
        }
        alt="Image"
        className="w-full h-full max-h-[150px] object-cover bg-no-repeat rounded-tr-[12px] rounded-tl-[12px]"
      />
      <ul className="w-full h-full flex flex-col items-start gap-4 px-2 pb-4">
        {headerData?.map(({ name, title }, i) => {
          if (name != "ImageUrl") {
            return (
              <li
                key={i}
                className="flex items-center gap-2 text-[15px] font-vazirM gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]"
              >
                {title} :{" "}
                <h5 className="gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]">
                  {(data as any)[name]}
                </h5>
              </li>
            );
          }
        })}
      </ul>
      <button
        className="w-[95%] mx-auto mb-4 rounded-[12px] h-[50px] flex items-center justify-center outline-none cursor-pointer border-none bg-[#a855f7] dark:bg-[#1e293b]"
        onClick={handleSubmit}
      >
        <p className="text-[15px] font-vazirB text-white">{t("Renew")}</p>
      </button>
    </div>
  );
}
