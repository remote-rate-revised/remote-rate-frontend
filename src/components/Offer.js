import React, { useContext, useState} from 'react';
import { Button, Card } from 'react-bootstrap';
import { UserContext } from '../context/userContext'


function Offer(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userInfo: {
  //       ...this.props.userInfo,
  //     },
  //     buttonClicked: false,
  //   }
  // }

  let [ buttonClicked, setButtonClicked ] = useState(false)


  let { userInfo, setUserInfo } = useContext(UserContext)


  let handleClick = () => {
    let newOffer = userInfo.newJob.filter(job => job._id !== this.props.id);
    setUserInfo((prevState) => ({
      ...prevState,
      newJob: newOffer,
    }))

    setButtonClicked(true)

    // this.setState({
    //   userInfo: {
    //     ...userInfo,
    //     newJob: newOffer,
    //   },
    //   buttonClicked: true,
    // })
    // this.props.deleteOffer(this.state.userInfo);

  }


    if (buttonClicked) {
      props.deleteOffer(userInfo);
      setButtonClicked(false)
      // this.setState({
      //   buttonClicked: false,
      // });
    };
    return (
      <Card>

        <Card.Header>
          {props.employer}
        </Card.Header>
        <Card.Body>
          Salary: {props.salary}
          <br />
          Remote: {props.remote ? 'Yes' : 'No'}
        </Card.Body>
        <Card.Footer>
          {props.location}

          <br />
          <Button 
          variant="outline-danger" 
          onClick={handleClick} >
            Delete
            </Button>

        </Card.Footer>
        
      </Card>
    )
  
}

export default Offer;
