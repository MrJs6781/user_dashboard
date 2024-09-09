import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PaginationComponent: React.FC<{
  paginationData: any[];
  perPage: number;
  TotalDataCount: number;
  setPerPage: any;
  setCurrentItems: any;
}> = ({ paginationData, perPage, setPerPage, setCurrentItems , TotalDataCount }) => {
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState(1);
  const [length, setLength] = useState<any>([]);
  const [totalPageData, setTotalPageData]: any = useState();

  useEffect(() => {
    const totalPages = Math.ceil(paginationData.length / perPage);
    setTotalPageData(totalPages);

    const indexOfLastItem = activePage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = paginationData.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    setCurrentItems(currentItems);

    let arr = [];
    for (let index = 1; index <= totalPages; index++) {
      arr.push(index);
    }
    setLength(arr);
  }, [paginationData, perPage, activePage]);

  const changePageHandler = (item: number) => {
    setActivePage(item);

    const indexOfLastItem = item * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = paginationData.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    setCurrentItems(currentItems);
  };

  const goToLastPageHandler = () => {
    if (activePage > 1) {
      setActivePage((prev) => prev - 1);
    }
  };

  const goToNextPageHandler = () => {
    if (activePage < totalPageData) {
      setActivePage((prev) => prev + 1);
    }
  };

  return (
    <section className="w-full flex items-center justify-start mt-4 gap-4 flex-wrap">
      <div className="flex items-center justify-center gap-4">
        <p className="font-vazirM">{t("AllData")} : {TotalDataCount}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <p className="font-vazirM">{t("DisplayTheNumberOnThePage")}</p>
        <select
          name="row_per_page"
          id="row_per_page"
          className="w-[100px] h-[35px] font-semibold font-vazirM border-2 rounded-md outline-none cursor-pointer dark:text-black"
          value={perPage}
          onChange={(e) => setPerPage(e.target.value)}
        >
          <option
            className="font-semibold cursor-pointer text-[13px]"
            value="50"
          >
            50
          </option>
          <option
            className="font-semibold cursor-pointer text-[13px]"
            value="100"
          >
            100
          </option>
          <option
            className="font-semibold cursor-pointer text-[13px]"
            value="200"
          >
            200
          </option>
          <option
            className="font-semibold cursor-pointer text-[13px]"
            value="500"
          >
            500
          </option>
          <option
            className="font-semibold cursor-pointer text-[13px]"
            value="1000"
          >
            1000
          </option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-white"
          type="button"
          onClick={goToLastPageHandler}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg> */}
          {t("Prev")}
        </button>
        <div className="flex items-center gap-2">
          {length?.map((item: number) => (
            <button
              className={cn(
                "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
                activePage == item
                  ? "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full bg-gray-900 hover:bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  : "dark:bg-white"
              )}
              type="button"
              key={item}
              onClick={() => changePageHandler(item)}
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-vazirB">
                {item}
              </span>
            </button>
          ))}
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-white"
          type="button"
          onClick={goToNextPageHandler}
        >
          {t("Next")}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg> */}
        </button>
      </div>
    </section>
  );
};

export default PaginationComponent;
