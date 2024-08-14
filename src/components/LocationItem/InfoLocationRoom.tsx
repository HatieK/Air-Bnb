import { Carousel } from "antd";
import React from "react";
import { RoomLocation } from "../../interfaces/roomBasedOnLocation.interface";

interface InfoLocationRoomProps {
  room: RoomLocation;
}

const InfoLocationRoom: React.FC<InfoLocationRoomProps> = ({ room }) => {
  return (
    <div className="room-info mb-4 mr-5 grid cursor-pointer grid-cols-12 items-center gap-4 transition duration-500 hover:bg-orange-400">
      {/* hình ảnh phòng */}
      <div className="room-carousel col-span-6 p-4">
        <Carousel arrows infinite={false}>
          <div className="w-6">
            <img
              src={room.hinhAnh}
              alt="air-bnb"
              className="h-60 w-full rounded-lg object-cover"
            />
          </div>
          <div>
            <img
              src={room.hinhAnh}
              alt="air-bnb"
              className="h-60 w-full object-cover"
            />
          </div>
          <div>
            <img
              src={room.hinhAnh}
              alt="air-bnb"
              className="h-60 w-full object-cover"
            />
          </div>
        </Carousel>
      </div>
      {/* thông tin phòng */}
      <div className="col-span-6 mb-4 mt-2">
        <p className="text-[1.2vw] font-bold text-orange-600 sm:text-xl">
          {room.tenPhong}
        </p>
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <p className="text-[1.2vw] font-bold text-red-700 sm:text-xl">
              Số giường:
              <span> {room.giuong}</span>
            </p>
            <p className="text-[1.2vw] font-bold text-red-700 sm:text-xl">
              Số khách tối đa:
              <span>{room.khach}</span>
            </p>
          </div>
          <div className="col-span-6">
            <p className="text-[1.2vw] font-bold text-red-700 sm:text-xl">
              Số phòng tắm:
              <span> {room.phongTam}</span>
            </p>
            <p className="text-[1.2vw] font-bold text-red-700 sm:text-xl">
              Gía Tiền:{" "}
              <span className="font-bold text-black">{`${room.giaTien}$/Night`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoLocationRoom;
