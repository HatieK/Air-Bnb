import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import roomSlices from "./slices/roomBasedOnLocationSlice";
import infoBookingSlice from "./slices/infoBookingSlice";
import rentalRoomBasedOnApiSlice from "./slices/rentalRoomBasedOnApiSlice";

const rootReducer = combineReducers({
  userAuthentication: userSlice,
  roomBasedLocation: roomSlices,
  infoBooking: infoBookingSlice,
  infoRentalBooking: rentalRoomBasedOnApiSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
