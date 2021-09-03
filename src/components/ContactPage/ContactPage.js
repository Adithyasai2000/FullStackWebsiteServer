import { Button } from "bootstrap";
import React from "react";
import { Container } from "react-bootstrap";
import companylogo from "../Logos/ll.png"
import "./ContactPage.css";


class ContactPage extends React.Component{
    constructor(props){
        super(props);

    }
    render=()=>{
        return(
        <div class="maincontainer">
            <div class="page-header">
                <h1>Contact Us</h1>
            </div>
            <div class="row">
                <div class="col">
                    <div class="row">
                        <img src={companylogo} height="380" width="380"></img>
                    </div>
                    <div>
                        <span><strong>Lobit</strong></span>
                    </div>

                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                    <div class="row">
                        <div class="col-xl-4">
                            <label for="inputsm">Email</label>
                        </div>
                        <div class="col-xl-8">
                            <input class="form-control form-control-lg" id="inputsm" type="text"></input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4">
                            <label for="inputdefault">Subject</label>
                        </div>
                        <div class="col-xl-8">
                            <input class="form-control form-control-lg" id="inputdefault" type="text"></input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4">
                            <label for="inputlg">Message</label>
                        </div>
                        <div class="col-xl-8">
                            <textarea class="form-control form-control-lg"  rows="5" id="inputlg" type="text" ></textarea>
                        </div>
                    </div>
                    <div class="gh">
                        <button type="button" class="btn btn-success">Submit</button>
                    </div>
                    </div>
                    </div>
                    
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <h5>Follow us on</h5>
                        </div>
                        <div class="card-body">
                            <img src={companylogo} height="30" width="30" class="imageclass"></img>
                            <img src={companylogo} height="30" width="30" class="imageclass"></img>
                            <img src={companylogo} height="30" width="30" class="imageclass"></img>
                            <img src={companylogo} height="30" width="30" class="imageclass"></img>
                            <img src={companylogo} height="30" width="30" class="imageclass"></img>

                        </div>

                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <h5>Contact us</h5>
                        </div>
                        <div class="card-body">
                            <p>
                            +91 9381864308<br></br>
                            +91 8096513244
                            </p>

                        </div>

                    </div>
                    
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            <h5>Address</h5>
                        </div>
                        <div class="card-body">
                            <p>
                            HNo:11-10-876,sai nagar,saroornagar,
hyderabad,PIN:500035
                            </p>

                        </div>      

                    </div>
                    
                </div>
            </div>
         
          
          <div class="rr"> 

    </div>
    </div>
          
        );
    }
}
export default ContactPage;