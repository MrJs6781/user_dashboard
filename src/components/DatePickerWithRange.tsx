"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calenderMiladi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { useTranslation } from "react-i18next";

interface DatePickerWithRangeMiladiProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export function DatePickerWithRangeMiladi({
  date,
  setDate,
  className,
}: DatePickerWithRangeMiladiProps) {
  //   const { t } = useTranslation();
  const [languageID, setLanguageID] = React.useState("1");

  React.useEffect(() => {
    if (window.localStorage.getItem("ssss_language_id")) {
      setLanguageID(window.localStorage.getItem("ssss_language_id")!);
    }
  }, []);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] h-[58px] justify-start items-center text-left font-vazirM rounded-[12px] gap-4",
              !date && "text-muted-foreground",
              languageID == "1" ? "" : "font-robotoM"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="font-robotoM">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            showOutsideDays={false}
            className={languageID == "1" ? "font-vazirB" : "font-robotoB"}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
