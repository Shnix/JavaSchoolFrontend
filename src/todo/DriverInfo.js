import React from 'react'
import {Link} from 'react-router-dom'
import Title from './Title.png'
import Footer from './Footer'
import {Button, ButtonToolbar} from 'react-bootstrap';
import UpdateDriverStatus from './UpdateDriverStatus'
import UpdateCargoStatus from './UpdateCargoStatus';

const api = 'http://localhost:8081/driverinfo/'

const delApi = 'http://localhost:8081/driverinfo/done/'

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


class DriverInfo extends React.Component {

    constructor(props){
        super(props);
        this.state={
            driver:null,
            addModalShow : false,
            updateModalShow : false,
            isLoaded: false,
            error:null
        }
        this.componentDidMount=this.componentDidMount.bind(this)
    }

    

    logout(){
      localStorage.removeItem('token');
      sleep(500);
  }

  markDone(id) {
    if(window.confirm('Are you sure?')){
    fetch(delApi+id, {
      method: "DELETE",
      header: {'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    }).then(function(response) { 
      if(!response.ok){
      return response.json(); 
    }
    else{
      alert("Order marked as done")
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

    componentDidMount() {
        fetch(api+this.props.location.state.id)
          .then((response) =>{
            return response.json();
          })
          .then((data) => {
              this.setState({driver:data,isLoaded:true})
              console.log(data)
          });
      }

  render() {
    let addModalClose =()=> this.setState({addModalShow:false});
    let updateModalClose =()=>this.setState({updateModalShow:false});
    if(!this.state.isLoaded){
        return <div>wait</div>
    }
    else{
    return(
        <body>
        <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
  <div class="container">
    <a class="navbar-brand">
          <img src={Title} alt=""/>
        </a>
  </div>
          <Link to="/"><button class="btn btn-outline-primary" onClick={this.logout}>Sign out</button></Link>
        </div>
    
        <main role="main">
          <div class="jumbotron">
            <div class="container">
              <h1 class="display-3">Hello, {this.state.driver.firstName} {this.state.driver.lastName}</h1>
            </div>
          </div>
    

          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <h2>Driver Info</h2>
                <p>Driver ID : {this.state.driver.id}</p>
                <p>Vehicle Name : {this.state.driver.vehicleName!=null?this.state.driver.vehicleName:'No Vehicle'}</p>         
                <p>Status : {this.state.driver.status}</p>           
                <a class="btn btn-info" onClick={()=>this.setState({updateModalShow:true})}>
                    Change Status
                    </a>
                    <UpdateDriverStatus update={this.componentDidMount} id={this.state.driver.id} show={this.state.updateModalShow} onHide={updateModalClose}/>
              </div>

              <div class="col-md-4">
                <h2>Cargo Info</h2>
                <p>Cargo : {this.state.driver.cargoName!=null?this.state.driver.cargoName:'No cargo'}</p>      
                <p>Cargo Weight : {this.state.driver.cargoWeight!=null?this.state.driver.cargoWeight:' '}</p>    
                <p>Cargo Status : {this.state.driver.cargoStatus!=null?this.state.driver.cargoStatus:' '}</p>    
                <p><a class="btn btn-info" onClick={()=>this.setState({addModalShow:true})}>Change Cargo Status</a></p>     
                <UpdateCargoStatus update={this.componentDidMount} id={this.state.driver.id} show={this.state.addModalShow} onHide={addModalClose}/> 
              </div>

              <div class="col-md-4">
                <h2>Order Info</h2>
                <p>Order ID : {this.state.driver.orderId!=null?this.state.driver.orderId:'No Order'}</p>
                <p>From : {this.state.driver.startCity!=null?this.state.driver.startCity:' '}</p>         
                <p>To : {this.state.driver.destinationCity!=null?this.state.driver.destinationCity:' '}</p>    
                <p><a class="btn btn-info" onClick={()=>this.markDone(this.state.driver.orderId)} role="button">Mark as done</a></p>      
              </div>

            
              
            </div>
    
            <hr/>
    
          </div>
    
        </main>
    
       <Footer/>
    </body>
    )
}
  }
  
}

export default DriverInfo;