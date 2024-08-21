import { useEffect } from "react";
import InfoLocationRoom from "../../components/LocationItem/InfoLocationRoom";
import InfoMapLocation from "../../components/LocationItem/InfoMapLocation";
import { RoomLocation } from "../../interfaces/roomBasedOnLocation.interface";
import { useAppSelector } from "../../redux/slices/hook";

const LocationItem = () => {
  console.log('🚀"re-render"---->', "re-render");
  const { currentRoom } = useAppSelector((state) => state.roomBasedLocation);
  console.log("🚀currentRoom---->", currentRoom);

  useEffect(() => {
    console.log("🚀currentRoom---->", currentRoom);
  }, [currentRoom]);

  return (
    <div className="grid h-full h-screen grid-cols-1 gap-4 sm:grid-cols-12">
      {/* chỗ ở khu vực đã chọn */}
      <div className="col-span-8 sm:overflow-auto">
        {currentRoom.map((room: RoomLocation) => {
          return <InfoLocationRoom room={room} key={room.id} />;
        })}
      </div>
      {/* map */}
      <div className="col-span-4 h-full">
        <InfoMapLocation />
      </div>
    </div>
  );
};

export default LocationItem;
