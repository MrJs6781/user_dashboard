import Header from "@/components/Header";
// import { useEffect, useState } from "react";
// import { useFetchDashboardData } from "@/Hooks/useFetchDashboardData";
// import { toast } from "sonner";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

const dashboardBoxes = [
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
        className="lucide lucide-repeat-2"
      >
        <path d="m2 9 3-3 3 3" />
        <path d="M13 18H7a2 2 0 0 1-2-2V6" />
        <path d="m22 15-3 3-3-3" />
        <path d="M11 6h6a2 2 0 0 1 2 2v10" />
      </svg>
    ),
    title: "تعداد روزهای باقیمانده",
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
        className="lucide lucide-download"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    ),
    title: "مقدار حجم باقیمانده",
  },
  {
    id: 3,
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
        className="lucide lucide-wallet-cards"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
        <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
      </svg>
    ),
    title: "موجودی کیف پول",
  },
  {
    id: 4,
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
    title: "تعداد کاربران زیر مجموعه",
  },
];

export default function Dashboard() {
  // const navigate = useNavigate();
  // const [dashboardData, setDashboardData] = useState({});

  // const { data: fetchedData } = useFetchDashboardData();

  // useEffect(() => {
  //   if (fetchedData) {
  //     if (fetchedData.Status == 0) {
  //       setDashboardData(fetchedData);
  //     } else if (fetchedData.Status == "-103") {
  //       Cookies.remove("authToken");
  //       localStorage.clear();
  //       navigate("/");
  //       toast.error(fetchedData.Message);
  //     } else {
  //       toast.error(fetchedData.Message);
  //     }
  //   }
  // }, [fetchedData]);

  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col items-start"
      style={{ direction: "rtl" }}
    >
      <Header />
      <ul className="w-full flex flex-wrap items-center justify-start gap-4 sm:gap-6 mt-6 px-6">
        {dashboardBoxes?.map((item) => (
          <li
            key={item.id}
            className="w-full mini:w-[47%] sm:w-[250px] h-[65px] flex items-start justify-start p-4 rounded-[8px] shadow-xl dark:border gap-3"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {item.icon}
            <span className="flex flex-col items-start gap-1">
              <p className="font-vazirB text-[10px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#09203F] to-[#000]">
                {item.title} :{" "}
              </p>
              <small className="font-vazirB text-[11px] sm:text-[12px] gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                محتوی تستی
              </small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
