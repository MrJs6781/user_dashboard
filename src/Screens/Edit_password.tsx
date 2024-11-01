import Header from "@/components/Header";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { EditPasswordUser } from "@/types/Profile";
import LottiePlayer from "@/components/Loading";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useFetchDashboardDataSlider } from "@/Hooks/useFetchDashboardDataSlider";

export default function EditPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [languageID, setLanguageID] = useState("1");

  const hidePasswordHandler = () => {
    setIsShowPassword(false);
  };

  const showPasswordHandler = () => {
    setIsShowPassword(true);
  };

  const hideNewPasswordHandler = () => {
    setIsShowNewPassword(false);
  };

  const showNewPasswordHandler = () => {
    setIsShowNewPassword(true);
  };

  const { data: fetchedData, isLoading: fetchedDataLoading } =
    useFetchDashboardDataSlider(
      +window.localStorage.getItem("ssss_language_id")!
    );

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language_id")) {
      setLanguageID(window.localStorage.getItem("ssss_language_id")!);
    }
  }, []);

  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.Status == 0) {
      } else if (fetchedData.Status == "-103") {
        Cookies.remove("authToken");
        localStorage.removeItem("UserID");
        navigate("/");
        toast.error(fetchedData.Message);
      } else {
        toast.error(fetchedData.Message);
      }
    }
  }, [fetchedData]);

  const handleSubmit = () => {
    setIsLoading(true);
    mutation.mutate({
      OldPassword: password,
      Password: newPassword,
      languageID: +window.localStorage.getItem("ssss_language_id")!,
    });
  };

  const mutation = useMutation({
    mutationKey: ["editPasswordKey"],
    mutationFn: async (data: EditPasswordUser) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        `${
          import.meta.env.VITE_WEB_SERVICE_DOMAIN
        }User/ChangePassword?Type=User`,
        {
          method: "POST",
          headers: myHeaders,
          redirect: "follow",
          body: JSON.stringify(data),
        }
      );
      const ResponseData = response.json();
      return ResponseData;
    },
    onSuccess: (data: any) => {
      if (data.Status == "0") {
        toast.success(data.Message);
        setIsLoading(false);
        Cookies.remove("authToken");
        localStorage.removeItem("UserID");
        setTimeout(() => {
          navigate("/");
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
        setIsLoading(false);
      }
    },
    onError: (err: any) => {
      console.log(err);
      setIsLoading(false);
    },
  });

  if (fetchedDataLoading) {
    return <LottiePlayer />;
  }

  return (
    <div className="w-full h-screen overflow-auto flex items-center justify-center dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <Header
        username={fetchedData?.Data[0]?.UserName}
        titleName={fetchedData?.Data[0]?.Title}
      />
      <div
        className="w-[92%] max-w-[380px] min-h-[380px] rounded-[12px] flex items-center justify-between flex-col gap-4 p-6 shadow-xl glass z-30"
        style={{ backdropFilter: "blur(50px)", direction: "ltr" }}
      >
        <form
          action=""
          className="w-full max-w-[380px] flex flex-col items-start gap-4 mt-4"
        >
          <span className="w-full h-[45px] rounded-[20px] border dark:border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder={t("CurrentPassword")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "w-[93%] placeholder:font-vazirB h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirB text-[14px]",
                languageID == "1"
                  ? "placeholder:font-vazirB"
                  : "font-robotoM placeholder:font-robotoB"
              )}
              maxLength={30}
            />
            {password.length > 0 && isShowPassword && (
              <IoEye
                className="dark:text-white text-purple-500 ml-2 text-[22px] cursor-pointer"
                onClick={hidePasswordHandler}
              />
            )}
            {password.length > 0 && !isShowPassword && (
              <IoEyeOffSharp
                className="dark:text-white text-purple-500 ml-2 text-[22px] cursor-pointer"
                onClick={showPasswordHandler}
              />
            )}
            <RiLockPasswordLine className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
          </span>
          <span className="w-full h-[45px] rounded-[20px] border dark:border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type={isShowNewPassword ? "text" : "password"}
              placeholder={t("RepeatPassword")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={cn(
                "w-[93%] placeholder:font-vazirB h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirB text-[14px]",
                languageID == "1"
                  ? "placeholder:font-vazirB"
                  : "font-robotoM placeholder:font-robotoB"
              )}
              maxLength={30}
            />
            {newPassword.length > 0 && isShowNewPassword && (
              <IoEye
                className="dark:text-white text-purple-500 ml-2 text-[22px] cursor-pointer"
                onClick={hideNewPasswordHandler}
              />
            )}
            {newPassword.length > 0 && !isShowNewPassword && (
              <IoEyeOffSharp
                className="dark:text-white text-purple-500 ml-2 text-[22px] cursor-pointer"
                onClick={showNewPasswordHandler}
              />
            )}
            <RiLockPasswordLine className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
          </span>
        </form>
        <button
          className="w-full dark:bg-white bg-purple-600 outline-none border-none rounded-[20px] cursor-pointer flex items-center justify-center h-[45px] disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isLoading ? true : false}
        >
          <p className="text-[15px] font-vazirM dark:text-black text-white">
            {t("SaveChange")}
          </p>
        </button>
      </div>
    </div>
  );
}
