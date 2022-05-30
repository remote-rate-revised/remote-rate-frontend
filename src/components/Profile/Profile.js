import React, { useContext } from "react";
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
import UserInfoContext from '../../context/userInfo';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      addressToSearch: "",
      showEditModal: false,
      showOfferModal: false,
    };
  }
  static contextType = UserInfoContext

  componentDidMount = async () => {
    try {
      await this.getUserData();
    } catch (err) {
      console.log("Component Did Mount Error", err);
    }
  };

  getUserData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/profile`
    );
    const allData = response.data;
    allData.map((user) => {
      // Database user vs user logged in
      if (user.email === this.props.email) {
        return this.setState({
          userInfo: user,
        });
      }
      return user;
    });
  };

  getWorkLocation2 = (lat, lon) => {
    let distanceToWork = getDistance(
      {
        latitude: this.state.userInfo.homeLat,
        longitude: this.state.userInfo.homeLon,
      },
      { latitude: lat, longitude: lon }
    );
    let distanceInMiles = distanceToWork / 1609;

    this.setState((prevState) => ({
      userInfo: {
        ...prevState.userInfo,
        commuteDist: distanceInMiles,
        workLat: lat,
        workLon: lon,
      },
    }));

    return Math.round(distanceInMiles);
  };

  getLocation = async (e) => {
    //  function will use city stored in state to search api with axios
    e.preventDefault();
    try {
      this.handleCloseForm();

      let locationIQ = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ}&q=${this.state.addressToSearch}&format=json`;

      let locationData = await axios.get(locationIQ);

      this.setState((prevState) => ({
        userInfo: {
          ...prevState.userInfo,
          email: this.props.email,

          homeLon: locationData.data[0].lon,
          homeLat: locationData.data[0].lat,
        },
        showEditModal: prevState.showEditModal,
      }));

      let userInfoDistance = {
        homeLat: "1",
        homeLon: "1",
      }


      this.context.setStateInfo(userInfoDistance)
      // console.log('this.state.userInfo', this.state.userInfo);
      // this.context.setStateInfo(this.state.userInfo)


      this.handleEditUser(this.state.userInfo);
    } catch (err) {
      console.log(err);
    }
  };
  handleCityInput = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      userInfo: {
        ...prevState.userInfo,
      },
      addressToSearch: e.target.value,
      showEditModal: prevState.showEditModal,
    }));
  };

  handleEmployerInput = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      userInfo: {
        ...prevState.userInfo,
        curEmployer: e.target.value,
      },
      showEditModal: prevState.showEditModal,
    }));
  };
  handleSalaryInput = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      userInfo: {
        ...prevState.userInfo,
        curSalary: e.target.value,
      },
      showEditModal: prevState.showEditModal,
    }));
  };
  handleIsRemote = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      userInfo: {
        ...prevState.userInfo,
        curRemote: true,
      },
      showEditModal: prevState.showEditModal,
    }));
  };
  handleCurCommute = (e) => {
    e.preventDefault();

    this.setState((prevState) => ({
      userInfo: {
        ...prevState.userInfo,
        commuteDist: e.target.value,
      },
      showEditModal: prevState.showEditModal,
    }));
  };
  handleMPG = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      userInfo: {
        ...prevState.userInfo,
        milesPerGal: e.target.value,
      },
      showEditModal: prevState.showEditModal,
    }));
  };
  handleShowForm = () => {
    this.setState({
      showEditModal: true,
    });
  };

  handleShowOfferForm = () => {
    this.setState({
      showOfferModal: true,
    });
  };

  handleCloseOfferForm = () => {
    this.setState({
      showOfferModal: false,
    });
  };

  handleCloseForm = () => {
    this.setState({
      showEditModal: false,
    });
  };

  deleteOffer = async (user) => {
    try {
      this.setState((prevState) => ({
        userInfo: user,
      }));
      await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER}/profile/${user._id}`,
        user
      );
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = async (userData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER}/profile`,
        userData
      );
      this.getUserData();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // let { userInfo, setUserInfo} = this.context
    // console.log('userInfo', userInfo);
    console.log('this.context', this.context);
    // console.log('UserInfoContext', UserInfoContext);
    return (
      <>
        <Container>
          <Row>
            <Col>
              <Jumbotron className="m-3 profileJumbotron">
                <h1>Hello, {this.props.name} !</h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                <Card.Header>Your Current Information</Card.Header>
                <Card.Body>
                  <Col>
                    Home Address: {this.state.addressToSearch}
                    <br />
                    Employer: {this.state.userInfo.curEmployer}
                    <br />
                    Salary: ${this.state.userInfo.curSalary}
                    <br />
                    Remote: {this.state.userInfo.curRemote ? "Yes" : "No"}
                  </Col>
                  <Col>
                    <Button className="m-3" onClick={this.handleShowForm}>
                      Edit User Info
                    </Button>
                    <Button
                      className="m-3"
                      variant="success"
                      onClick={this.handleShowOfferForm}
                    >
                      New Offer
                    </Button>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <CardColumns>
                {this.state.userInfo.newJob.map((job, idx) => (
                  <Offer
                    key={idx}
                    userInfo={this.state.userInfo}
                    deleteOffer={this.deleteOffer}
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

        {this.state.showEditModal ? (
          <Modal show={this.state.showEditModal}>
            <ProfileModal
              getLocation={this.getLocation}
              handleEmployerInput={this.handleEmployerInput}
              handleCityInput={this.handleCityInput}
              handleSalaryInput={this.handleSalaryInput}
              handleIsRemote={this.handleIsRemote}
              handleMPG={this.handleMPG}
              handleCloseForm={this.handleCloseForm}
            />
          </Modal>
        ) : (
          ""
        )}

        {this.state.showOfferModal ? (
          <OfferFormModal
            id={this.state.userInfo._id}
            getUserData={this.getUserData}
            userInfo={this.state.userInfo}
            newJob={this.state.userInfo.newJob}
            showOfferModal={this.state.showOfferModal}
            handleCloseOfferForm={this.handleCloseOfferForm}
            getWorkLocation2={this.getWorkLocation2}
            // handleEditUser={this.handleEditUser}
            updateStateForUs={this.updateStateForUs}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Profile;
