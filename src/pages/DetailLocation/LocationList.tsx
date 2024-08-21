import LocationItem from "./LocationItem";

const LocationList = () => {
  return (
    <div>
      <h2 className="mb-3 text-[1.2vw] text-blue-700">
        Các Phòng Cho Vị Trí Bạn Đã Chọn
      </h2>
      <LocationItem />
    </div>
  );
};

export default LocationList;
