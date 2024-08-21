import React from "react";
import CityItem from "./CityItem";

interface CityListProp {
  locationList: any;
}

const CityList: React.FC<CityListProp> = ({ locationList }) => {
  return (
    <div className="mx-auto mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {locationList.map((location: any) => {
        return <CityItem key={location.id} location={location} />;
      })}
    </div>
  );
};

export default CityList;
