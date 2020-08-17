import React from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

const api = 'http://localhost:8080/driverinfo/updateStatus/'


class UpdateDriverStatus extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

handleSubmit(e) {
  e.preventDefault();
  fetch(api+this.props.id, {
    method: 'PUT',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(e.target.status.value)
  }).then(function(response) { 
    if(!response.ok){
    return response.json(); 
  }
  else{
    alert("Status updated")
  }
})
.then(function(data) {
  var message = "";
  for (var i = 0; i < data.errors.length; i++) {
    message += data.errors[i]+ "\n";
  }
  alert(message)
})
.catch(e=> {
})
};



  render() {
    return(
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <Row>
            <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="first">
                  <Form.Label>Driver Status</Form.Label>
                  <Form.Control as="select" type="text" name="status" required placeholder="status">
                    <option>Rest</option>
                    <option>Driving</option>
                    <option>Busy</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={()=>{this.props.update();this.props.onHide();}}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}
}

export default UpdateDriverStatus;