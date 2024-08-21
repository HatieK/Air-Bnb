import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../redux/slices/hook";
import {
  setDestination,
  setDestinationId,
} from "../../redux/slices/infoBookingSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roomBasedOnLocationApi } from "../../apis/roomBasedOnLocation";
import { setCurrentRoom } from "../../redux/slices/roomBasedOnLocationSlice";

interface InfoBookingRoomProps {
  locationList: any;
  setIsOpenLocation: Function;
}

const Destination: React.FC<InfoBookingRoomProps> = ({
  locationList,
  setIsOpenLocation,
}) => {
  const refLocation = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  // const handleClickOutside = (e: any) => {
  //   if (refLocation.current && !refLocation.current.contains(e.target)) {
  //     setIsOpenLocation(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  // }, []);

  const { mutateAsync: detailRentalRoom, isPending: detailRentalRoomPending } =
    useMutation({
      mutationFn: (locationId: number) =>
        roomBasedOnLocationApi.getDetailRoom(locationId),

      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["list-rentalRoom"],
          type: "active",
        });
      },
      onError: (error: any) => {
        console.log("🚀error---->", error);
      },
    });

  // START STATE
  const [destinationName, setDestinationName] = useState("");

  const handleClickDestination = async (locationId: number) => {
    const findDestination = locationList.find(
      (location: typeof locationList) => location.id === locationId,
    );
    try {
      const data = await detailRentalRoom(Number(findDestination.id));
      dispatch(setCurrentRoom(data));
    } catch (error) {
      console.log("🚀error---->", error);
    }

    if (findDestination) {
      setDestinationName(findDestination.tinhThanh);
      dispatch(setDestination(findDestination.tinhThanh));
      dispatch(setDestinationId(findDestination.id));
      setIsOpenLocation(false);
    }
  };

  return (
    <>
      <div
        ref={refLocation}
        className="finding-location absolute z-10 h-64 w-1/4 overflow-y-scroll bg-white p-4"
      >
        <p className="mb-2 text-[1.2vw] font-bold">Tìm Kiếm Địa Điểm</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {locationList.map((location: any) => {
            return (
              <div
                key={location.id}
                onClick={() => handleClickDestination(location.id)}
              >
                <img
                  src={location.hinhAnh}
                  alt="air-bnb"
                  className="h-[90%] w-[90%] cursor-pointer rounded-lg object-cover transition duration-1000 ease-in-out hover:scale-105"
                />
                <p className="mb-2 mt-2 text-center font-bold">
                  {location.tinhThanh}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Destination;
