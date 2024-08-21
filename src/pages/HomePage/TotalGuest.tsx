import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/slices/hook";
import {
  setTotalGuestDecrease,
  setTotalGuestsIncrease,
} from "../../redux/slices/infoBookingSlice";

interface TotalGuestProps {
  setIsOpenTotalGuest: Function;
}

const TotalGuest: React.FC<TotalGuestProps> = ({ setIsOpenTotalGuest }) => {
  const { totalGuest } = useAppSelector((state) => state.infoBooking);

  const dispatch = useAppDispatch();

  const handleClickIncreaseGuest = () => {
    let calTotalGuest = 1;
    dispatch(setTotalGuestsIncrease(calTotalGuest));
  };

  const handleClickDecreaseGuest = () => {
    let calTotalGuest = 1;
    dispatch(setTotalGuestDecrease(calTotalGuest));
  };

  return (
    <div className="absolute right-20 flex w-1/5 items-center justify-between rounded-lg border border-solid border-gray-600 p-4">
      <span className="text-sm font-bold">Khách</span>
      <div className="flex items-center gap-4">
        <Button
          className="h-5 w-5 border-none p-0"
          disabled={totalGuest >= 2 ? false : true}
          onClick={handleClickDecreaseGuest}
        >
          <FontAwesomeIcon
            icon={faMinus}
            className="h-5 w-5 cursor-pointer rounded-2xl bg-rose-600"
          />
        </Button>
        <span className="text-xl font-bold text-orange-700">{totalGuest}</span>
        <Button
          className="h-5 w-5 border-none p-0"
          onClick={handleClickIncreaseGuest}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="h-5 w-5 cursor-pointer rounded-2xl bg-rose-600"
          />
        </Button>
      </div>
    </div>
  );
};

export default TotalGuest;
