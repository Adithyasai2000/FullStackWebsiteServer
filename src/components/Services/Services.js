import React from "react";
import im from "../Logos/pp.jfif";
import firebaseConfig from "../LoginPage/config";
import firebase from "firebase";
import './Services.css';
import { Route, Router } from "react-router";
import BlogPage from "../BlogPage/BlogPage";
import back from "../Logos/backbtnlogo.jpg";
import ServiceComponents from "../ServiceComponents/ServiceComponents";

class Services extends React.Component{
    constructor(props){
        super(props);
        this.state={
            services:[],
            services1:[],
            locationide:'',
            servicebtnclick:false,
            availbtnclick:false,
            serviceid:'',
            serviceuserid:'',
           
        };
        this.handleClickBtn=this.handleClickBtn.bind(this);
        this.handleBack=this.handleBack.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleServiceComponentBack=this.handleServiceComponentBack.bind(this);
        
    }
    handleServiceComponentBack(){
        this.setState({
            availbtnclick:false,
        })

    }
    handleClick(serviceid){
        this.setState({
            availbtnclick:true,
            serviceid:serviceid,
        })
    }
    handleBack(){
       
            this.setState({
                servicebtnclick:false,
            })
        
    }
    handleClickBtn(serviceid){
        this.setState({
            serviceuserid:serviceid,
        })
       
        firebase.database().ref('Services').child(this.state.locationide).child(serviceid).once('value',(snapshot)=>{
            let sr=snapshot.val();
            let newswervice=[];
            for(let i in sr){
                newswervice.push({
                    serviceid:i,
                    servicedesc:sr[i].servicedesc,
                    serviceimg:sr[i].serviceimg,
                    servicetitle:sr[i].servicetitle,
                });

            }
            this.setState({
                services1:newswervice,
                servicebtnclick:true,
            });

        });
       


    }
    componentDidMount(){
       
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid).child('location').once('value',(snapshot)=>{
            firebase.database().ref('Locations').child(snapshot.val()).child('locid').once('value',(snapshot)=>{
                //window.alert("ikkada");
                this.setState({
                    locationide:snapshot.val(),
                });
                var ree=firebase.database().ref('Services').child(snapshot.val());
                ree.on('value',(snapshot)=>{
                    let servi=snapshot.val();
                    let newState=[];
                    for (let ss in servi){
                        newState.push({
                        serviceid:ss,
                        });
                    }
                    this.setState({
                        services:newState
                    });
                });
            });
        });
    }
    render=()=>{
        return(
            <div class="con">
                {this.state.servicebtnclick?
                this.state.availbtnclick?<ServiceComponents serviceuserid={this.state.serviceuserid} serviceid={this.state.serviceid} locationide={this.state.locationide}  handleServiceComponentBack={this.handleServiceComponentBack}/>:
                <div>
                    <div class="renn">
                        <div>
                            <img src={back} height="50" width="50" onClick={this.handleBack}></img>
                        </div>
                    <div class="card-columns">
                        {this.state.services1.map((re)=>{
                                return(
                                    <div class="card bg-secondary">
                                        <div class="card-body text-center">
                                            <div class="card">
                                                <img class="card-img-top" src={re.serviceimg} alt="Card image"/>
                                                <div class="card-body">
                                                    <h4 class="card-title">{re.servicetitle}</h4>
                                                    <p class="card-text">{re.servicedesc}</p>
                                                    <a  onClick={this.handleClick.bind(this,re.serviceid)} class="btn btn-primary">Avail Now</a>
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                            )
                        }
                    </div>
                </div>
                </div>:
                <div>
                <h4>Shops at This Location</h4>
                {this.state.services.map((use)=>{
                    return(
                        <div>
                            <div class="row-sm-12">
                                <div class="card" >
                                    <div class="row">
                                        <div class="col-xl-3">
                                            <img src="https://zxr.io/projects/images/uid.logo.draft.shadow.00a.jpg" width="100" height="100"></img>
                                        </div>
                                        <div class="col-xl-9">
                                            <div class="card-header">
                                                <a href={"#"+use.serviceid} onClick={this.handleClickBtn.bind(this,use.serviceid)}>{use.serviceid}</a>
                                            </div>
                                            <div class="card-body">
                                                <img src="https://zxr.io/projects/images/uid.logo.draft.shadow.00a.jpg" height="30" width="30"></img><t></t>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row-sm-12">
                                    
                            </div>
                        </div>
                    )
                }
            )}</div>}
        </div>   
        );
    }
}
export default Services;