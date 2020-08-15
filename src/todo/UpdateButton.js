import React from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

const api = 'http://localhost:8080/drivers/update/'


class UpdateButton extends React.Component {
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
    body:JSON.stringify({
      id:0,
      firstName:e.target.firstName.value,
      lastName:e.target.lastName.value,
      driverType:null,
      workingHours:0,
      status:null,
      currentCity:e.target.currentCity.value,
      vehicle:null,
      order:null
    })
  }).then(function(response) { 
    if(!response.ok){
    return response.json(); 
  }
  else{
    alert("Driver updated")
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
          Update Driver
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <Row>
            <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="first">
                <Form.Label>Id</Form.Label>
                  <Form.Control type="text" name="id" required disabled defaultValue={this.props.id} placeholder="id"/>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name="firstName" required placeholder="First Name"/>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lastName" required placeholder="Last Name"/>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="currentCity" required placeholder="City"/>
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

export default UpdateButton;