import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";
import { FaPhoneAlt, FaUserTie } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { EditPasswordUser, EditProfileUser } from "@/types/Profile";
import { MdEmail } from "react-icons/md";
import { PhoneNumberRegex } from "@/Regex/PhoneNumber";
import { useFetchDashboardDataSlider } from "@/Hooks/useFetchDashboardDataSlider";

interface ProfileUserProps {
  username: string;
  titleNameInput: string;
}

const profileUserData = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-user"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "EditProfile",
    link: "/edit_profile",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-lock"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "EditPassword",
    link: "/edit_password",
  },
];

export default function ProfileUser({
  username,
  titleNameInput,
}: ProfileUserProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [languageID, setLanguageID] = useState("1");
  const [isShowEditProfile, setIsShowEditProfile] = useState(false);
  const [isShowEditPassword, setIsShowEditPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [titleName, setTitleName] = useState("");
  const [email, setUserEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const { data: fetchedData } = useFetchDashboardDataSlider(
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
        setTitleName(fetchedData?.Data[0]?.Title);
        setUserEmail(fetchedData?.Data[0]?.Email);
        setMobileNumber(fetchedData?.Data[0]?.Mobile);
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

  const exitUserHandler = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("UserID");
    navigate("/");
  };

  const showOptionHandler = (item: any) => {
    if (item.id == 1) {
      setIsShowEditPassword(false);
      setIsShowEditProfile(true);
    } else if (item.id == 2) {
      setIsShowEditProfile(false);
      setIsShowEditPassword(true);
    }
  };

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
          // window.location.reload();
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

  const mobileNumberChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    // بررسی معتبر بودن مقدار وارد شده
    if (PhoneNumberRegex.test(value)) {
      setMobileNumber(value);
    } else {
      //   toast.error("شماره موبایل وارد شده معتبر نیست.");
    }
  };

  const handleSubmitProfile = () => {
    setIsLoading(true);
    mutationProfile.mutate({
      Title: titleName,
      Email: email,
      Mobile: mobileNumber,
      languageID: +window.localStorage.getItem("ssss_language_id")!,
    });
  };

  const mutationProfile = useMutation({
    mutationKey: ["editProfileKey"],
    mutationFn: async (data: EditProfileUser) => {
      const getToken = Cookies.get("authToken");

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken}`);

      const response = await fetch(
        `${import.meta.env.VITE_WEB_SERVICE_DOMAIN}User/EditProfile?Type=User`,
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
        setTimeout(() => {
          window.location.reload();
        }, 750);
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="w-fit min-w-[120px] cursor-pointer flex items-center gap-4 justify-between px-2 border h-[28px]">
          <span className="flex items-center justify-start gap-2">
            <FaUserTie className="text-[20px] w-[14px] h-[14px]" />
            <p className="text-[14px] font-semibold">{titleNameInput}</p>
          </span>
          <FaAngleDown className="text-[10px]" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] flex flex-col items-start gap-2 px-4">
        <span
          className="w-full px-2 pb-4 pt-2 flex items-center justify-between gap-2 border-b"
          style={
            languageID == "1" ? { direction: "rtl" } : { direction: "ltr" }
          }
        >
          <p className="text-[14px] font-semibold font-vazirB">
            {t("Username")} : {username}
          </p>
          <FaUserTie className="w-[24px] h-[24px]" />
        </span>
        {profileUserData.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className="w-full flex items-center justify-between px-2 cursor-pointer"
            style={
              languageID == "1" ? { direction: "rtl" } : { direction: "ltr" }
            }
            onClick={() => showOptionHandler(item)}
          >
            <span className="flex items-center justify-between w-full">
              <p className="font-vazirB text-[14px] gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#09203F] to-[#000]">
                {t(item.title)}
              </p>
              {item.icon}
            </span>
          </DropdownMenuItem>
        ))}
        <span
          className="w-full px-2 pb-4 pt-2 flex items-center justify-between gap-2 border-t cursor-pointer"
          onClick={exitUserHandler}
          style={
            languageID == "1" ? { direction: "rtl" } : { direction: "ltr" }
          }
        >
          <p className="text-[14px] font-semibold font-vazirB">{t("Exit")}</p>
          <GiExitDoor className="w-[24px] h-[24px]" />
        </span>
      </DropdownMenuContent>
      {isShowEditProfile && (
        <Dialog open onOpenChange={() => setIsShowEditProfile(false)}>
          <DialogContent
            style={{ direction: "ltr" }}
            className="w-[75%] sm:w-full"
          >
            <DialogHeader className="items-center gap-4">
              <DialogTitle className="w-full flex items-center justify-center font-vazirB">
                {t("EditProfile")}
              </DialogTitle>
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
                      type="text"
                      placeholder={t("TitleName")}
                      value={titleName}
                      onChange={(e) => setTitleName(e.target.value)}
                      className={cn(
                        "w-[93%] placeholder:font-vazirB h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirB text-[14px]",
                        languageID == "1"
                          ? "placeholder:font-vazirB"
                          : "font-robotoM placeholder:font-robotoB"
                      )}
                      maxLength={30}
                    />
                    <FaUserTie className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
                  </span>
                  <span className="w-full h-[45px] rounded-[20px] border dark:border-[#eeeeee50] px-3 flex items-center justify-between">
                    <input
                      type="email"
                      placeholder={t("EmailAddress")}
                      value={email}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className={cn(
                        "w-[93%] placeholder:font-vazirB h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirB text-[14px]",
                        languageID == "1"
                          ? "placeholder:font-vazirB"
                          : "font-robotoM placeholder:font-robotoB"
                      )}
                      maxLength={30}
                    />
                    <MdEmail className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
                  </span>
                  <span className="w-full h-[45px] rounded-[20px] border dark:border-[#eeeeee50] px-3 flex items-center justify-between gap-3">
                    <input
                      type="tel"
                      placeholder={t("PhoneNumber")}
                      value={mobileNumber}
                      onChange={mobileNumberChangeHandler}
                      className={cn(
                        "w-[93%] placeholder:font-vazirB h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirB text-[14px]",
                        languageID == "1"
                          ? "placeholder:font-vazirB"
                          : "font-robotoM placeholder:font-robotoB"
                      )}
                      maxLength={11}
                    />
                    <FaPhoneAlt className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
                  </span>
                </form>
                <button
                  className="w-full dark:bg-white bg-purple-600 outline-none border-none rounded-[20px] cursor-pointer flex items-center justify-center h-[45px] disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={handleSubmitProfile}
                  disabled={isLoading == true ? true : false}
                >
                  <p className="text-[15px] font-vazirM dark:text-black text-white">
                    {t("SaveChange")}
                  </p>
                </button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      {isShowEditPassword && (
        <Dialog open onOpenChange={() => setIsShowEditPassword(false)}>
          <DialogContent
            style={{ direction: "ltr" }}
            className="w-[75%] sm:w-full"
          >
            <DialogHeader className="items-center gap-4">
              <DialogTitle className="w-full flex items-center justify-center font-vazirB">
                {t("EditPassword")}
              </DialogTitle>
              <div
                className="w-[92%] max-w-[380px] min-h-[380px] rounded-[12px] mt-4 flex items-center justify-between flex-col gap-4 p-6 shadow-xl glass z-30"
                style={{ backdropFilter: "blur(50px)", direction: "ltr" }}
              >
                <form
                  action=""
                  className="w-full max-w-[380px] flex flex-col items-start gap-4 mt-4"
                >
                  <span className="w-full h-[45px] rounded-[20px] border dark:border-[#eeeeee50] px-3 flex items-center justify-between gap-2">
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
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </DropdownMenu>
  );
}
