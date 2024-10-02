"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
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

export function DatePickerWithRange({
    className,
    currentDateRange,
    onChange,
}: {
    className?: string;
    currentDateRange: DateRange | undefined;
    onChange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="currentDateRange"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !currentDateRange && "text-muted-foreground"
                        )}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentDateRange?.from ? (
                            currentDateRange.to ? (
                                <>
                                    {format(currentDateRange.from, "LLL dd, y")}{" "}
                                    - {format(currentDateRange.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(currentDateRange.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={currentDateRange?.from}
                        selected={currentDateRange!}
                        onSelect={onChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
