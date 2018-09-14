import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

const User = ( props ) =>(
  <li>{props.name}--------{props.email}</li>
)

class UserList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      users:[]
    }
  }
  componentWillMount(){
    fetch('https://randomuser.me/api/?results=50')
      .then(response => response.json())
      .then(users =>{
      
        users.results.forEach(user => {
          let data = {
            name:user.name.first,
            email:user.email,
            password:user.login.password
          }          
          console.log( data )
          this.setState({ users:this.state.users.concat([data]) }) 
        })
    })

  }
  render(){
    console.log( this.state.users.length )
    if( this.state.users.length > 0 ){
      return(
        <div>
          { this.state.users.map(user => <User key={user.password} name={user.name} email={user.email}/>) }
        </div>
      )
  
    }
    return(
      <p>Cargando usuarios...</p>
    )
  }
}
ReactDOM.render(
  <UserList/>,
  document.getElementById('root'),
  null
)
export default UserList;
