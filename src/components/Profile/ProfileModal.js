import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Modal.Header>
          <h2>Create New Profile</h2>
        </Modal.Header>
        <Modal.Body>
          <Form className="form" onSubmit={this.props.getLocation}>
            <Form.Group>
              <Form.Control
                onChange={this.props.handleCityInput}
                type="text"
                placeholder="Enter Home Address"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                onChange={this.props.handleEmployerInput}
                type="text"
                placeholder="Current Employer"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                onChange={this.props.handleSalaryInput}
                type="text"
                placeholder="Current Salary"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                onChange={this.props.handleIsRemote}
                label="Currently Working Remote?"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control onChange={this.props.handleMPG} as="select">
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
              onClick={this.props.handleCloseForm}
            >
              Close
            </Button>
          </Form>
        </Modal.Body>
      </>
    );
  }
}

export default ProfileModal