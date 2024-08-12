import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { useFetchDashboardData } from "@/Hooks/useFetchDashboardData";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({});

  const { isLoading, error, data: fetchedData } = useFetchDashboardData();

  useEffect(() => {
    if (fetchedData) {
      // console.log(fetchedData);
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

  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col items-start"
      style={{ direction: "rtl" }}
    >
      <Header />
    </div>
  );
}
