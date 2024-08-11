import { useState } from "react";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoginData, LoginResponse } from "@/types/login";
import { toast } from "sonner";
import useLocalStorage from "@/Hooks/useStorage";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const updateLocalStorageValue = useLocalStorage<string>("UserID", "");
  const navigate = useNavigate();

  const hidePasswordHandler = () => {
    setIsShowPassword(false);
  };

  const showPasswordHandler = () => {
    setIsShowPassword(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      UserName: username,
      Password: password,
      DeviceID: "",
      Info: "",
    });
  };

  const mutation = useMutation({
    mutationKey: ["key"],
    mutationFn: async (data: LoginData) => {
      const response = await axios.post(
        `http://test.cloudius.co/User/Login?Type=User`,
        data
      );
      // console.log(response)
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      if (data.Status == "0") {
        updateLocalStorageValue(`${data.Data[0]?.UserID}`);
        Cookies.set("authToken", data.Data[0]?.Token);
        navigate("/dashboard");
      } else {
        toast.error(data.Message);
      }
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  // if (mutation.isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden bg-login_page bg-cover bg-no-repeat bg-center">
      <div
        className="w-[92%] max-w-[380px] min-h-[380px] rounded-[12px] flex items-center justify-between flex-col gap-4 p-6 shadow-xl"
        style={{ backdropFilter: "blur(50px)" }}
      >
        <h5 className="text-white font-vazirB text-[30px] text-center">ورود</h5>
        <form
          action=""
          style={{ direction: "rtl" }}
          className="w-full max-w-[380px] flex flex-col items-start gap-4 mt-4"
        >
          <span className="w-full h-[45px] rounded-[20px] border border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type="text"
              placeholder="نام کاربری : "
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-[93%] h-full bg-transparent outline-none border-none text-white placeholder:text-white font-vazirM text-[14px]"
              maxLength={30}
            />
            <FaUser className="text-white text-[18px] cursor-pointer" />
          </span>
          <span className="w-full h-[45px] rounded-[20px] gap-2 border border-[#eeeeee50] px-3 flex items-center justify-between">
            <input
              type={isShowPassword == false ? "password" : "text"}
              placeholder="کلمه عبور : "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[93%] h-full bg-transparent outline-none border-none text-white placeholder:text-white font-vazirM text-[14px]"
              maxLength={20}
            />
            {password.length > 0 && isShowPassword && (
              <IoEye
                className="text-white text-[22px] cursor-pointer"
                onClick={hidePasswordHandler}
              />
            )}
            {password.length > 0 && !isShowPassword && (
              <IoEyeOffSharp
                className="text-white text-[22px] cursor-pointer"
                onClick={showPasswordHandler}
              />
            )}
            <RiLockPasswordFill className="text-white text-[18px] cursor-pointer" />
          </span>
        </form>
        <button
          className="w-full bg-white outline-none border-none rounded-[20px] cursor-pointer flex items-center justify-center h-[45px] disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={username.length > 0 && password.length > 0 ? false : true}
        >
          <p className="text-[15px] font-vazirM text-black">ورود</p>
        </button>
      </div>
    </div>
  );
}
