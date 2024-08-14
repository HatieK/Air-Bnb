import { ApiResponse } from "../interfaces";
import {
  ApiResponseUser,
  UserLoginRequest,
} from "../interfaces/user.interface";
import fetcher from "./fetcher";

export const userApi = {
  login: async (data: UserLoginRequest) => {
    try {
      const response = await fetcher.post<ApiResponse<ApiResponseUser>>(
        "/auth/signin",
        data,
      );
      return response.data.content.user;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },

  getListUser: async () => {
    try {
      const response = await fetcher.get("/users");
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
  deleteUser: async (userId: number) => {
    try {
      const response = await fetcher.delete(`/users?id=${userId}`);
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
