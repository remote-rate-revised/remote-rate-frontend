import React, { useState, createContext } from "react";

const UserInfoContext = createContext();

export class UserInfoProvider extends React.Component {
  state = {
    stateInfo : {
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
        newJob: this.props.newJob,
        id: this.props.id,
      },
    },
    stateOffer: {
      newSalary: 150000,
      newEmployer: "Best Place of Work",
      newRemote: false,
      newCommuteDist: "",
      newCommuteTime: "",
      newLocation: "",
      workLat: "",
      workLon: "",
      newJob: this.props.newJob,
      id: this.props.id,
    },
  };

  setStateInfo = (stateInfo) => {
    console.log('stateInfo', stateInfo);
    this.setState((prevState) => ({
      stateInfo: {
        ...prevState.stateInfo
      }

    }));
  };
  
  setOffer = (stateOffer) => {
    this.setState((prevState) => ({stateOffer}));
  };

  render() {
    console.log(this)
    const { stateInfo } = this.state;
    const { setStateInfo, setOffer } = this

    return (
      <UserInfoContext.Provider value={{ stateInfo, setStateInfo, setOffer }}>
        {this.props.children}
      </UserInfoContext.Provider>
    );
  }
}


export default UserInfoContext;
