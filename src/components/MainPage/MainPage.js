import React from "react";
import firebase from "firebase";
import LoadingPage from '../LoadingPage/LoadingPage.js';
import './MainPage.css';
import Carousel from "react-bootstrap/Carousel";
import im from "../Logos/welcomeimage.jfif";
import im1 from "../Logos/pop.jfif";
import im2 from "../Logos/ppp.jfif";
import { Container } from "react-bootstrap";

class MainPage extends React.Component{
    constructor(){
        super();
        this.state={
            posts:[],
            isLoading:true,
        }
        
    }
    componentDidMount(){
        const ree=firebase.database().ref('Posts');
        ree.on('value',(snapshot)=>{
            let postss=snapshot.val();
            let newpost=[]
            for(let ss in postss){
                newpost.push({
                    postdesc:ss,
                    postdesc:postss[ss].postdesc,
                    postimg:postss[ss].postimg,
                    posttitle:postss[ss].posttitle,
                });

            }
            this.setState({
                posts:newpost,
                isLoading:false,
            })
        });
    }
    render=()=>{
        return(
            this.state.isLoading?<LoadingPage/>:
          <div class="container-fluid" >
              {this.state.posts.map((po)=>{
                  return(
                    <div class="card">
                        <div class="card-header bg-light">
                            <label>{po.posttitle}</label>
                        </div>
                        <div class="card-body">
                            <img class="imgclass" src={po.postimg}></img>
                        </div>
                        <div class="card-footer">
                            <label>{po.postdesc}</label>
                        </div>
                        
                        
                </div>
                  );
              })}
              

</div>

            
            
        );
    }
    
}
export default MainPage;