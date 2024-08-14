import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import "./CalenderComponent.css";

const CalenderComponent = () => {
  const [calendar, setCalendar] = useState(format(new Date(), "dd/MM/yyyy"));

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

  const handleSelect = (date: any) => {
    setCalendar(format(date, "dd/MM/yyyy"));
  };

  return (
    <>
      <input
        value={calendar}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div className="calendarWrap" ref={refCalendar}>
        {isOpen && <Calendar date={new Date()} onChange={handleSelect} />}
      </div>
    </>
  );
};

export default CalenderComponent;
