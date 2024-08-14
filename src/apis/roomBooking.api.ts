import { ApiResponse } from "../interfaces";
import { RoomBookingList } from "../interfaces/roomBooking.interface";
import fetcher from "./fetcher";

export const roomBookingApi = {
  getListRoomBooking: async () => {
    try {
      const response =
        await fetcher.get<ApiResponse<RoomBookingList>>("/dat-phong");
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  deleteRoomBooking: async (roomId: string) => {
    try {
      const response = await fetcher.delete(`dat-phong/${roomId}`);
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  addRoomBooking: async (payload: FormData) => {
    try {
      const response = await fetcher.post("/dat-phong", payload);
      console.log("🚀response---->", response);
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
