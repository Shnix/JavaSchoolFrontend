import React from 'react'
import {Redirect} from 'react-router-dom'
import './Home.css'
import Logo from './Logo.png'

const api = 'http://localhost:8081/security/signin'

class Home extends React.Component {

    constructor(props){
      super(props);
      this.state={
        id:null,
        role:null
      }
      this.handleFormSubmit=this.handleFormSubmit.bind(this)
  
    }

    componentDidMount(){

    }

    handleFormSubmit(e){
      e.preventDefault()
      fetch(api, {
        method: 'POST',
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
      }).then((response) =>{
        if(!response.ok){
          alert("Invalid Login or Password");
        }
        else
        response.json().then((result)=>{
          console.log(result)
          this.setState({
            id:result.id,
            role:result.role
          })
          localStorage.setItem("token",result.token)
          window.location.reload()
        
        })
      })
    
    }
  
    render() {
      
        if(this.state.role=="ROLE_ADMIN"){
        return <Redirect to="/drivers" />
        }
        else if(this.state.role=="ROLE_DRIVER"){
          return <Redirect to={{pathname: '/driverinfo',state: {id:this.state.id} }}/>
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
    <div><h>{this.state.role}</h></div>

  </div>
</div>
      )};
  }
  
  export default Home;