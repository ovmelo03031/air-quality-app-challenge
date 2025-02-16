'use client';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/core/lib/utils';
import { Button } from '@components-ui/button';
import { Calendar } from '@components-ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@components-ui/popover';
import { formatDate } from '@/core/lib/date.utils';

interface DateRangePickerProps {
  className?: string;
  dateRange: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

function DateRangePicker({ className, dateRange, onDateChange }: DateRangePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !dateRange && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 size-4' />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {formatDate(dateRange.from, 'DD MMM YYYY')} -{' '}
                  {formatDate(dateRange.to, 'DD MMM YYYY')}
                </>
              ) : (
                formatDate(dateRange.from, 'DD MMM YYYY')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            autoFocus
            mode='range'
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
