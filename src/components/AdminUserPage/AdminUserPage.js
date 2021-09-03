import React from 'react';
import './AdminUserPage.css';
import firebase from "firebase";
import firebaseConfig from '../LoginPage/config';
import { Glyphicon } from 'react-bootstrap';

class AdminUserPage extends React.Component{
    constructor(){
        super();
        this.state={
            users:[],
        }
        this.addannans=this.addannans.bind(this);
        this.rmvannans=this.rmvannans.bind(this);
    }

    componentDidMount(){
        
        const ree=firebase.database().ref('Users');
        ree.on('value',(snapshot)=>{
            let users=snapshot.val();
            let newState=[];
            for (let ss in users){
                newState.push({
                id:ss,
                fname:users[ss].fname,
                lname:users[ss].lname,
                gender:users[ss].gender,
                email:users[ss].email,
                number:users[ss].number,
                refcode:users[ss].refcode,
                college:users[ss].college,
                address:users[ss].address,
                coins:users[ss].coins
                
                
            });
            }
            this.setState({
                users:newState
            });


        });
    }

    addannans(userid){
      
        
        var t;
        var r=document.getElementById('asd').value
        const f=firebaseConfig.database().ref().child("Users").child(userid);
        f.child('coins').once("value").then((data)=>{
            
             t=parseInt(r)+parseInt(data.val());
            
             f.update({coins:t});
        });
        
        

    }

    rmvannans(userid){
        
        var t;
        var r=document.getElementById('asd').value
        const f=firebaseConfig.database().ref().child("Users").child(userid);
        f.update({coins:"0"}).catch((e)=>{
            window.alert(e);
        });
        
        
        

    }

    search_users() { 

        var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchbar');
  filter = input.value.toUpperCase();
  
  li = document.getElementsByClassName('card');
  console.log(li);

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("h4")[0];
    txtValue = a.textContent || a.innerText;
    
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }

    }

    render=()=>{
        return(
            <div class="containerr" >
                <h1>Admin Users Page</h1>
                <input class="fo" id="searchbar" onChange={this.search_users} type="text"
        name="search" placeholder="Search Users.."/> &emsp;&emsp;&emsp;&emsp;
        <input class="foo" id="asd" type="number" placeholder="Enter RP"></input>
                {this.state.users.map((re)=>{
                    
                    return(
        
                        <div class="cardo" >
                    <div class="card-header">{re.id} &emsp;&emsp;&emsp;&emsp;<b>Anna's: </b>{re.coins}&emsp;&emsp;&emsp;&emsp;
                    &emsp;
                    <button type="button"  onClick={this.addannans.bind(this,re.id)} class="btn btn-primary" >Add</button>&emsp;
                    <button type="submit" onClick={this.rmvannans.bind(this,re.id)} class="btn btn-success">Claim</button></div>
                    <div class="card-body">
                    <h4 class="card-title"><b>{re.fname} {re.lname}</b></h4>
                    <p class="card-text">{re.email} &emsp;&emsp;&emsp;&emsp; {re.number}<br></br><b>Reference Code: {re.refcode}</b><br></br>
                    <i>{re.college}</i><br></br>
                    Address:{re.address}</p>
                </div>
            </div>
    
                        )
                })
                }
                
            </div>
        )
    }
}
export default AdminUserPage;