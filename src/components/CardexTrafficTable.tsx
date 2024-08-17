import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardexTraffic } from "@/types/Cardex";

const tableName = ["ترافیک", "آپلود", "دانلود", "مصرف", "زمان", "توضیحات"];

const CardexTrafficTable: React.FC<{ data: CardexTraffic[] }> = ({
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
                {item.Traffic}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Upload}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Download}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Consume}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Date}
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

export default CardexTrafficTable;
