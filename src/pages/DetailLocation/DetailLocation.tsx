import React, { useEffect } from "react";
import LocationList from "./LocationList";
import { useQuery } from "@tanstack/react-query";
import { roomBasedOnLocationApi } from "../../apis/roomBasedOnLocation";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/slices/hook";
import {
  setCurrentRoom,
  setInfoLocationRoom,
} from "../../redux/slices/roomBasedOnLocationSlice";
import { getLocalStorage } from "../../util";

type Params = {
  locationSlug?: string; //
};

const DetailLocation = () => {
  const { infoLocation } = useAppSelector((state) => state.roomBasedLocation);

  const dispatch = useAppDispatch();

  // Chuyển đổi sang number
  const { locationSlug } = useParams<Params>();

  const locationSlugNumber: number = Number(locationSlug);

  const { data: roomLocationData, isLoading: roomLocationDataLoading } =
    useQuery({
      queryKey: ["roomLocationData-list", locationSlugNumber],
      queryFn: () => roomBasedOnLocationApi.getDetailRoom(locationSlugNumber),
    });

  const roomLocationList = roomLocationData || [];

  useEffect(() => {
    if (roomLocationList.length > 0) {
      dispatch(setCurrentRoom(roomLocationList));
    }
  }, [dispatch, roomLocationList]);

  useEffect(() => {
    const savedLocation = getLocalStorage("location");
    if (savedLocation && !infoLocation) {
      dispatch(setInfoLocationRoom(savedLocation));
    }
  }, [dispatch, infoLocation]);

  return (
    <div className="px-8">
      <h2>
        Có {`${roomLocationList.length}`} chỗ tại {`${infoLocation?.tinhThanh}`}
        {` ${infoLocation.tenViTri}`}
      </h2>
      <LocationList />
    </div>
  );
};

export default DetailLocation;
