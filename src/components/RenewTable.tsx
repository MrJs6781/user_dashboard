import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RenewData } from "@/types/Renew";

const tableName = [
  "زمان",
  "گروه",
  "محدودیت کاربری",
  "نوع انقضا",
  "دوره انقضا",
  "طول انقضا",
  "محدودیت سرعت",
  "حجم",
  "حجمی",
];

const RenewTable: React.FC<{ data: RenewData[] }> = ({ data }) => {
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
              <TableCell className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                {item.DateTime}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                {item.GroupTitle}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                {item.LimitOnlineUser}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                {item.ExpireType}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                {item.ExpirePeriod}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                {item.ExpireLength}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                {item.RateLimit}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                {item.Traffic}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirB gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad]">
                {item.IsTrafficBase ? "Yes" : "No"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RenewTable;
