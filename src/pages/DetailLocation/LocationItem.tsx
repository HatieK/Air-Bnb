import InfoLocationRoom from "../../components/LocationItem/InfoLocationRoom";
import InfoMapLocation from "../../components/LocationItem/InfoMapLocation";
import { RoomLocation } from "../../interfaces/roomBasedOnLocation.interface";
import { useAppSelector } from "../../redux/slices/hook";

const LocationItem = () => {
  const { currentRoom } = useAppSelector((state) => state.roomBasedLocation);

  return (
    <div className="grid h-screen grid-cols-1 gap-4 sm:grid-cols-12">
      {/* chỗ ở khu vực đã chọn */}
      <div className="col-span-8 sm:overflow-auto">
        {currentRoom.map((room: RoomLocation) => {
          return <InfoLocationRoom room={room} key={room.id} />;
        })}
      </div>
      {/* map */}
      <div className="col-span-4">
        <InfoMapLocation />
      </div>
    </div>
  );
};

export default LocationItem;
