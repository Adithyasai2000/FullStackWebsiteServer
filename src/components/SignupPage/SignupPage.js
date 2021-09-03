import React from "react";
import './SignupPage.css';
import im from '../Logos/pop.jfif';
import firebaseConfig from "../LoginPage/config";
import 'firebase/database';
import { Button } from "bootstrap";


class SignupPage extends React.Component{
    constructor(){
        super();
        this.state={
            fname:'',
            lname:'',
            number:'',
            gender:'',
            email:'',
            password:'',
            passwordcheck:'',
            refcode:'',
            college:'',
            address:'',
            error:'',
            btnstate:false
        }
        this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifybuttonclicked=this.verifybuttonclicked.bind(this);
    
    }

     verifybuttonclicked(){
      let na=this.state.refcode;
      if (na!=""){
      let l=firebaseConfig.database().ref('UserrefCode/');
      l.child(na).child('uid').once("value").then((data)=>{
        let g=firebaseConfig.database().ref('Users');
        g.child(data.val()).child('fname').once("value").then((data)=>{
          var rst=data.val();
          this.setState({
            btnstate:true
          });
          
          document.getElementById("refnameid").innerHTML = rst;
        }).catch((e)=>{
          document.getElementById("refnameid").innerHTML = e;
        });

      }).catch((e)=>{
        document.getElementById("refnameid").innerHTML = "Invalid Reference Code";
      });
    }

      
    }

   randomString() {  
       var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
       var string_length = 8;  
       var randomstring = '';  

      
      for (var i=0; i<string_length; i++) {  
          var rnum = Math.floor(Math.random() * chars.length);  
              randomstring += chars.substring(rnum,rnum+1);  
        }  
       return randomstring;   
      //document.getElementById("randomfield").innerHTML = randomstring;  
}  

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    async handleSubmit(event){
        event.preventDefault();
        if (this.state.password===this.state.password){
            try{
                firebaseConfig.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
                    window.alert("Signed Up successfully");
                    firebaseConfig.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((data)=>{
                        var id =data.user.uid;
                        window.alert("Signed In");
                        let f=firebaseConfig.database().ref('Users/');
                        f.child(id+"/").set({'uid':id,'fname':this.state.fname,'lname':this.state.lname,'email':this.state.email,'gender':this.state.gender,'number':this.state.number,'refcode':this.state.refcode,'address':this.state.address,'college':this.state.college,'coins':8000,'location':'none'}).then(()=>{
                            window.alert("Profile Upadated");
                            var refid=this.randomString();
                            let l=firebaseConfig.database().ref('UserrefCode/');
                            l.child(refid+"/").set({'uid':id,'refcode':refid});
                            this.setState({
                                  fname:'',
                                  lname:'',
                                  number:'',
                                  gender:'',
                                  email:'',
                                  password:'',
                                  passwordcheck:'',
                                  refcode:'',
                                  college:'',
                                  address:'',
                                  error:''
                            });

                        }).catch((e)=>{
                            window.alert(e);
                        });
                    }).catch((e)=>{
                      window.alert(e);
                    });
                }).catch((e)=>{
        window.alert(e);
      });  
    
            }catch(e){
                window.alert(e);
            }
        }
        else{
            window.alert("Passwords do not match");}
        


    }

    render=()=>{
        return(
            <div class="container">
              <p class="para">
              <h3>SignUp Form</h3>
              </p>
                <div class="rt">
                  <div class="alert alert-warning alert-dismissible fade show" id="refnameid">
                    <strong>Hurray!</strong> Fill all the details
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                  </div>
                  <div class="row">
                    <div class="col">
                      <div class="row">
                        <div class="col">
                          <label class="control-label col-sm-12" for="name"><b>Name:</b></label>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-ms-12">
                          <input type="text" name="fname" class="form-control form-control-lg" id="fname" placeholder="First Name" value={this.state.fname} onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-ms-12">
                          <input type="text" name="lname" class="form-control form-control-lg" id="lname" placeholder="Last Name" value={this.state.lname} onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <label class="control-label col-sm-2" for="email"><b>PhoneNo:</b></label>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-ms-12">
                          <input type="number" name="number" class="form-control form-control-lg" id="number" placeholder="Enter Number" value={this.state.number} onChange={this.handleChange}/>
                        </div>
                      </div>
                     
                      <div class="row">
                        <div class="col">
                          <label class="control-label col-sm-2" for="email"><b>Email:</b></label>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-ms-12">
                          <input type="email" name="email" class="form-control form-control-lg" id="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                        <label class="control-label col-sm-2" for="pwd"><b>Password:</b></label>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-ms-12">
                          <input type="password" name="password" class="form-control form-control-lg" id="pwd" placeholder="Enter password" value={this.state.password} onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-ms-12">
                          <input type="password" name="passwordcheck" class="form-control form-control-lg" id="pwd1" placeholder="Confirm password" value={this.state.passwordcheck} onChange={this.handleChange}/>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="row">
                        <div class="col">
                        <label class="control-label col-sm-12" for="cod"><b>Reference Code:</b></label>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-ms-12">
                          <input type="text" name="refcode" class="form-control form-control-lg" id="cod" placeholder="Enter Code" rows="5" value={this.state.refcode} onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-ms-12">
                          <button type="button" class="btn btn-primary" onClick={this.verifybuttonclicked.bind(this)}>{this.state.btnstate?"Verified":"Verify"}</button>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <label class="control-label col-sm-2" for="br"><b>College:</b></label>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-ms-12">
                          <input list="list" name="college" class="form-control form-control-lg" id="br" placeholder="Choose College" value={this.state.college} onChange={this.handleChange}/>
                          <datalist id="list">
                            <option value="Sreenidhi Institute  of Sceience"/>
                            <option value="Ace Engineering"/>
                            <option value="Sriit"/>
                            <option value="Vnr"/>
                          </datalist>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <label class="control-label col-sm-2" for="pwd"><b>Addrress:</b></label>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-ms-12">
                          <textarea type="text" name="address" class="form-control form-control-lg" id="pwd" placeholder="Enter Address" rows="5" value={this.state.address} onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col">
                          <button onClick={this.handleSubmit} type="submit" class="btn btn-info" id="btn" ><b>SignUp</b></button>
                        </div>
                      </div>

                    </div>
                  </div>
                  
            </div>        
                  
 
            </div>
        );
    }
}

export default SignupPage;