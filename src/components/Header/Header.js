import React from "react";
import im from "../Logos/ll4.png"
import coinimage from "../Logos/spinning-coin.gif"
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavDropdown, Navbar,Nav, NavLink,Form,Button} from "react-bootstrap";
import MainPage from "../MainPage/MainPage";
import './Header.css';
import firebase from 'firebase';
import firebaseConfig from "../LoginPage/config";
import logoutimg from '../Logos/logoutimg.jfif';
import { Redirect, Route, Router, Switch } from "react-router";
import Services from '../Services/Services';




class Header extends React.Component{
  
  constructor(){
    super();
    
     
    this.state={
      showLoginPage:false,
      authenticated:false,
      loading:true,
      location:'',
      coins:'',
      loc:[],
      useruid:'',
    }
      this.togglePopup=this.togglePopup.bind(this);
      this.signoutmethod=this.signoutmethod.bind(this);
      this.handleClick=this.handleClick.bind(this);
      this.selectlocation=this.selectlocation.bind(this);
      
    };
    selectlocation(event){
      if(event.target.value!=""){
      this.setState({
        location:event.target.value,
      });
      const f=firebaseConfig.database().ref().child("Users").child(firebaseConfig.auth().currentUser.uid);
      f.update({location:event.target.value}).catch((e)=>{
        window.alert(e);
    });

    window.location.reload();}
    

    }
    componentDidMount(){
     
    
      this.removelistener = firebaseConfig.auth().onAuthStateChanged((user) => {
        if (user) {
          const s=firebase.database().ref("Users").child(user.uid);
          
          let coinss=s.once('value',(snapshot)=> {
            
            let us=snapshot.val();
            
            this.setState({
              authenticated: true,
                  loading: false,
                  coins:us.coins,
                  location:us.location
            });
            
          });

          firebase.database().ref('Locations').once('value',(snapshot1)=>{
             
            let r=snapshot1.val();
            let newstate=[];
            for(let i in r){
              newstate.push({
                locname:i,
                locid:r[i].locid,
                
              });
              
  
            }
            this.setState({
              loc:newstate,
            });
          });
          

          console.log(user.uid);
          
        } else {
          this.setState({
            authenticated: false,
            loading: false,
          });
        }
      })
    }
    handleClick(event){
      console.log(event);
      this.setState({
        location: event,
      });

    }
   
signoutmethod(){
  firebaseConfig.auth().signOut();
 alert("Signed out Successfully");
}
  
  togglePopup(){  
    this.setState({  
         showLoginPage: !this.state.showLoginPage  
    });  
     }
     render(){
return(
  
    <div class="maincontainers">
      <div class="headercontainer">
        <Navbar collapseOnSelect expand="md" bg="blue" variant="light" className="navbarclassname">
          <Navbar.Brand href="#home" color="black">
            <img src={im} width="50" height="50" className="d-inline-block align-top"/>
            <b class="text-dark"> LoBit </b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" color="balck">
            <Nav className="mr-auto" color="black" bg="black">
              <Nav.Link href="/mainpage" color="black">
                <p class="text-dark">There’s a way to do <br></br>it better—find it</p>
              </Nav.Link>
            </Nav>
            <Nav>
              {this.state.authenticated?
              <div class="row">
                <div class="col-xs-4">
                <select class="form-control form-control-lg mb-3" aria-label=".form-select-lg example" value={this.state.location} onChange={this.selectlocation}>
                  {this.state.loc.map((use)=>{
                      return(
                      <option value={use.locname}>{use.locname}</option>
                              )})
                  }
                </select>
                </div>
                <div class="col-xs-4">
                <div class="coinclass">
                  <span><b>{this.state.coins}</b></span>
                  <img src={coinimage} height="30" width="30"></img>
                </div>
                </div>
                <div class="col-xs-4">
                <Nav.Link onClick={this.signoutmethod.bind(this)}>
                  <img src={logoutimg} height="30" width="30"></img>
                </Nav.Link>
                </div>
              </div>:
              <Nav.Link href="/" color="black"><p class="text-dark">ContactUs</p></Nav.Link>
                }
            </Nav>
          </Navbar.Collapse>
        </Navbar>

</div>
<div className="bodycontainer" >
{this.props.childeren}
{this.state.showLoginPage ?  
<MainPage/>  
: null  
}
</div>
</div>
);
}
}
export default Header;