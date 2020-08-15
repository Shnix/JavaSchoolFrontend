import React from 'react'
import {Redirect} from 'react-router-dom'
import './Home.css'
import Logo from './Logo.png'

const api = 'http://localhost:8080/security/'

class Home extends React.Component {

    constructor(props){
      super(props);
      this.state={
        user:null
      }
    }

    componentDidMount(){

    }

    handleFormSubmit(e){
      e.preventDefault()
      fetch(api, {
        method: 'PUT',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          id:null,
          login:e.target.login.value,
          password:e.target.password.value,
          role:null
        })
      }).then(function(response) { 
        if(response.ok){
          localStorage.setItem('token','1');
          document.location.reload(true);
      }
      else{
        alert("Invalid Login & Password")
      }
    })
      
    }
  
    render() {
      if(localStorage.getItem("token")){
        return <Redirect to="/drivers" />
      }
      return(
        <div class="wrapper fadeInDown">
  <div id="formContent">

    <div class="fadeIn first">
      <img src={Logo} id="icon" alt="User Icon" />
    </div>

    <form onSubmit={this.handleFormSubmit}>
      <input type="text-a" id="login" class="fadeIn second" name="login" placeholder="login" required/>
      <input type="password" id="password" class="fadeIn third" name="password" placeholder="password" required/>
      <input type="submit" class="fadeIn fourth" value="Log In"/>
    </form>

  </div>
</div>
      )};
  }
  
  export default Home;