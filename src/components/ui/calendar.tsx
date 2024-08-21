import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { faIR } from "date-fns/locale";

// اضافه کردن پلاگین jalaliday به dayjs
dayjs.extend(jalaliday);

// تنظیم تقویم به شمسی (جلالی)
dayjs().calendar("jalali");

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const WEEKDAYS_LONG = [
  "پنج‌شنبه",
  "چهارشنبه",
  "سه‌شنبه",
  "دوشنبه",
  "یک‌شنبه",
  "شنبه",
  "جمعه",
];

const MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // const today = dayjs().calendar("jalali").toDate();

  // محاسبه تاریخ ۱۰ روز قبل از امروز
  // const startDate = dayjs(today).subtract(10, "day").toDate();

  React.useEffect(() => {
    const Tbody = document.querySelectorAll(".rdp-tbody");
    Tbody.forEach((item) => {
      // console.log(item)
      item.classList.add("rtl_direction_calender");
    });
  }, []);

  return (
    <DayPicker
      locale={faIR} // تنظیم زبان به فارسی
      className={cn("p-3", className, "rtl")} // اضافه کردن کلاس rtl
      classNames={{
        months:
          "flex flex-col sm:flex-row-reverse space-y-4 sm:space-x-reverse sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute right-1", // تغییر موقعیت دکمه قبلی به راست
        nav_button_next: "absolute left-1", // تغییر موقعیت دکمه بعدی به چپ
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[9px]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-l-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronRight className="h-4 w-4" />, // تغییر آیکون برای راست به چپ
        IconRight: () => <ChevronLeft className="h-4 w-4" />, // تغییر آیکون برای راست به چپ
      }}
      formatters={{
        formatCaption: (date) =>
          `${MONTHS[dayjs(date).calendar("jalali").month()]} ${dayjs(date)
            .calendar("jalali")
            .format("YYYY")}`,
        // formatDay: (day) => day.getDate().toLocaleString("fa-IR"),
        formatDay: (date) => dayjs(date).calendar("jalali").format("D"),
        formatWeekdayName: (date) => WEEKDAYS_LONG[date.getDay()],
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
