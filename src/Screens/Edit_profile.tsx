import Header from "@/components/Header";
import { useFetchDashboardData } from "@/Hooks/useFetchDashboardData";
import { PhoneNumberRegex } from "@/Regex/PhoneNumber";
import { ResponseData } from "@/types/Dashboard";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function EditProfile() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<ResponseData>();
  const [username, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const { data: fetchedData } = useFetchDashboardData();

  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.Status == 0) {
        setDashboardData(fetchedData);
      } else if (fetchedData.Status == "-103") {
        Cookies.remove("authToken");
        localStorage.clear();
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
    
  }

  return (
    <div
      className="w-full h-screen overflow-auto flex items-center justify-center"
      style={{ direction: "rtl" }}
    >
      <Header dashboardData={dashboardData?.Data[0]} />
      <div
        className="w-[92%] max-w-[380px] min-h-[380px] rounded-[12px] flex items-center justify-between flex-col gap-4 p-6 shadow-xl glass z-30"
        style={{ backdropFilter: "blur(50px)" }}
      >
        <form
          action=""
          style={{ direction: "rtl" }}
          className="w-full max-w-[380px] flex flex-col items-start gap-4 mt-4"
        >
          <span className="w-full h-[45px] rounded-[20px] border dark:border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type="text"
              placeholder="نام کاربری : "
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
              placeholder="آدرس ایمیل : "
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-[93%] h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirM text-[14px]"
              maxLength={30}
            />
            <MdEmail className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
          </span>
          <span className="w-full h-[45px] rounded-[20px] border dark:border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type="tel"
              placeholder="شماره موبایل : "
              value={mobileNumber}
              onChange={mobileNumberChangeHandler}
              className="w-[93%] h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirM text-[14px]"
              maxLength={11}
              style={{ direction: "rtl" }}
            />
            <FaPhoneAlt className="dark:text-white text-purple-500 text-[18px] cursor-pointer" />
          </span>
        </form>
        <button
          className="w-full dark:bg-white bg-purple-600 outline-none border-none rounded-[20px] cursor-pointer flex items-center justify-center h-[45px] disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          //   disabled={
          //     (username.length > 0 && email.length > 0 && ph) || isLoading
          //       ? false
          //       : true
          //   }
        >
          <p className="text-[15px] font-vazirM dark:text-black text-white">
            ذخیره تغییرات
          </p>
        </button>
      </div>
    </div>
  );
}
