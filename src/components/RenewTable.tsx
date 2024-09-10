import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RenewData } from "@/types/Renew";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const RenewTable: React.FC<{
  data: RenewData[];
  headerData: string[];
  headerDataName: string[];
}> = ({ data, headerData, headerDataName }) => {
  const { t } = useTranslation();
  const [languageID, setLanguageID] = useState("1");

  useEffect(() => {
    if (window.localStorage.getItem("ssss_language_id")) {
      setLanguageID(window.localStorage.getItem("ssss_language_id")!);
    }
  }, []);

  return (
    <div className="overflow-x-auto w-full">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead
              key={0}
              className={cn("text-[16px] font-vazirB text-center px-4 py-2 gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e] border" , languageID == "1" ? "" : "font-robotoB")}
            >
              {t("Row")}
            </TableHead>
            {headerData &&
              headerData?.map((header, index) => (
                <TableHead
                  key={index + 1}
                  className={cn("text-[16px] font-vazirB text-center px-4 py-2 gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e] border" , languageID == "1" ? "" : "font-robotoB")}
                >
                  {header}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  className={cn("text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] border text-[15px]" , languageID == "1" ? "" : "font-robotoB")}
                  key={index + 1000000000}
                >
                  {index + 1}
                </TableCell>
                {headerDataName &&
                  headerDataName?.map((headerDataName, index) => (
                    <TableCell
                      className={cn("text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] border text-[15px]" , languageID == "1" ? "" : "font-robotoB")}
                      key={index + 10000}
                    >
                      {headerDataName &&
                        (item as any)[headerDataName] &&
                        (item as any)[headerDataName]}

                      {headerDataName &&
                        typeof (item as any)[headerDataName] == "boolean" &&
                        (item as any)[headerDataName] == true &&
                        t("is")}
                      {headerDataName &&
                        typeof (item as any)[headerDataName] == "boolean" &&
                        (item as any)[headerDataName] == false &&
                        t("isNot")}

                      {headerDataName && !(item as any)[headerDataName] && "_"}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RenewTable;
