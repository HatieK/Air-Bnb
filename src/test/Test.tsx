import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

const Test = () => {
  const [openCalender, setOpenCalender] = useState(false);

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleChange = (ranges: any) => {
    setDate(ranges.selection);
  };

  const handleClick = () => {
    setOpenCalender((prev) => !prev);
  };

  return (
    <>
      <div className="mt-4 flex items-center justify-center">
        <button className="p-4 bg-blend-darken" onClick={handleClick}>
          Click
        </button>
      </div>

      <div style={{ width: "800px", margin: "40px auto" }}>
        {openCalender && (
          <DateRangePicker
            ranges={[date]}
            onChange={handleChange}
            minDate={new Date()}
          />
        )}
      </div>
    </>
  );
};

export default Test;
