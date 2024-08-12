import Header from "@/components/Header";
import { useFetchDashboardData } from "@/Hooks/useFetchDashboardData";
import { ResponseData } from "@/types/Dashboard";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";

export default function EditPassword() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<ResponseData>();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);

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

  const handleSubmit = () => {};

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
              type={isShowPassword ? "text" : "password"}
              placeholder="کلمه عبور : "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[93%] h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirM text-[14px]"
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
              placeholder="کلمه عبور جدید : "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-[93%] h-full bg-transparent outline-none border-none dark:text-white placeholder:dark:text-white font-vazirM text-[14px]"
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
