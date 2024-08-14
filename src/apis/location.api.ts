import { Location } from "./../interfaces/location.interface";
import { ApiResponse } from "./../interfaces/index";
import fetcher from "./fetcher";

export const locationApi = {
  getLocationList: async () => {
    try {
      const response = await fetcher.get<ApiResponse<Location>>("/vi-tri");
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  deleteLocation: async (locationId: string) => {
    try {
      const response = await fetcher.delete(`/vi-tri/${locationId}`);
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
