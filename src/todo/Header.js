import React from 'react';
import {Link} from 'react-router-dom'
import Title from './Title.png'

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Header extends React.Component {
  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
}

logout(){
    localStorage.removeItem('token');
    sleep(500);
}

  render() {
     
        return(
          <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
  <div class="container">
    <a class="navbar-brand" href="/drivers">
          <img src={Title} alt=""/>
        </a>
  </div>
          <nav class="my-2 my-md-0 mr-md-3">
            <a class="p-2 text-dark" href="http://localhost:3000/orders">Orders</a>
            <a class="p-2 text-dark" href="http://localhost:3000/drivers">Drivers</a>
            <a class="p-2 text-dark" href="http://localhost:3000/vehicles">Vehicles</a>
          </nav>
          <Link to="/"><button class="btn btn-outline-primary" onClick={this.logout}>Sign out</button></Link>
        </div>
      );
      }
}

export default Header;
