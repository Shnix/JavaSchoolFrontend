import React from "react";
import UpdateButton from "./UpdateButton"
import {Button, ButtonToolbar} from 'react-bootstrap';
import AddButton from './AddButton';

const api = 'http://localhost:8080/drivers/'

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Driver extends React.Component{
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
                isLoaded: false,
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


      deleteDriver(id) {
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
          alert("Driver deleted")
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
          
        <tbody>
            {this.state.items.map(item=>(
                <tr index={item.id} delete={this.deleteBlock}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.status}</td>
                <td>{item.driverType}</td>
                <td>{item.workingHours}</td>
                <td>{item.vehicle!=null ? item.vehicle : 'No Vehicle'}</td>
                <td>{item.currentCity}</td>
                <td>{item.order!=null ? item.order : 'No Order'}</td>
                <th><button type="submit" class="btn btn-outline-danger" onClick={()=>this.deleteDriver(item.id)}><ins>Delete</ins></button></th>
                <th>
                  <Button variant='outline-success' onClick={()=>this.setState({updateModalShow:true,id:item.id})}>
                    Update
                    </Button>
                    <UpdateButton update={this.componentDidMount} id={this.state.id} show={this.state.updateModalShow} onHide={updateModalClose}/></th>
                </tr>
            ))}
            <ButtonToolbar>
        <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>
        Add Driver
        </Button>
        <AddButton update={this.componentDidMount} show={this.state.addModalShow} onHide={addModalClose}/>
      </ButtonToolbar>
        </tbody>
        
        )
            
    }
  
}

export default Driver;