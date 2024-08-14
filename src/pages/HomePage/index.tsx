import { useQuery } from "@tanstack/react-query";
import CityList from "./CityList";
import { locationApi } from "../../apis/location.api";
import InfoBookingRoom from "./InfoBookingRoom";

const HomePage = () => {
  const { data: locationData, isLoading: locationLoading } = useQuery({
    queryKey: ["location-list"],
    queryFn: () => locationApi.getLocationList(),
  });

  const locationList = locationData || [];

  return (
    <div>
      <InfoBookingRoom />
      <div className="px-8">
        {!locationLoading && <CityList locationList={locationList} />}
      </div>
    </div>
  );
};

export default HomePage;
