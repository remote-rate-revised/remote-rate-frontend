import React, { useEffect, useState, useContext } from "react";
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

// Context
import { UserContext } from "../../context/userContext";

function Profile(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);

  let { userInfo, setUserInfo, addressToSearch, setAddressToSearch } = useContext(UserContext);

  useEffect(() => {
    try {
      getUserData();
    } catch (err) {
      console.log("Component Did Mount Error", err);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let getUserData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/profile`
    );
    const allData = response.data;

    allData.map((user) => {
      // Database user vs user logged in
      if (user.email === props.email) {
        setUserInfo((prevState) => ({
          ...prevState,
          ...user,
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
    }));

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
      }));

      handleEditUser(userInfo);
    } catch (err) {
      console.log(err);
    }
  };

  let handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  let handleCityInput = (e) => {
    e.preventDefault();
    setAddressToSearch(e.target.value);
  };

  let handleIsRemote = (e) => {
    e.preventDefault();
    setUserInfo((prevState) => ({
      ...prevState,
      curRemote: true,
    }));
  };

  let handleShowForm = () => setShowEditModal(true)

  let handleShowOfferForm = () => setShowOfferModal(true)

  let handleCloseOfferForm = () => setShowOfferModal(false)

  let handleCloseForm = () => setShowEditModal(false)

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
              <h1>Hello, Welcome to Remote Rate!</h1>
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
              {userInfo.newJob.length
                ? userInfo.newJob.map((job, idx) => (
                    <Offer
                      key={idx}
                      userInfo={userInfo}
                      deleteOffer={deleteOffer}
                      job={job}
                    />
                  ))
                : ""}
            </CardColumns>
          </Col>
        </Row>
      </Container>

      {showEditModal ? (
        <Modal show={showEditModal}>
          <ProfileModal
            getLocation={getLocation}
            handleOnChange={handleOnChange}
            handleCityInput={handleCityInput}
            handleIsRemote={handleIsRemote}
            handleCloseForm={handleCloseForm}
          />
        </Modal>
      ) : (
        ""
      )}

      {showOfferModal ? (
        <OfferFormModal
          getUserData={getUserData}
          showOfferModal={showOfferModal}
          handleCloseOfferForm={handleCloseOfferForm}
          getWorkLocation2={getWorkLocation2}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Profile;
