import React from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

const api = 'http://localhost:8081/orders/add'


class AddOrder extends React.Component {
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
      start:e.target.start.value,
      destination:e.target.destination.value,
      isComplete:false,
      vehicleName:null,
      vehicleType:e.target.vehicleType.value,
      cargoName:e.target.cargoName.value,
      cargoStatus:null,
      cargoWeight:e.target.cargoWeight.value
    })
  }).then(function(response) { 
    if(!response.ok){
    return response.json(); 
  }
  else{
    alert("Order added")
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
          Add Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <Row>
            <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="first">
                  <Form.Label>Start City</Form.Label>
                  <Form.Control type="text" name="start" required placeholder="Start City"/>
                  <Form.Label>Destination</Form.Label>
                  <Form.Control type="text" name="destination" required placeholder="Destination"/>
                  <Form.Label>Cargo</Form.Label>
                  <Form.Control type="text" name="cargoName" required placeholder="Cargo"/>
                  <Form.Label>Cargo Weight</Form.Label>
                  <Form.Control type="text" name="cargoWeight" required placeholder="Cargo Weight"/>
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control as="select" type="text" name="vehicleType" required placeholder="Vegicle Type">
                    <option>Boat</option>
                    <option>Plain</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" type="submit">
                    Add Order
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

export default AddOrder;