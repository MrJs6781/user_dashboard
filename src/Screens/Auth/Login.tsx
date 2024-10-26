import { useEffect, useRef, useState } from "react";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEye, IoLanguage } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoginData, LoginResponse } from "@/types/login";
import { toast } from "sonner";
import useLocalStorage from "@/Hooks/useStorage";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import i18n from "./../../../i18n";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export default function Login() {
  const { t } = useTranslation();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const updateLocalStorageValue = useLocalStorage<string>("UserID", "");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const input1Ref = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const [languageID, setLanguageID] = useState("1");
  const [isShowLoadingForLogin, setIsShowLoadingForLogin] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language")) {
      const getLang = window.localStorage.getItem("ssss_language")!;
      // console.log(getLang)
      setLanguageID(window.localStorage.getItem("ssss_language_id")!);
      if (getLang == "en") {
        const getHTML = window.document.getElementById("root_parent");
        getHTML?.style.setProperty("direction", "ltr");
        getHTML?.setAttribute("lang", "en");
        changeLanguage("en");
      } else {
        const getHTML = window.document.getElementById("root_parent");
        getHTML?.style.setProperty("direction", "rtl");
        getHTML?.setAttribute("lang", "fa");
        changeLanguage("fa");
      }
    } else {
      window.localStorage.setItem("ssss_language", "fa");
      window.localStorage.setItem("ssss_language_id", "1");
      const getHTML = window.document.getElementById("root_parent");
      getHTML?.style.setProperty("direction", "rtl");
      getHTML?.setAttribute("lang", "fa");
      changeLanguage("fa");
    }
  }, []);

  const hidePasswordHandler = () => {
    setIsShowPassword(false);
  };

  const showPasswordHandler = () => {
    setIsShowPassword(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsShowLoadingForLogin(true);
    setIsLoading(true);
    e.preventDefault();
    mutation.mutate({
      UserName: username,
      Password: password,
      DeviceID: "",
      Info: "",
      languageID: window.localStorage.getItem("ssss_language_id")!,
    });
  };

  const mutation = useMutation({
    mutationKey: ["loginKey"],
    mutationFn: async (data: LoginData) => {
      const response = await axios.post(
        `/api/User/Login?Type=User`,
        data
      );
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      if (data.Status == "0") {
        updateLocalStorageValue(`${data.Data[0]?.UserID}`);
        Cookies.set("authToken", data.Data[0]?.Token);
        navigate("/dashboard");
      } else {
        toast.error(data.Message);
        setIsLoading(false);
        setIsShowLoadingForLogin(false);
      }
    },
    onError: (err: any) => {
      console.log(err);
      setIsLoading(false);
      setIsShowLoadingForLogin(false);
    },
  });

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleLanguage = () => {
    if (window.localStorage.getItem("ssss_language")) {
      const getLang = window.localStorage.getItem("ssss_language")!;
      if (getLang == "en") {
        window.localStorage.setItem("ssss_language", "fa");
        window.localStorage.setItem("ssss_language_id", "1");
        const getHTML = window.document.getElementById("root_parent");
        getHTML?.style.setProperty("direction", "rtl");
        getHTML?.setAttribute("lang", "fa");
        changeLanguage("fa");
        setLanguageID("1");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        window.localStorage.setItem("ssss_language", "en");
        window.localStorage.setItem("ssss_language_id", "0");
        const getHTML = window.document.getElementById("root_parent");
        getHTML?.style.setProperty("direction", "ltr");
        getHTML?.setAttribute("lang", "en");
        changeLanguage("en");
        setLanguageID("0");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } else {
      window.localStorage.setItem("ssss_language", "en");
      window.localStorage.setItem("ssss_language_id", "0");
      const getHTML = window.document.getElementById("root_parent");
      getHTML?.style.setProperty("direction", "ltr");
      getHTML?.setAttribute("lang", "en");
      changeLanguage("en");
      setLanguageID("0");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const goToForgetPasswordPage = () => {
    navigate("/forget_password");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab" && input1Ref.current) {
      input2Ref.current?.focus();
      event.preventDefault();
    } else if (event.key === "Enter" && input2Ref.current) {
      setIsLoading(true);
      event.preventDefault();
      mutation.mutate({
        UserName: username,
        Password: password,
        DeviceID: "",
        Info: "",
      });
    }
  };

  return (
    <div className="h-[48rem] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center">
      <div
        className="w-[92%] max-w-[380px] min-h-[380px] rounded-[12px] flex items-center justify-between flex-col gap-4 p-6 shadow-xl glass z-30"
        style={{ backdropFilter: "blur(50px)", direction: "ltr" }}
      >
        <span className="flex items-center justify-between w-full">
          <h5 className="text-[15px] font-vazirM">{t("SelectLanguage")}</h5>
          <IoLanguage
            className="cursor-pointer text-[20px]"
            onClick={toggleLanguage}
          />
        </span>
        <h5 className="dark:text-white text-black font-vazirB text-[30px] text-center">
          {t("login")}
        </h5>
        <form
          action=""
          className="w-full max-w-[380px] flex flex-col items-start gap-4 mt-4"
        >
          <span className="w-full h-[45px] rounded-[20px] border dark:border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type="text"
              placeholder={t("Username")}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                "w-[93%] placeholder:font-vazirB h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirB text-[14px]",
                languageID == "1"
                  ? "placeholder:font-vazirB"
                  : "font-robotoM placeholder:font-robotoB"
              )}
              maxLength={30}
              ref={input1Ref}
            />
            <FaUser className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
          </span>
          <span className="w-full h-[45px] rounded-[20px] gap-2 border dark:border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type={isShowPassword == false ? "password" : "text"}
              placeholder={t("Password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                "w-[93%] placeholder:font-vazirB h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirB text-[14px]",
                languageID == "1"
                  ? "placeholder:font-vazirB"
                  : "font-robotoM placeholder:font-robotoB"
              )}
              maxLength={20}
              ref={input2Ref}
            />
            {password.length > 0 && isShowPassword && (
              <IoEye
                className="dark:text-white text-purple-500 text-[22px] cursor-pointer"
                onClick={hidePasswordHandler}
              />
            )}
            {password.length > 0 && !isShowPassword && (
              <IoEyeOffSharp
                className="dark:text-white text-purple-500 text-[22px] cursor-pointer"
                onClick={showPasswordHandler}
              />
            )}
            <RiLockPasswordFill className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
          </span>
        </form>
        <button
          className="w-full dark:bg-white bg-purple-600 outline-none border-none rounded-[20px] cursor-pointer flex items-center justify-center h-[45px] disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={
            isLoading == false && username?.length > 0 && password?.length > 0
              ? false
              : true
          }
        >
          <p className="text-[15px] font-vazirM dark:text-black text-white">
            {isShowLoadingForLogin ? t("Loading") : t("login")}
          </p>
        </button>
        <span
          className="w-full flex flex-col items-center justify-center gap-0"
          onClick={goToForgetPasswordPage}
        >
          <p className="text-[15px] pb-1 cursor-pointer font-vazirM">
            {t("forgetPassword")}
          </p>
          <small className="w-[90px] h-[2px] bg-white"></small>
        </span>
        <p
          className={cn(
            "mt-4 text-center text-[14px] font-vazirB",
            languageID == "1" ? "" : "font-robotoB"
          )}
        >
          {t("V")} : 1.01
        </p>
      </div>
    </div>
  );
}
