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

const tableName = [
  "شروع",
  "مدت",
  "پایان",
  "سرور",
  "آی پی مشتری",
  "آپلود",
  "دانلود",
  "حجم مانده",
  "آخرین آپدیت",
  "آخرین عملیات",
];

const ConnectionHistoryTable: React.FC<{ data: HistoryData[] }> = ({
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
                {item.StartTime}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.Duration}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.StopTime}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.RasTitle}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.NasIP}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.CurrentUpload}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.CurrentDownload}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.TrafficRemained}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.LastUpdate}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#09203fb7] to-[#000000ad] px-4 py-5 font-vazirB">
                {item.LastAction}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConnectionHistoryTable;
