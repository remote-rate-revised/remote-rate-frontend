import React, { useContext, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { UserContext } from "../context/userContext";

function Offer(props) {
  let [buttonClicked, setButtonClicked] = useState(false);
  let { userInfo, setUserInfo } = useContext(UserContext);

  let handleDelete = () => {
    let newOffer = userInfo.newJob.filter((job) => job._id !== props.job._id);
    setUserInfo((prevState) => ({
      ...prevState,
      newJob: newOffer,
    }));
    setButtonClicked(true);
  };
  
  if (buttonClicked) {
    props.deleteOffer(userInfo);
    setButtonClicked(false);
  }
  return (
    <Card>
      <Card.Header>{props.job.newEmployer}</Card.Header>
      <Card.Body>
        Salary: {props.job.newSalary}
        <br />
        Remote: {props.job.newRemote ? "Yes" : "No"}
      </Card.Body>
      <Card.Footer>
        {props.newLocation}

        <br />
        <Button variant="outline-danger" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default Offer;
