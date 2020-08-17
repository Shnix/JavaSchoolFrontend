import React from 'react'
import Header from './Header'
import UpdateVehicle from "./UpdateVehicle"
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddVehicle from './AddVehicle';
import Footer from './Footer';

const api = 'http://localhost:8080/complete'



class CompleteOrders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
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
                isLoaded: false,
                error
              });
            }
          )
      }

      

      render() {
          if(!this.state.isLoaded){
              return <div>Wait</div>
          }
          else{
        return(
            <div>
          <Header/>
          <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Start City</th>
                  <th>Destination</th>
                  <th>Vehicle Name</th>
                  <th>Cargo</th>
                  <th>Cargo Weight</th>
                </tr>
              </thead>
        <tbody>
            {this.state.items.map(item=>(
                <tr index={item.id}>
                <td>{item.orderId}</td>
                <td>{item.startCity}</td>
                <td>{item.destinationCity}</td>
                <td>{item.vehicleName}</td>
                <td>{item.cargoName}</td>
                <td>{item.cargoWeight}</td>
                </tr>
            ))}
        </tbody>
        </table>
        <Footer/>
        </div>
        );
    }
}
}
  
  export default CompleteOrders;