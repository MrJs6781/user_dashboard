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

// const tableName = ["ترافیک", "آپلود", "دانلود", "مصرف", "زمان", "توضیحات"];

const CardexTrafficTable: React.FC<{
  data: CardexTraffic[];
  headerData: string[];
}> = ({ data, headerData }) => {
  return (
    <div className="overflow-x-auto w-full">
      <Table className="table-fixed w-full">
        <TableHeader>
          <TableRow>
            {headerData?.map((header, index) => (
              <TableHead
                key={index}
                className="text-[14px] font-vazirB text-center px-4 py-2 gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#a1c4fd] dark:to-[#c2e9fb] from-[#4338ca] to-[#0f766e]"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.Traffic ? item.Traffic : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.Upload ? item.Upload : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.Download ? item.Download : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.Consume ? item.Consume : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.Date}
              </TableCell>
              <TableCell className="text-center gradiant_to_color gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.Description ? item.Description : "_"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CardexTrafficTable;
