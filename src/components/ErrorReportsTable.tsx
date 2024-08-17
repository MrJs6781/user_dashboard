import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ErrorReports } from "@/types/ErrorReports";

const tableName = [
  "سرور",
  "آی پی مشتری",
  "دانلود",
  "آپلود",
  "زمان",
  "درخواست",
  "پاسخ",
  "متد",
];

const ErrorReportsTable: React.FC<{ data: ErrorReports[] }> = ({ data }) => {
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
                {item.NasIP}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.CallingStationId}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.AcctInputOctets}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.AcctOutputOctets}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.DateTime}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Request}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Response}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {String(item.PacketMethod)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ErrorReportsTable;
