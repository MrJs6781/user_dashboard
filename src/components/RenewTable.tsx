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
                className="text-[14px] font-vazirB text-center px-4 py-2"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.DateTime}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.GroupTitle}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.LimitOnlineUser}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.ExpireType}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.ExpirePeriod}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.ExpireLength}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.RateLimit}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.Traffic}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
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
