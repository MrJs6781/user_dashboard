import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HistoryData } from "@/types/ConnectionHistory";
import { useTranslation } from "react-i18next";

const ConnectionHistoryTable: React.FC<{
  data: HistoryData[];
  headerData: string[];
  headerDataName: string[];
}> = ({ data, headerData, headerDataName }) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto w-full">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            {headerData?.map((header, index) => (
              <TableHead
                key={index}
                className="text-[14px] font-vazirB text-center px-4 py-2 gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              {headerDataName?.length > 0 &&
                headerDataName?.map((headerDataName, index) => (
                  <TableCell
                    className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]"
                    key={index + 10000}
                  >
                    {(item as any)[headerDataName] == "true"
                      ? t("is")
                      : (item as any)[headerDataName] == "false"
                      ? t("isNot")
                      : (item as any)[headerDataName] &&
                        (item as any)[headerDataName].length > 0
                      ? (item as any)[headerDataName]
                      : "_"}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConnectionHistoryTable;
