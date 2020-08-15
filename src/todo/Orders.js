import React from 'react'
import Header from './Header'
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddOrder from './AddOrder';
import Footer from './Footer'

const api = 'http://localhost:8080/orders/'


class Orders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          addModalShow : false,
          updateModalShow : false,
          id:0
        };
        this.componentDidMount=this.componentDidMount.bind(this)
      }


    
      componentDidMount() {
        fetch(api)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

      render() {
        let addModalClose =()=> this.setState({addModalShow:false});
        return(
            <div>
          <Header/>
          <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Start City</th>
                  <th>Destination</th>
                  <th>Complete</th>
                  <th>Vehicle</th>
                  <th>Vehicle Type</th>
                  <th>Cargo</th>
                  <th>Cargo Status</th>
                  <th>Cargo Weight</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
        <tbody>
            {this.state.items.map(item=>(
                <tr index={item.id} delete={this.deleteBlock}>
                <td>{item.id}</td>
                <td>{item.start}</td>
                <td>{item.destination}</td>
                <td>{item.isComplete ? 'Yes':'No'}</td>
                <td>{item.vehicleName}</td>
                <td>{item.vehicleType=='plain'? 'Plain' : 'Boat'}</td>
                <td>{item.cargoName}</td>
                <td>{item.cargoStatus}</td>
                <td>{item.cargoWeight}</td>
                </tr>
            ))}
            <ButtonToolbar>
        <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
        Add Order
        </Button>
        <AddOrder update={this.componentDidMount} show={this.state.addModalShow} onHide={addModalClose}/>
      </ButtonToolbar>
        </tbody>
        </table>
        <Footer/>
        </div>
        );
    }
}
  
  export default Orders;