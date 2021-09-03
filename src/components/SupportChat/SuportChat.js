import React from "react";
import { Route, Router } from "react-router";
import ChatLayout from "../ChatLayout/ChatLayout";
import logo from '../Logos/ll.png'
import firebase from "firebase";
import './SupportChat.css';
import locationlogo from '../Logos/locationlogo.jpg';
import firebaseConfig from '../LoginPage/config';
import SignupPage from "../SignupPage/SignupPage";
import LoadingPage from "../LoadingPage/LoadingPage";
class SupportChat extends React.Component{
    constructor(){
        super();
        this.state=({
                chatlay:false,
                adminusers:[],
                isLoading:false,
        });

        this.handleclick=this.handleclick.bind(this);
    }
    componentDidMount(){
        this.setState({
            isLoading:true,
        })
        const ree=firebase.database().ref('AdminUsers');
        ree.on('value',(snapshot)=>{
            let users=snapshot.val();
            let newState=[];
            for (let ss in users){
                newState.push({
                id:ss,
                adminuid:users[ss].adminuid,
                image:users[ss].image,
                location:users[ss].location,
                shopname:users[ss].shopname,
                
                
                
            });
            }
            this.setState({
                adminusers:newState,
                isLoading:false
            });


        });
    }
    handleclick(){
        if(this.state.chatlay==false){
            this.setState({
                chatlay:true,
            })
        }
        else{
            this.setState({
                chatlay:false,
            })
        }
    }
    render=()=>{
        return(
            <div class="containerdr">
                <h4>Services at this Locations</h4>
                {this.state.isLoading?<LoadingPage/>:
                this.state.adminusers.map((re)=>{return(
                    <div>
                    <div class="row-sm-12">
                    <div class="card" onClick={this.handleclick}>
                        <div class="row">
                            <div class="col-xl-3">
                                <img src={re.image} width="100" height="100"></img>
                            </div>
                            <div class="col-xl-9">
                                <div class="card-header">
                                    {re.shopname}
                                </div>
                                <div class="card-body">
                                    <img src={locationlogo} height="30" width="30"></img><t></t>{re.location}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="row-sm-12">
                    {this.state.chatlay?
                    <ChatLayout message={re.adminuid}/>:null}
                </div>
                </div>

                )})}
            

            </div>
        );
    }
}
export default SupportChat;