import { createSlice } from "@reduxjs/toolkit";

type infoBookingRoom = {
  id: string;
  destination: string;
  date: { startDate: string; endDate: string };
  totalGuest: number;
};

const initialState: infoBookingRoom = {
  id: "",
  destination: "",
  date: { startDate: "", endDate: "" },
  totalGuest: 1,
};

const allInforBookingSlices = createSlice({
  name: "allInforBookingSlices",
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setDestinationId: (state, action) => {
      state.id = action.payload;
    },
    setInForDate: (state, action) => {
      state.date = action.payload;
    },
    setTotalGuestsIncrease: (state, action) => {
      state.totalGuest = state.totalGuest + action.payload;
    },
    setTotalGuestDecrease: (state, action) => {
      state.totalGuest = state.totalGuest - action.payload;
    },
  },
});

export const {
  setDestination,
  setInForDate,
  setTotalGuestsIncrease,
  setTotalGuestDecrease,
  setDestinationId,
} = allInforBookingSlices.actions;

export default allInforBookingSlices.reducer;
