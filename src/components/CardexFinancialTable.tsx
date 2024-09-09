import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardexFinancial, CardexUser } from "@/types/Cardex";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

const tableNameChild = ["Type", "Users"];

const CardexFinancialTable: React.FC<{
  data: CardexFinancial[];
  headerData: string[];
  headerDataName: string[];
}> = ({ data, headerData, headerDataName }) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto w-full">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            <TableHead
              key={0}
              className="text-[14px] font-vazirB text-center px-4 py-2 gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]"
            >
              {t("Row")}
            </TableHead>
            {headerData.map((header, index) => (
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
              <TableCell
                className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]"
                key={index + 1000000000}
              >
                {index + 1}
              </TableCell>
              {headerDataName?.length > 0 &&
                headerDataName?.map((headerDataName, index) => (
                  <TableCell
                    className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b]"
                    key={index + 10000}
                  >
                    {headerDataName == "Users" &&
                      (item as any)[headerDataName] &&
                      (item as any)[headerDataName].length > 0 && (
                        <Dialog>
                          <DialogTrigger>
                            <button className="border p-4 py-3 rounded-[5px] cursor-pointer outline-none">
                              <p className="text-white text-[14px]">
                                {t("clickForShowUsers")}
                              </p>
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <Table className="table-fixed w-full mt-6">
                              <TableHeader>
                                <TableRow>
                                  {tableNameChild &&
                                    tableNameChild?.map((header, index) => (
                                      <TableHead
                                        key={index}
                                        className="text-[14px] font-vazirB text-center px-4 py-2 gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]"
                                      >
                                        {t(header)}
                                      </TableHead>
                                    ))}
                                </TableRow>
                              </TableHeader>
                              {item?.Users && item?.Users?.length > 0 && (
                                <TableBody>
                                  {item?.Users &&
                                    JSON.parse(item?.Users as any)?.map(
                                      (
                                        itemData: CardexUser,
                                        indexData: number
                                      ) => {
                                        return (
                                          <TableRow key={indexData}>
                                            <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                                              {itemData.Typ
                                                ? itemData.Typ
                                                : "_"}
                                            </TableCell>
                                            <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                                              {itemData.UserName
                                                ? itemData.UserName
                                                : "_"}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    )}
                                </TableBody>
                              )}
                            </Table>
                          </DialogContent>
                        </Dialog>
                      )}

                    {headerDataName == "Users" &&
                      (item as any)[headerDataName] == null &&
                      "_"}

                    {headerDataName != "Users" &&
                      !(item as any)[headerDataName] &&
                      "_"}

                    {headerDataName != "Users" &&
                      (item as any)[headerDataName] &&
                      (item as any)[headerDataName]}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CardexFinancialTable;
