import React, {useContext, useEffect} from 'react';
import '../css/Compare.css';
import axios from 'axios';
import { Accordion, Card, Button, Container } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import { UserContext } from '../context/userContext'

function Compare(props) {

  let { userInfo, setUserInfo } = useContext(UserContext)

  useEffect(() => {
    getUserData();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let getUserData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/profile`);
    const allData = response.data;
    allData.map(user => {
      if (user.email === userInfo.email) {
        return setUserInfo((prevState) => ({
          ...prevState,
          ...user
        }));
      }
      return user;
    })
  }

  let annualGasCost = (distance, gasAPI, carMPG) => {
    gasAPI = 3.50;

    let gallonsPerTrip = distance / carMPG;

    let costPerDay = gallonsPerTrip * 2 * gasAPI;

    let annualCost = costPerDay * 261;
    return annualCost;
  }


  let compareOffer = (offer1, offer2) => {
    let difference = offer1 - offer2;
    return difference;
  }

    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">How to see comparisons</Popover.Title>
        <Popover.Content>
          Click on your offered Company Name below to see the comparison from your profile.
        </Popover.Content>
      </Popover>
    );
    return (
      <>
        <Jumbotron className="p-3 mb-2 m-3 bg-secondary text-white" fluid>
          <h1>Hello!</h1>
          <p>
            Select your Offers below to compare them!
          </p>
          <p>
            <OverlayTrigger 
            trigger="click"   
            placement="right" 
            overlay={popover}>
              <Button 
              className="bg-warning text-dark">
                Click me compare!</Button>
            </OverlayTrigger>
          </p>
        </Jumbotron>
        
        {userInfo.newJob.length ?
          <Container >
            <Accordion className="m-4">
              {userInfo.newJob.map((job, indx) => {
                return (
                  <Card key={indx}>
                    <Accordion.Toggle as={Card.Header} eventKey={String(indx)}>
                      {job.newEmployer}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={String(indx)}>
                      <Card.Body>
                        Net Gain from taking this position: {compareOffer(job.newSalary, userInfo.curSalary)}
                        <br />
                        New Salary: ${job.newSalary}
                        <br />
                        New Job Location: {job.newLocation}
                        <br />
                        Remote: {job.newRemote ? 'Yes' : "No"}
                        <br />

                        {job.newRemote ?
                          '' :
                          <>
                            Annual gas cost: ${Math.round(annualGasCost(job.newCommuteDist, 3.50, userInfo.milesPerGal))}
                            <br />
                            New Commute Distance to Work:  {job.newCommuteDist} Miles
                            <br />
                            Your annual commute will be between {job.newCommuteTime}
                          </>

                        }
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                )
              })}
            </Accordion>
          </Container>

          : ''}
        <footer className="footer"></footer>
      </>
    )
  
}

export default Compare;
