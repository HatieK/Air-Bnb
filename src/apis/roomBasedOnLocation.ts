import fetcher from "./fetcher";

export const roomBasedOnLocationApi = {
  getDetailRoom: async (locationId: number) => {
    try {
      const response = await fetcher.get(
        `phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`,
      );
      return response.data.content;
    } catch (error: any) {
      throw Error(error.response.data.content);
    }
  },
};
