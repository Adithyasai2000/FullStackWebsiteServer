import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/ContactPage/ContactPage.js';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import LoadingPage from './components/LoadingPage/LoadingPage';
import homelogo from'./components/Logos/house-door.svg';
import chatlogo from './components/Logos/chat-text.svg';
import firebaseConfig from './components/LoginPage/config';
import React from 'react';
import { Route,BrowserRouter as Router } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import AdminUserPage from './components/AdminUserPage/AdminUserPage';
import SignupPage from './components/SignupPage/SignupPage';
import Services from './components/Services/Services';
import ContactPage from './components/ContactPage/ContactPage.js';
import SupportChat from './components/SupportChat/SuportChat';
import BlogPage from './components/BlogPage/BlogPage';
import ServiceComponents from './components/ServiceComponents/ServiceComponents';
import MyOrders from './components/MyOrders/MyOrders';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state=({
      loading:true,
        authenticated:true,
        location:'',
        useruid:''


    });
    this.selectloacation=this.selectloacation.bind(this);
  }
  selectloacation(vv){
    let user=firebaseConfig.auth().currentUser.uid;
    var s=firebaseConfig.database().ref('Users/').child(user);
    s.update({location:vv}).catch((e)=>{
      window.alert(e);
  });
  this.setState({
        location:vv,
  });
    
   window.alert(vv);
    

  }
  componentDidMount(){
    
    this.removelistener = firebaseConfig.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
          useruid:user.uid

        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
   
   
  }

  render=()=>{
    return(
      <div class="scrollbar scrollbar-primary">
        <div class="force-overflow">
        <Header handlelocationChange={this.selectloacation} locationvalue={this.state.location}/>
        {this.state.loading?<LoadingPage/>:this.state.authenticated?
        <div class="containerrr">
          <div class="row">
            <div class="col-sm-1">
              <div class="card">
                <div class="col show-grid">
                  <ul class="list-group list-group-flush">
                  <a href="/home" class="text-secondary">
                    <img src={homelogo} width="40" height="40" class="imageclass" ></img>
                    <text>Home</text>
                    <hr class="solid"></hr>
                    </a>
                  </ul>
                  <ul class="list-group list-group-flush">
                  <a class="list-group-item" href="/supportchat" class="text-secondary">
                    <img src={chatlogo} width="40" height="40" class="imageclass" ></img>
                    <text> Support Chat</text>
                    <hr class="solid"></hr>
                    </a>
                   
                  </ul>
                  <ul class="list-group list-group-flush">
                    <img src={homelogo} width="40" height="40" class="imageclass" ></img>
                    <li class="list-group-item" ><a href="/supportchat" class="text-secondary">Support Chat</a></li>
                  </ul>
                  <ul class="list-group list-group-flush">
                    <img src={homelogo} width="40" height="40" class="imageclass" ></img>
                    <li class="list-group-item" ><a href="/services" class="text-secondary">Services</a></li>
                  </ul>
                  <ul class="list-group list-group-flush">
                    <img src={homelogo} width="40" height="40" class="imageclass" ></img>
                    <li class="list-group-item" ><a href="/myorders" class="text-secondary">My Orders</a></li>
                  </ul>
                  <ul class="list-group list-group-flush">
                    <img src={homelogo} width="40" height="40" class="imageclass" ></img>
                    <li class="list-group-item" ><a href="/contactus" class="text-secondary">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="container">
                <Router>
                  
                  <Route path="/home" component={MainPage}></Route>
                  <Route path="/users" component={AdminUserPage}></Route>
                  <Route path="/signuppage" component={SignupPage}></Route>
                  <Route path="/services" ><Services locationide={this.state.location}/></Route>
                  <Route path="/contactus" component={ContactPage}></Route>
                  <Route path="/supportchat" component={SupportChat}></Route>
                  <Route path="/servicecomponents" component={ServiceComponents}></Route>
                  <Route path="/myorders" component={MyOrders}></Route>
                 
                  
                
                </Router> 
              </div>
            </div>
            <div class="col-sn-3">
              <div class="container">
                <div class="row">

                </div>
                <h2>Log Status   Ljcfsioh jhs dfhbdf</h2>

              </div>
            </div>

            

          </div>
        </div>
        :<LoginPage/>}
      </div>
      </div>
    );
  }  
}

export default App;
