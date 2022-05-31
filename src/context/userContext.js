import { useState, createContext } from "react";

export const UserContext = createContext({});

export default function UserProvider(props) {
  const [userInfo, setUserInfo] = useState({
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
  });
  const [offer, setOffer] = useState({
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
    id: '',
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, offer, setOffer }}>
      {props.children}
    </UserContext.Provider>
  );
}
