import React from "react";
import firebaseConfig from "../LoginPage/config";
import LoadingPage from "../LoadingPage/LoadingPage";
import '../LoginPage/LoginPage.css';
import googlelogo from '../Logos/googlelogo.jpg';
import facebooklogo from '../Logos/facebooklogo.jpg';
import linkedinlogo from '../Logos/linkedinlogo.jpg';
import backbtnlogo from '../Logos/backbtnlogo.jpg';
import SignupPage from "../SignupPage/SignupPage";
class LoginPage  extends  React.Component{
    constructor(){
        super();
        this.state=({
            adminmail:'',
            adminpassword:'',
            loading:false,
            signinbtnclicked:false,
        });
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleSignup=this.handleSignup.bind(this);
        this.handleSignup1=this.handleSignup1.bind(this);
    }
    handleforgot(){
        window.alert("You need to contact the Developer");
    }
    handleSignup(){
        this.setState({
            signinbtnclicked:true,
        });

    }
    handleSignup1(){
        this.setState({
            signinbtnclicked:false,
        });

    }
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
      async handleSubmit(event){
            
            this.setState({
                loading:true,
            });
         
          if(this.state.adminmail!='' && this.state.adminpassword!=''){
             

            let f=firebaseConfig.auth();
        
            f.signInWithEmailAndPassword(this.state.adminmail,this.state.adminpassword).catch((e)=>{
                window.alert(e);

            });
            this.setState({
                loading:false,
            });
      

          }
          else{
              window.alert("Fill All details");
              this.setState({
                loading:false,
            });
          }
      }

    render=()=>{
        return(
        <div class="somecontainer">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <a href=""><img src="https://bit.ly/3bnxvbb" class="img1"/></a>
                        <h3>Institutions</h3>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <a href=""><img src="https://bit.ly/3w38mds" class="img1"/></a>
                        <h3>Learner</h3>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                            <a href=""><img src="https://bit.ly/3eEWrgr" class="img1"/></a>
                            <h3>Instructer</h3>
                    </div>
                </div>
                <div class="col">
                    <div class="card" onFocus="true">
                        <a href="" onFocus="false"><img src="https://bit.ly/3hquElH" class="img1"/></a>
                        <h3>Admin</h3>
                    </div>
                </div>
            </div>
            {this.state.loading?<div><LoadingPage/></div>:
            this.state.signinbtnclicked?
            <div class="row">
                <div class="col-sm-1"><img src={backbtnlogo} height="60" width="60" onClick={this.handleSignup1}></img></div>
                <div class="col-sm-11"><SignupPage/></div>
            </div>:
            <div class="row">
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-header">
                            <label>Sign in to your Account</label>

                        </div>
                        <div class="card-body">
                            <div class="col-sm-12">
                                <div class="row">
                                    <input type="username" name="adminmail" placeholder="username" class="form-control form-control-lg" value={this.state.adminmail} onChange={this.handleChange}/>
                                </div>
                                <div class="row">
                                    <input type="password" name="adminpassword" placeholder="password" class="form-control form-control-lg" value={this.state.adminpassword} onChange={this.handleChange}/>
                                </div>
                                <div class="row">
                                    <label bg="lightblue" onClick={this.handleforgot}><a> Forget Password</a> </label>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <button type="password" name="" placeholder="password" class="btn btn-warning" onClick={this.handleSubmit}>Sign In</button>
                                    </div>
                                    
                                </div>
                                <div class="row">
                                    <label>or Sign in via  </label>
                                </div>
                                <div class="row">
                                    <img src={googlelogo} width="50" height="50" class="image" ></img>
                                    <img src={facebooklogo} width="50" height="50" class="image" ></img>
                                    <img src={linkedinlogo} width="50" height="50" class="image"></img>
                                </div>
                                
                            </div>
                        </div>
                        <div class="card-footer">
                            <a><label onClick={this.handleSignup}>Don't Have an Account?Signup</label></a>

                        </div>

                    </div>
                        
                
                </div>
            

            </div>
    }
        </div>
        );
    }

}
export default LoginPage;