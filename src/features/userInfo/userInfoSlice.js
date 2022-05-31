import { createSlice } from "@reduxjs/toolkit";

let initialStateValue = {
  userInfo: {
    email: "",
    homeLat: "",
    homeLon: "",
    workLat: "",
    workLon: "",
    curEmployer: "",
    curSalary: "",
    curRemote: false,
    commuteDist: "",
    milesPerGal: "",
    newJob: [],
    _id: "",
  },
  offer: {
    newSalary: 150000,
    newEmployer: "Best Place of Work",
    newRemote: false,
    newCommuteDist: "",
    newCommuteTime: "",
    newLocation: "",
    workLat: "",
    workLon: "",
    // newJob: this.props.newJob,
    // id: this.props.id,
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialStateValue,
  reducer: {
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    addUserEmail: (state, action) => {
      state.userInfo.email = action.payload
    },
    currentRemote: (state, action) => {
      state.userInfo.curRemote = action.payload
    }
  },
});

// actions
export const {updateUserInfo, addUserEmail, currentRemote} = userInfoSlice.actions;

export default userInfoSlice.reducer;
