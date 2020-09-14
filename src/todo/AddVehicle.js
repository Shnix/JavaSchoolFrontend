import React from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

const api = 'http://localhost:8081/vehicles/add'


class AddButton extends React.Component {
  constructor(props){
    super(props);
  }

 


handleSubmit(e) {
  e.preventDefault();
  fetch(api, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      id:0,
      name:e.target.name.value,
      vehicleType:e.target.vehicleType.value,
      driversCount:0,
      capacityInTons:e.target.capacityInTons.value,
      cargo:null,
      condition:null,
      currentCity:e.target.currentCity.value
    })
  }).then(function(response) { 
    if(!response.ok){
    return response.json(); 
  }
  else{
    alert("Vehicle added")
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
}



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
          Add Vehicle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <Row>
            <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="first">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" required placeholder="Name"/>
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control as="select" type="text" name="vehicleType" required placeholder="Vehicle Type">
                    <option>Plain</option>
                    <option>Boat</option>
                  </Form.Control>
                  <Form.Label>Capacity(Tons)</Form.Label>
                  <Form.Control type="number" name="capacityInTons" required placeholder="Capacity"/>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="currentCity" required placeholder="City"/>
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" type="submit">
                    Add Vehicle
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={()=>{this.props.update(); this.props.onHide();}}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
}
}

export default AddButton;