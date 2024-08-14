import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentRoomState = {
  currentRoom: any;
  infoLocation: any;
};

const initialState: CurrentRoomState = {
  currentRoom: [],
  infoLocation: null,
};

const roomSlices = createSlice({
  name: "roomSlice",
  initialState,
  reducers: {
    setCurrentRoom: (state, action: PayloadAction<any>) => {
      state.currentRoom = action.payload;
    },
    setInfoLocationRoom: (state, action: PayloadAction<any>) => {
      state.infoLocation = action.payload;
    },
  },
});

export const { setCurrentRoom, setInfoLocationRoom } = roomSlices.actions;

export default roomSlices.reducer;
