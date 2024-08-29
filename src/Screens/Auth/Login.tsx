import { useEffect, useState } from "react";

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

export default function Login() {
  const { t } = useTranslation();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const updateLocalStorageValue = useLocalStorage<string>("UserID", "");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language")) {
      const getLang = window.localStorage.getItem("ssss_language")!;
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
    setIsLoading(true);
    e.preventDefault();
    mutation.mutate({
      UserName: username,
      Password: password,
      DeviceID: "",
      Info: "",
    });
  };

  const mutation = useMutation({
    mutationKey: ["loginKey"],
    mutationFn: async (data: LoginData) => {
      const response = await axios.post(
        `http://test.cloudius.co/User/Login?Type=User`,
        data
      );
      // console.log(response)
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      // console.log(data)
      if (data.Status == "0") {
        updateLocalStorageValue(`${data.Data[0]?.UserID}`);
        Cookies.set("authToken", data.Data[0]?.Token);
        navigate("/dashboard");
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

  // if (mutation.isLoading) {
  //   return <Loading />;
  // }

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
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div className="h-[48rem] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div
        className="w-[92%] max-w-[380px] min-h-[380px] rounded-[12px] flex items-center justify-between flex-col gap-4 p-6 shadow-xl glass z-30"
        style={{ backdropFilter: "blur(50px)" }}
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
              className="w-[93%] h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirM text-[14px]"
              maxLength={30}
            />
            <FaUser className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
          </span>
          <span className="w-full h-[45px] rounded-[20px] gap-2 border dark:border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type={isShowPassword == false ? "password" : "text"}
              placeholder={t("Password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[93%] h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirM text-[14px]"
              maxLength={20}
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
            (username.length > 0 && password.length > 0) || isLoading
              ? false
              : true
          }
        >
          <p className="text-[15px] font-vazirM dark:text-black text-white">
            {t("login")}
          </p>
        </button>
      </div>
    </div>
  );
}
