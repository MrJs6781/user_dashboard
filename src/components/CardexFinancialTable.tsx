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

const tableName = [
  "زمان",
  "محصول",
  "تعداد",
  "قیمت واحد",
  "جمع کل",
  "نوع تراکنش",
  "شخص",
  "کاربران",
  "توضیحات",
];

const tableNameChild = ["تایپ", "کاربران"];

const CardexFinancialTable: React.FC<{ data: CardexFinancial[] }> = ({
  data,
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            {tableName.map((header, index) => (
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
          {data?.map((item, index) => {
            let itemUserParse;
            if (item.Users) {
              itemUserParse = JSON.parse(item?.Users as any);
            }
            return (
              <TableRow key={index}>
                <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                  {item.TimeStamp}
                </TableCell>
                <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                  {item.ProductTitle ? item.ProductTitle : "_"}
                </TableCell>
                <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                  {item.SellCount ? item.SellCount : "_"}
                </TableCell>
                <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                  {item.Fi ? item.Fi : "_"}
                </TableCell>
                <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                  {item.Price}
                </TableCell>
                <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                  {item.Type ? item.Type : "_"}
                </TableCell>
                <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                  {item.BuySellParty ? item.BuySellParty : "_"}
                </TableCell>
                <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                  {item.Users && item.Users?.length > 0 ? (
                    <Dialog>
                      <DialogTrigger>
                        <button className="border p-4 py-3 rounded-[5px] cursor-pointer outline-none">
                          <p className="text-white text-[14px]">
                            برای نمایش کاربران کلیک کنید
                          </p>
                        </button>
                      </DialogTrigger>
                      <DialogContent style={{ direction: "rtl" }}>
                        <Table className="table-fixed w-full mt-6">
                          <TableHeader>
                            <TableRow>
                              {tableNameChild?.map((header, index) => (
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
                            {itemUserParse?.map(
                              (item: CardexUser, index: number) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                                      {item.Typ ? item.Typ : "_"}
                                    </TableCell>
                                    <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                                      {item.UserName ? item.UserName : "_"}
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                  {item.Description ? item.Description : "_"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CardexFinancialTable;
