import React, { useEffect, useState } from "react";
import CarouselImage from "../../components/CarouselImage/CarouselImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { rentalRoomListApi } from "../../apis/rentalRoomList.api";
import { rentalRoom } from "../../interfaces/rental.interface";
import { Skeleton, Typography } from "antd";
import { useAppSelector } from "../../redux/slices/hook";
import { format, parse } from "date-fns";

const RentalRoomList = () => {
  const { Text }: any = Typography;

  const { dataRentalRoom } = useAppSelector((state) => state.infoRentalBooking);
  // const { date } = useAppSelector((state) => state.infoBooking);

  // const parsedStartDate = parse(date.startDate, "dd-MM-yyyy", new Date());
  // const parsedEndDate = parse(date.endDate, "dd-MM-yyyy", new Date());

  const [loading, setLoading] = useState(true);

  // const { data: rentalRoomList, isLoading: rentalRoomListLoading } = useQuery({
  //   queryKey: ["rentalRoom-List"],
  //   queryFn: () => rentalRoomListApi.getRentalRoomList(),
  // });

  const dataRentalRoomList: any = dataRentalRoom || [];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div>
        <p className="px-8 text-[1.2vw] font-bold sm:text-lg">
          {/* {`Có ${dataRentalRoom.length} chỗ ở từ ${format(parsedStartDate, "dd/MM/yyyy")} - ${format(parsedEndDate, "dd/MM/yyyy")}`} */}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4">
          {dataRentalRoomList.map((rentalRoom: rentalRoom) => {
            return (
              <div key={rentalRoom.id}>
                <Skeleton loading={loading} active>
                  {/* HÌNH ẢNH */}
                  <CarouselImage room={rentalRoom} />
                  <div className="flex flex-col gap-4 p-4">
                    {/* Thông Tin Room */}
                    <Text
                      ellipsis={{ rows: 1, expandable: false }}
                      className="text-[1.2vw] font-bold text-rose-600"
                      tool
                    >
                      {rentalRoom.tenPhong}
                    </Text>
                    <div className="rounded-lg border border-solid border-slate-600 p-2">
                      <p className="text-[1.2vw] font-bold sm:text-lg">
                        Thông Tin Chi Tiết
                      </p>
                      <div>
                        <p>
                          Khách Tối Đa:
                          <span className="text-[1.2vw] font-bold text-orange-500">
                            {" "}
                            {`${rentalRoom.khach}`}
                          </span>
                        </p>
                        <p>
                          Giường:{" "}
                          <span className="text-[1.2vw] font-bold text-orange-500">{`${rentalRoom.giuong}`}</span>
                        </p>
                        <p>
                          Phòng Ngủ:{" "}
                          <span className="text-[1.2vw] font-bold text-orange-500">{`${rentalRoom.phongNgu}`}</span>
                        </p>
                        <p>
                          Gía:{" "}
                          <span className="text-[1.2vw] font-bold text-orange-500">{`${rentalRoom.giaTien}$`}</span>
                          /night
                        </p>
                      </div>
                    </div>
                  </div>
                </Skeleton>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RentalRoomList;
