import { addDays, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useAppDispatch } from "../redux/slices/hook";
import { setInForDate } from "../redux/slices/infoBookingSlice";

const DateRangePickerComponent = () => {
  const dispatch = useAppDispatch();

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const refCalendar = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (refCalendar.current && !refCalendar.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handlePressEsc = (e: any) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", handlePressEsc, true);
  }, []);

  const handleDateChange = (item: any) => {
    const { startDate, endDate, key } = item.selection;
    const updatedRange = [
      {
        startDate: startDate || new Date(),
        endDate: endDate || new Date(),
        key: key || "selection",
      },
    ];
    setRange(updatedRange);
    const formattedStartDate = format(startDate, "dd-MM-yyyy");
    const formattedEndDate = format(endDate, "dd-MM-yyyy");

    // Dispatch the formatted dates to Redux
    dispatch(
      setInForDate({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    );

    // Dispatch the selected date range to Redux
  };

  return (
    <>
      <input
        className="border-none py-5 text-red-600"
        value={`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(range[0].endDate, "dd/MM/yyyy")}`}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div className="calendarWrap" ref={refCalendar}>
        {isOpen && (
          <DateRangePicker
            date={new Date()}
            onChange={handleDateChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={true}
            ranges={range}
            months={2}
            direction="horizontal"
          />
        )}
      </div>
    </>
  );
};
export default DateRangePickerComponent;
