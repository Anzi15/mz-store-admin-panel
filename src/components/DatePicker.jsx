import React, { useEffect, useState } from "react";
import { Input, Popover, PopoverHandler, PopoverContent, Button } from "@material-tailwind/react";
import { format, addDays, isValid } from 'date-fns';
import { DayPicker } from "react-day-picker";

export const convertTimestampToDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000);
  }
  return null;
};

export default function DatePicker({ initialDate = null, dateReturner, mode = "date", label="Select a date", allowPast=false }) {
  const [date, setDate] = useState(initialDate ? convertTimestampToDate(initialDate) : null); 
  const [time, setTime] = useState("12:00"); // Default time
  const tomorrow = addDays(new Date(), 1);

  useEffect(() => {
    if(initialDate== null) return
    const convertedDate = convertTimestampToDate(initialDate);
    console.log("Converted Date:", convertedDate);
    if (convertedDate && isValid(convertedDate)) {
      setDate(convertedDate);
    } else {
      console.error("Invalid date:", convertedDate);
    }
  }, [initialDate]);

  useEffect(() => {
    if (mode === "datetime" && date) {
      const [hours, minutes] = time.split(":");
      const updatedDate = new Date(date);
      updatedDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      
      if (updatedDate.getTime() !== date.getTime()) {
        setDate(updatedDate);
      }
      dateReturner(updatedDate);
    } else {
      dateReturner(date);
    }
  }, [time, mode, date]);

  const clearDate = () => {
    setDate(null);
    setTime("12:00");
    dateReturner(null);
  };

  const hiddenProps = allowPast ? {} : { hidden: { before: tomorrow } };
  const disabledProps = allowPast ? {} : { disabled: { before: tomorrow } };

  return (
    <div className="w-full">
      <Popover placement="bottom">
        <PopoverHandler>
          <Input
            label={label}
            onChange={() => null}
            value={date ? format(date, mode === "datetime" ? "PPP p" : "PPP") : ""}
            className="w-full"
          />
        </PopoverHandler>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(selectedDate) => setDate(selectedDate)}
            // disabled={{ before: tomorrow }}
            // {...(!allowPast ? { hidden: { before: tomorrow } } : {})}
            // {...(!allowPast ? { disabled: { before: tomorrow } } : {})}
            {...hiddenProps}
            {...disabledProps}

            showOutsideDays
            className="border-0"
            classNames={{
              caption: "flex justify-center py-2 mb-4 relative items-center",
              caption_label: "text-sm font-medium text-gray-900",
              nav: "flex items-center",
              nav_button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
              nav_button_previous: "absolute left-1.5",
              nav_button_next: "absolute right-1.5",
              table: "w-full border-collapse",
              head_row: "flex font-medium text-gray-900",
              head_cell: "m-0.5 w-9 font-normal text-sm",
              row: "flex w-full mt-2",
              cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal",
              day_range_end: "day-range-end",
              day_selected: "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
              day_today: "rounded-md bg-gray-200 text-gray-900",
              day_outside: "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
              day_disabled: "text-gray-500 opacity-50",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: ({ ...props }) => (
                <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
              ),
              IconRight: ({ ...props }) => (
                <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
              ),
            }}
          />
          {mode === "datetime" && (
            <div className="mt-2">
              <Input
                label="Select Time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full"
              />
            </div>
          )}
          <div className="mt-2">
            <Button onClick={clearDate} color="red" className="w-full">
              Clear Date
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
