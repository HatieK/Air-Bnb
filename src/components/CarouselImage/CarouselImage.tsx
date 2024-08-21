import { Carousel } from "antd";
import { RoomLocation } from "../../interfaces/roomBasedOnLocation.interface";

interface InfoLocationRoomProps {
  room: RoomLocation;
}

const CarouselImage: React.FC<InfoLocationRoomProps> = ({ room }) => {
  return (
    <div className="room-carousel col-span-6 p-4">
      <Carousel arrows infinite={false}>
        <div className="w-6">
          <img
            src={room?.hinhAnh}
            alt="air-bnb"
            className="h-60 w-full rounded-lg object-cover"
          />
        </div>
        <div>
          <img
            src={room?.hinhAnh}
            alt="air-bnb"
            className="h-60 w-full object-cover"
          />
        </div>
        <div>
          <img
            src={room?.hinhAnh}
            alt="air-bnb"
            className="h-60 w-full object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselImage;
