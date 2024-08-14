import { addDays, format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";

const DateRangePickerComponent = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
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
    //thêm sự kiện click
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", handlePressEsc, true);
  }, []);

  return (
    <>
      <input
        className="border-none py-5"
        value={`${format(range[0].startDate, "dd/MM/yyyy")} đến ${format(range[0].endDate, "dd/MM/yyyy")}`}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div className="calendarWrap" ref={refCalendar}>
        {isOpen && (
          <DateRangePicker
            date={new Date()}
            onChange={(item) => {
              const { startDate, endDate, key } = item.selection;
              setRange([
                {
                  startDate: startDate || new Date(),
                  endDate: endDate || new Date(),
                  key: key || "selection",
                },
              ]);
            }}
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
