import { createSlice } from "@reduxjs/toolkit";

type rentalRoomBasedOnApi = {
  date: { startDate: string; endDate: string };
  dataRentalRoom: any;
};

const initialState: rentalRoomBasedOnApi = {
  date: { startDate: "", endDate: "" },
  dataRentalRoom: [],
};

const rentalRoomBasedOnApiSlice = createSlice({
  name: "rentalBasedOnApi",
  initialState,
  reducers: {
    setDateForRentalRoom: (state, action) => {
      state.date = action.payload;
    },
    setDataRentalRoom: (state, action) => {
      state.dataRentalRoom = action.payload;
    },
  },
});

export const { setDateForRentalRoom, setDataRentalRoom } =
  rentalRoomBasedOnApiSlice.actions;

export default rentalRoomBasedOnApiSlice.reducer;
