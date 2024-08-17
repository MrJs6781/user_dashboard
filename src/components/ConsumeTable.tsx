import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConsumeData } from "@/types/Consume";

const tableName = ["آپلود", "دانلود", "زمان", "سرور"];

const ConsumeTable: React.FC<{ data: ConsumeData[] }> = ({ data }) => {
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
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.Upload}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.Download}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.TimeStamp}
              </TableCell>
              <TableCell className="text-center px-4 py-5 font-vazirM">
                {item.RasTitle}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ConsumeTable;
