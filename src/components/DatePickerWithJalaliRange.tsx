import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// اضافه کردن پلاگین jalaliday به dayjs
dayjs.extend(jalaliday);

// تنظیم تقویم به شمسی (جلالی)
dayjs().calendar("jalali");

// تابع برای تبدیل تاریخ میلادی به تاریخ شمسی
function formatDateToJalali(date: Date): string {
  return dayjs(date).calendar("jalali").format("YYYY/MM/DD");
  // return dayjs(date).format("YYYY/MM/DD");
}

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  setDate: any;
}

export function DatePickerWithRange({
  date,
  setDate,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start items-center text-left font-vazirM h-[56px] rounded-[12px] gap-4",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDateToJalali(date.from)} -{" "}
                  {formatDateToJalali(date.to)}
                </>
              ) : (
                formatDateToJalali(date.from)
              )
            ) : (
              <span>تاریخ را انتخاب کنید</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            className="font-vazirB"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
