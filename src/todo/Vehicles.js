import React from 'react'
import Header from './Header'
import UpdateVehicle from "./UpdateVehicle"
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddVehicle from './AddVehicle';
import Footer from './Footer';

const api = 'http://localhost:8080/vehicles/'

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Vehicles extends React.Component {

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

      deleteBlock(id) {
        var arr = this.state.items;
        arr.splice(id,1);
        this.setState({items:arr});
      }


      deleteVehicle(id) {
        if(window.confirm('Are you sure?')){
        fetch(api+id, {
          method: "DELETE",
          header: {'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        }).then(function(response) { 
          if(!response.ok){
          return response.json(); 
        }
        else{
          alert("Vehicle deleted")
        }
      })
        .then(function(data) {
          var message = data.message;
          alert(message)
      })
      .catch(e=> {
      })
    };
        sleep(500).then(() => {
          this.componentDidMount();
        })
      }
      

      render() {
        let addModalClose =()=> this.setState({addModalShow:false});
        let updateModalClose =()=>this.setState({updateModalShow:false});
        return(
            <div>
          <Header/>
          <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Vehicle Type</th>
                  <th>Condition</th>
                  <th>Amount of Drivers</th>
                  <th>Capacity</th>
                  <th>Cargo</th>
                  <th>Current City</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
        <tbody>
            {this.state.items.map(item=>(
                <tr index={item.id} delete={this.deleteBlock}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.vehicleType}</td>
                <td>{item.condition}</td>
                <td>{item.driversCount}</td>
                <td>{item.capacityInTons}</td>
                <td>{item.cargo!=null ? item.cargo : 'No Cargo'}</td>
                <td>{item.currentCity}</td>
                <th><button type="submit" class="btn btn-outline-danger" onClick={()=>this.deleteVehicle(item.id)}><ins>Delete</ins></button></th>
                <th>
                  <Button variant='outline-success' onClick={()=>this.setState({updateModalShow:true,id:item.id})}>
                    Update
                    </Button>
                    <UpdateVehicle update={this.componentDidMount} id={this.state.id} show={this.state.updateModalShow} onHide={updateModalClose}/></th>
                </tr>
            ))}
            <ButtonToolbar>
        <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
        Add Vehicle
        </Button>
        <AddVehicle update={this.componentDidMount} show={this.state.addModalShow} onHide={addModalClose}/>
      </ButtonToolbar>
        </tbody>
        </table>
        <Footer/>
        </div>
        );
    }
}
  
  export default Vehicles;