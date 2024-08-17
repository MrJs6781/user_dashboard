import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardexFinancial } from "@/types/Cardex";

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
                className="text-[14px] font-vazirB text-center px-4 py-2 gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#09203F] to-[#000]"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.TimeStamp}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.ProductTitle}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.SellCount}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Fi}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Price}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.BuySellParty}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Type}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {String(item.Users)}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CardexFinancialTable;
