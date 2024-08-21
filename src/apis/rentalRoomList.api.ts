import { ApiResponse } from "../interfaces";
import { rental, rentalRoom } from "../interfaces/rental.interface";
import fetcher from "./fetcher";

export const rentalRoomListApi = {
  getRentalRoomList: async () => {
    try {
      const response = await fetcher.get<ApiResponse<rentalRoom>>("phong-thue");
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
