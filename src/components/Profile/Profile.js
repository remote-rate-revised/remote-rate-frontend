import React, { useEffect, useState } from "react";
import Offer from "../Offer";
import OfferFormModal from "../OfferFormModal";
import {
  Button,
  Modal,
  Card,
  Container,
  CardColumns,
  Jumbotron,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import getDistance from "geolib/es/getDistance";
import ProfileModal from "./ProfileModal";



function Profile(props) {
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

  const [addressToSearch, setAddressToSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  useEffect(() => {
    try {
      getUserData();
    } catch (err) {
      console.log("Component Did Mount Error", err);
    }
  }, [userInfo.email])

  // componentDidMount = async () => {
  // };

  let getUserData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/profile`
    );
    const allData = response.data;
    allData.map((user) => {
      // Database user vs user logged in
      if (user.email === props.email) {
        return setUserInfo(prevState => ({
          ...prevState,
          ...user
        }));
      }
      return user;
    });
  };

  let getWorkLocation2 = (lat, lon) => {
    let distanceToWork = getDistance(
      {
        latitude: userInfo.homeLat,
        longitude: userInfo.homeLon,
      },
      { latitude: lat, longitude: lon }
    );
    let distanceInMiles = distanceToWork / 1609;

    setUserInfo((prevState) => ({
        ...prevState,
        commuteDist: distanceInMiles,
        workLat: lat,
        workLon: lon,
      }
    ));

    return Math.round(distanceInMiles);
  };

  let getLocation = async (e) => {
    //  function will use city stored in state to search api with axios
    e.preventDefault();
    try {
      handleCloseForm();

      let locationIQ = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ}&q=${addressToSearch}&format=json`;

      let locationData = await axios.get(locationIQ);

      setUserInfo((prevState) => ({
          ...prevState,
          email: props.email,
          homeLon: locationData.data[0].lon,
          homeLat: locationData.data[0].lat,
        }
        // showEditModal: prevState.showEditModal,
      ));
    // setShowEditModal()

      handleEditUser(userInfo);
    } catch (err) {
      console.log(err);
    }
  };

  let handleCityInput = (e) => {
    e.preventDefault();
    // setState((prevState) => ({
    //   userInfo: {
    //     ...prevState.userInfo,
    //   },
    //   addressToSearch: e.target.value,
    //   showEditModal: prevState.showEditModal,
    // }));
    setAddressToSearch(e.target.value)

  };

  let handleEmployerInput = (e) => {
    e.preventDefault();
    setUserInfo((prevState) => ({
        ...prevState,
        curEmployer: e.target.value,
      }
      // showEditModal: prevState.showEditModal,
    ));
  };

  let handleSalaryInput = (e) => {
    e.preventDefault();
    setUserInfo((prevState) => ({
        ...prevState,
        curSalary: e.target.value,
      }
      // showEditModal: prevState.showEditModal,
    ));
  };

  let handleIsRemote = (e) => {
    e.preventDefault();
    setUserInfo((prevState) => ({
        ...prevState,
        curRemote: true,
      }
      // showEditModal: prevState.showEditModal,
    ));
  };

  let handleCurCommute = (e) => {
    e.preventDefault();

    setUserInfo((prevState) => ({
        ...prevState,
        commuteDist: e.target.value,
      }
      // showEditModal: prevState.showEditModal,
    ));
  };

  let handleMPG = (e) => {
    e.preventDefault();
    setUserInfo((prevState) => ({
        ...prevState,
        milesPerGal: e.target.value,
      }
      // showEditModal: prevState.showEditModal,
    ));
  };

  let handleShowForm = () => {
    // setState({
    //   showEditModal: true,
    // });
    setShowEditModal(true)
  };

  let handleShowOfferForm = () => {
    // setState({
    //   showOfferModal: true,
    // });
    setShowOfferModal(true)
  };

  let handleCloseOfferForm = () => {
    // setState({
    //   showOfferModal: false,
    // });
    setShowOfferModal(false)
  };

  let handleCloseForm = () => {
    // setState({
    //   showEditModal: false,
    // });
    setShowEditModal(false)
  };

  let deleteOffer = async (user) => {
    try {
      setUserInfo((prevState) => ({
        ...prevState,
        ...user,
      }));
      await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER}/profile/${user._id}`,
        user
      );
    } catch (error) {
      console.log(error);
    }
  };

  let handleEditUser = async (userData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/profile`,
        userData
      );
      getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Jumbotron className="m-3 profileJumbotron">
              <h1>Hello, {props.name} !</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="shadow-lg p-3 mb-5 bg-white rounded">
              <Card.Header>Your Current Information</Card.Header>
              <Card.Body>
                <Col>
                  Home Address: {addressToSearch}
                  <br />
                  Employer: {userInfo.curEmployer}
                  <br />
                  Salary: ${userInfo.curSalary}
                  <br />
                  Remote: {userInfo.curRemote ? "Yes" : "No"}
                </Col>
                <Col>
                  <Button className="m-3" onClick={handleShowForm}>
                    Edit User Info
                  </Button>
                  <Button
                    className="m-3"
                    variant="success"
                    onClick={handleShowOfferForm}
                  >
                    New Offer
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <CardColumns>
              {userInfo.newJob.map((job, idx) => (
                <Offer
                  key={idx}
                  userInfo={userInfo}
                  deleteOffer={deleteOffer}
                  employer={job.newEmployer}
                  salary={job.newSalary}
                  remote={job.newRemote}
                  location={job.newLocation}
                  id={job._id}
                />
              ))}
            </CardColumns>
          </Col>
        </Row>
      </Container>

      {showEditModal ? (
        <Modal show={showEditModal}>
          <ProfileModal
            getLocation={getLocation}
            handleEmployerInput={handleEmployerInput}
            handleCityInput={handleCityInput}
            handleSalaryInput={handleSalaryInput}
            handleIsRemote={handleIsRemote}
            handleMPG={handleMPG}
            handleCloseForm={handleCloseForm}
          />
        </Modal>
      ) : (
        ""
      )}

      {showOfferModal ? (
        <OfferFormModal
          id={userInfo._id}
          getUserData={getUserData}
          userInfo={userInfo}
          newJob={userInfo.newJob}
          showOfferModal={showOfferModal}
          handleCloseOfferForm={handleCloseOfferForm}
          getWorkLocation2={getWorkLocation2}
          // handleEditUser={handleEditUser}
          // updateStateForUs={updateStateForUs}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Profile;
