import React from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

const api = 'http://localhost:8080/vehicles/update/'


class UpdateVehicle extends React.Component {
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
        name:e.target.name.value,
        vehicleType:null,
        driversCount:0,
        capacityInTons:e.target.capacityInTons.value,
        cargo:null,
        condition:e.target.condition.value,
        currentCity:e.target.currentCity.value
    })
  }).then(function(response) { 
    if(!response.ok){
    return response.json(); 
  }
  else{
    alert("Vehicle updated")
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
          Update Vehicle
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
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" required placeholder="Name"/>
                  <Form.Label>Capacity(Tons)</Form.Label>
                  <Form.Control type="text" name="capacityInTons" required placeholder="Capacity"/>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="currentCity" required placeholder="City"/>
                  <Form.Label>Vehicle Condition</Form.Label>
                  <Form.Control as="select" type="text" name="condition" required placeholder="Vehicle Condition">
                    <option>Ok</option>
                    <option>Broken</option>
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

export default UpdateVehicle;