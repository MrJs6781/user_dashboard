import Header from "@/components/Header";
import LottiePlayer from "@/components/Loading";
import { useFetchDashboardData } from "@/Hooks/useFetchDashboardData";
import { PhoneNumberRegex } from "@/Regex/PhoneNumber";
import { EditProfileUser } from "@/types/Profile";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function EditProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: fetchedData, isLoading: fetchedDataLoading } =
    useFetchDashboardData();

  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.Status == 0) {
        setUserName(fetchedData?.Data[0]?.Title);
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

  const handleSubmit = () => {
    setIsLoading(true);
    mutation.mutate({
      Title: username,
      Email: email,
      Mobile: mobileNumber,
    });
  };

  const mutation = useMutation({
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
      // console.log(data);
      if (data.Status == "0") {
        toast.success(data.Message);
        // setIsLoading(false);
        setTimeout(() => {
          Cookies.remove("authToken");
          localStorage.removeItem("UserID");
          navigate("/");
        }, 1000);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
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
    <div
      className="w-full h-screen overflow-auto flex items-center justify-center"
       
    >
      <Header />
      <div
        className="w-[92%] max-w-[380px] min-h-[380px] rounded-[12px] flex items-center justify-between flex-col gap-4 p-6 shadow-xl glass z-30"
        style={{ backdropFilter: "blur(50px)" }}
      >
        <form
          action=""
           
          className="w-full max-w-[380px] flex flex-col items-start gap-4 mt-4"
        >
          <span className="w-full h-[45px] rounded-[20px] border dark:border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type="text"
              placeholder={t("TitleName")}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-[93%] h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirM text-[14px]"
              maxLength={30}
            />
            <FaUser className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
          </span>
          <span className="w-full h-[45px] rounded-[20px] border dark:border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type="email"
              placeholder={t("EmailAddress")}
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-[93%] h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirM text-[14px]"
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
              className="w-[93%] h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirM text-[14px]"
              maxLength={11}
               
            />
            <FaPhoneAlt className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
          </span>
        </form>
        <button
          className="w-full dark:bg-white bg-purple-600 outline-none border-none rounded-[20px] cursor-pointer flex items-center justify-center h-[45px] disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isLoading == true ? true : false}
        >
          <p className="text-[15px] font-vazirM dark:text-black text-white">
            {t("SaveChange")}
          </p>
        </button>
      </div>
    </div>
  );
}
