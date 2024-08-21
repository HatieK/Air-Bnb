import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import DateRangePickerComponent from "../../test/DateRangePickerComponent";
import "./InfoBookingRoom.css";
import DateRangeComponent from "../../test/DateRangeComponent";
import Destination from "./Destination";
import TotalGuest from "./TotalGuest";
import { useAppDispatch, useAppSelector } from "../../redux/slices/hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { rentalRoomListApi } from "../../apis/rentalRoomList.api";
import { Navigate, useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import {
  setDataRentalRoom,
  setDateForRentalRoom,
} from "../../redux/slices/rentalRoomBasedOnApiSlice";
import { roomBasedOnLocationApi } from "../../apis/roomBasedOnLocation";
import {
  setCurrentRoom,
  setInfoLocationRoom,
} from "../../redux/slices/roomBasedOnLocationSlice";

interface InfoBookingRoomProps {
  locationList: any;
}

const InfoBookingRoom: React.FC<InfoBookingRoomProps> = ({ locationList }) => {
  const dispatch = useAppDispatch();
  const { currentRoom } = useAppSelector((state) => state.roomBasedLocation);
  const { destination } = useAppSelector((state) => state.infoBooking);
  const { id } = useAppSelector((state) => state.infoBooking);
  const { date } = useAppSelector((state) => state.infoBooking);
  const { totalGuest } = useAppSelector((state) => state.infoBooking);

  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenTotalGuest, setIsOpenTotalGuest] = useState(false);

  const queryClient = useQueryClient();

  const detailPath = PATH.LOCATION + `/${id}`;

  const { data: rentalRoomList, isLoading: rentalRoomListLoading } = useQuery({
    queryKey: ["rentalRoom-List"],
    queryFn: () => rentalRoomListApi.getRentalRoomList(),
  });

  //nếu trong 31 phòng có phòng nào có số khách >= sộ khách cần đặt thì lấy ra các phòng đó
  let guestsForRoom: any[] = [];

  if (Array.isArray(rentalRoomList)) {
    guestsForRoom = rentalRoomList.filter((rentalRoom: any) => {
      return rentalRoom.khach >= totalGuest;
    });
  }
  //filter phòng có số người phù hợp với khách theo thành phố
  const filterGuestByCity = currentRoom?.filter((roomCity: any) => {
    return roomCity.khach >= totalGuest;
  });

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

  const navigate = useNavigate();

  const handleSearch = async (e: any) => {
    e.stopPropagation();
    if (!destination) {
      if (rentalRoomList) {
        navigate(PATH.RENTAL_ROOM);
        dispatch(setDataRentalRoom(rentalRoomList));
        dispatch(setDateForRentalRoom(date));
      }
    }

    if (date.startDate === "" || date.endDate === "") {
      if (rentalRoomList) {
        navigate(PATH.RENTAL_ROOM);
        dispatch(setDataRentalRoom(rentalRoomList));
        dispatch(setDateForRentalRoom(date));
      }
    }

    if (destination && totalGuest === 1) {
      const location = locationList.find(
        (location: any) => location.tinhThanh === destination,
      );
      try {
        console.log('🚀"run here"---->', "run here");
        const data = await detailRentalRoom(Number(id));
        dispatch(setInfoLocationRoom(location));
        dispatch(setCurrentRoom(data));
        dispatch(setDateForRentalRoom(date));
        navigate(detailPath);
      } catch (error) {
        console.log("🚀Error during mutation---->", error);
      }
    }

    if (totalGuest && !destination) {
      console.log('🚀"here 1"---->', "here 1");
      navigate(PATH.RENTAL_ROOM);
      dispatch(setDataRentalRoom(guestsForRoom));
      dispatch(setDateForRentalRoom(date));
    }

    if (totalGuest > 1 && destination) {
      console.log('🚀"run here 2"---->', "run here 2");
      navigate(detailPath);
      dispatch(setCurrentRoom(filterGuestByCity));
      // dispatch(setDateForRentalRoom(date));
    }
  };

  return (
    <div className="relative px-20 py-6">
      <div className="infoBookingRoom grid grid-cols-1 items-center rounded-3xl border-2 border-solid border-gray-300 sm:grid-cols-12">
        {/* LOCATION */}
        <div
          className="col-span-3 flex cursor-pointer flex-col items-center justify-center px-8"
          onClick={() => setIsOpenLocation((preValue) => !preValue)}
        >
          <p>Địa Điểm</p>
          <p className="font-bold text-rose-700">
            {destination ? destination : "Bạn Sắp Đi Đâu"}
          </p>
        </div>
        {/* BORDER */}
        <div className="col-span-1 hidden justify-center sm:flex">
          <div className="m-3 h-8 border border-solid border-red-950"></div>
        </div>

        {/* CALENDER */}
        <div className="col-span-4 flex items-center justify-center">
          {/* CALENDER */}
          <div className="z-10 hidden lg:block">
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
        <div
          className="col-span-3 flex cursor-pointer items-center justify-center"
          onClick={() => setIsOpenTotalGuest((prev) => !prev)}
        >
          <p className="mr-4">Thêm Khách</p>
          <div>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="rounded-2xl bg-rose-900 p-2 text-white"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
      <div>
        {isOpenLocation && (
          <Destination
            locationList={locationList}
            setIsOpenLocation={setIsOpenLocation}
          />
        )}
      </div>
      <div className="mt-1">
        {isOpenTotalGuest && (
          <TotalGuest setIsOpenTotalGuest={setIsOpenTotalGuest} />
        )}
      </div>
    </div>
  );
};

export default InfoBookingRoom;
