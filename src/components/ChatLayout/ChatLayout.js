import React from "react";
import firebaseConfig from "../LoginPage/config";
import sendlogo from '../Logos/sendlogo.jpg';
import './ChatLayout.css';
class ChatLayout extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            adminuid:props.message,
            messages:[],
            message:'',
            uuid:firebaseConfig.auth().currentUser.uid,
        });
        this.handlesendmessage=this.handlesendmessage.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }   
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    handlesendmessage(){
        let fi=firebaseConfig.database().ref('Messages/');
        let h=fi.push().key;
        var d=new Date();
        fi.child(this.state.uuid+'/').child(this.state.adminuid+'/').child(h+'/').set({messageid:h,message:this.state.message,touid:this.state.adminuid,fromuid:this.state.uuid,time:d.getHours()+":"+d.getMinutes(),date:d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear(),state:"sent"});
        fi.child(this.state.adminuid+'/').child(this.state.uuid+'/').child(h+'/').set({messageid:h,message:this.state.message,touid:this.state.adminuid,fromuid:this.state.uuid,time:d.getHours()+":"+d.getMinutes(),date:d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear(),state:"sent"});
        this.setState({
            message:'',
        });

    }
    componentDidMount(){
            let f=firebaseConfig.database().ref('Messages/').child(firebaseConfig.auth().currentUser.uid+'/').child(this.state.adminuid+'/');
            f.on('value',(snapshot)=>{
                let messages=snapshot.val();
                let newState=[];
                for (let ss in messages){
                    newState.push({
                    messageid:ss,
                    message:messages[ss].message,
                    touid:messages[ss].touid,
                    fromuid:messages[ss].fromuid,
                    time:messages[ss].time,
                    date:messages[ss].date,
                    state:messages[ss].state,
                    
                    
                });

                this.setState({
                    messages:newState,
                });

            }});

    }
    render=()=>{
        return(
            <div class="card">
                <div class="card-body">
                    <div class="chatcontainer">
                    {this.state.messages.map((msg)=>{
                        return(
                            <div class="rowy">
                                {msg.touid==this.state.uuid?
                                <div class="messagebox">
                                    <div class="ght">
                                    <label>Admin</label>
                                    </div>    
                                <label class="messagebox"><b>{msg.message}</b></label>
                                
                                </div>:
                                <div class="messagebox1">
                                    <div class="kl">
                                        <label class="kl">You</label>
                                    </div>
                                <label class="messagebox1">{msg.message}</label>
                                </div>}
                                

                            </div>
                        );
                    })}
                    
                </div>
                <div class="card-header">
                    <div class="row">
                        <div class="col-xl-11">                     
                            <input name="message" type="text" class="form-control form-control-lg" placeholder="Enter Message" value={this.state.message} onChange={this.handleChange}></input>
                        </div>
                        <div class="col-xl-1">
                            <img onClick={this.handlesendmessage} src={sendlogo} height="30" width="30"></img>
                        </div>
                    </div>
                    
                    
                </div>

                
            </div>
            </div>
      );
    }
    
}
export default ChatLayout;