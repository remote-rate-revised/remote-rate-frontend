import React, { useState, useContext } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";

import { UserContext } from "../context/userContext";

function OfferFormModal(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userInfo: this.props.userInfo,
  //     offer: {
  //       newSalary: 150000,
  //       newEmployer: 'Best Place of Work',
  //       newRemote: false,
  //       newCommuteDist: '',
  //       newCommuteTime: '',
  //       newLocation: '',
  //       workLat: '',
  //       workLon: '',
  //       newJob: this.props.newJob,
  //       id: this.props.id,
  //     },
  //     // email: '',
  //   }
  // }

  let { userInfo, setUserInfo } = useContext(UserContext);
  let { offer, setOffer } = useContext(UserContext);

  let getNewLocation = async () => {
    // function will use city stored in state to search api with axios
    try {
      let locationIQ = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ}&q=${offer.newLocation}&format=json`;
      let newLocationData = await axios.get(locationIQ);
      let lon = newLocationData.data[0].lon;
      let lat = newLocationData.data[0].lat;

      props.getWorkLocation2(lat, lon);

      return { lat, lon };
    } catch (err) {
      console.log("get location error", err);
    }
  };

  let getDistanceTime = (commuteDist) => {
    let totalCommute = commuteDist * 2;

    let hours = totalCommute / 60;

    let totalMinHours = (hours / 2) * 261;
    let totalMaxHours = hours * 261;

    totalMinHours.toFixed(2);
    totalMaxHours.toFixed(2);

    return `${totalMinHours} and ${totalMaxHours} hours`;
  };

  let handleSubmitOffer = async (e) => {
    props.handleCloseOfferForm();
    e.preventDefault();
    try {
      let lat;
      let lon;
      let dataObject = getNewLocation();
      Promise.resolve(dataObject).then((res) => {
        lat = res.lat;
        lon = res.lon;
        let newCommute = props.getWorkLocation2(lat, lon);
        let newCommuteTime = getDistanceTime(newCommute);

        let data = {
          newSalary: offer.newSalary,
          newEmployer: offer.newEmployer,
          newRemote: offer.newRemote,
          newLocation: offer.newLocation,
          newCommuteDist: newCommute,
          newCommuteTime: newCommuteTime,
          workLat: lat,
          workLon: lon,
        };
        let sendMe = userInfo.newJob;
        sendMe.push(data);
        axios.put(
          `${process.env.REACT_APP_BACKEND_SERVER}/newoffer/${userInfo._id}`,
          userInfo
        );
      })
      .then((res) => {
        props.getUserData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  let handleIsNewRemote = (e) => {
    e.preventDefault();
    setOffer((prevState) => ({
      ...prevState,
      newRemote: true,
    }));
  };

  let handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setOffer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal show={props.showOfferModal}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Form className="form" onSubmit={handleSubmitOffer}>
          <Form.Group>
            <Form.Group>
              <Form.Control
                onChange={handleOnChange}
                type="text"
                name="newLocation"
                placeholder="New Offers Address"
              />
            </Form.Group>
            <Form.Control
              onChange={handleOnChange}
              type="text"
              placeholder="New Offers Company Name"
              name="newEmployer"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={handleOnChange}
              type="text"
              name="newSalary"
              placeholder="Offers Salary"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Check onChange={handleIsNewRemote} label="Remote Offer?" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="outline-danger"
            className="m-1"
            onClick={props.handleCloseOfferForm}
          >
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default OfferFormModal;
