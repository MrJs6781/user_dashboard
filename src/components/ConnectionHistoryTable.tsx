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
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.StartTime ? item.StartTime : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.Duration ? item.Duration : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.StopTime ? item.StopTime : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.RasTitle ? item.RasTitle : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.NasIP ? item.NasIP : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.CurrentUpload ? item.CurrentUpload : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.CurrentDownload ? item.CurrentDownload : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.TrafficRemained ? item.TrafficRemained : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.LastUpdate ? item.LastUpdate : "_"}
              </TableCell>
              <TableCell className="text-center gradiant_to_color bg-gradient-to-r dark:from-[#BFF098] dark:to-[#6FD6FF] from-[#fb7185] to-[#64748b] px-4 py-5 font-vazirB">
                {item.LastAction ? item.LastAction : "_"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConnectionHistoryTable;
