import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import DateRangePickerComponent from "../../test/DateRangePickerComponent";
import "./InfoBookingRoom.css";
import DateRangeComponent from "../../test/DateRangeComponent";
import Destination from "./Destination";

const InfoBookingRoom = () => {
  return (
    <div className="relative mb-10 px-20 py-6">
      <div className="infoBookingRoom grid grid-cols-1 items-center rounded-3xl border-2 border-solid border-gray-300 sm:grid-cols-12">
        {/* LOCATION */}
        <div className="col-span-3 flex cursor-pointer flex-col justify-center px-8">
          <p>Địa Điểm</p>
          <p>Bạn Sắp Đi Đâu</p>
        </div>
        {/* BORDER */}
        <div className="col-span-1 hidden justify-center sm:flex">
          <div className="m-3 h-8 border border-solid border-red-950"></div>
        </div>

        {/* CALENDER */}
        <div className="col-span-4 flex items-center justify-center">
          {/* CALENDER */}
          <div className="hidden lg:block">
            <DateRangePickerComponent />
          </div>
          <div className="block lg:hidden">
            <DateRangeComponent />
          </div>
        </div>
        {/* BORDER */}
        <div className="col-span-1 hidden justify-center sm:flex">
          <div className="m-3 h-8 border border-solid border-red-950"></div>
        </div>
        {/* ADD GUEST */}
        <div className="col-span-3 flex justify-center">
          <p className="mr-4">Thêm Khách</p>
          <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
      </div>
      <div>
        <Destination />
      </div>
    </div>
  );
};

export default InfoBookingRoom;
