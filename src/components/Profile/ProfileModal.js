import { Modal, Form, Button } from "react-bootstrap";
// import { useDispatch } from 'react-redux';
// import { currentRemote } from '../../features/userInfo/userInfoSlice';

export default function ProfileModal(props) {
  return (
    <>
      <Modal.Header>
        <h2>Create New Profile</h2>
      </Modal.Header>
      <Modal.Body>
        <Form className="form" onSubmit={props.getLocation}>
          <Form.Group>
            <Form.Control
              onChange={props.handleCityInput}
              type="text"
              placeholder="Enter Home Address"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={props.handleOnChange}
              type="text"
              name="curEmployer"
              placeholder="Current Employer"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={props.handleOnChange}
              type="text"
              name="curSalary"
              placeholder="Current Salary"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              onChange={props.handleIsRemote}
              label="Currently Working Remote?"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={props.handleOnChange}
              as="select"
              name="milesPerGal"
            >
              <option value="0">Average Fuel Economy</option>
              <option value="15">Less than 15</option>
              <option value="17.5">15-20</option>
              <option value="22.5">20-25</option>
              <option value="27.5">25-30</option>
              <option value="32.5">30-35</option>
              <option value="35">35+</option>
              required
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="outline-danger"
            className="m-1"
            onClick={props.handleCloseForm}
          >
            Close
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
