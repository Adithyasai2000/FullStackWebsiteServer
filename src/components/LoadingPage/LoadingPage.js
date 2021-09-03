import React from "react";
import loadingimage from "../Logos/loadingimage.gif";
class LoadingPage extends React.Component{
    constructor(){
        super();

    }
    render=()=>{
        return(
            <div class="spinner-grow" role="status">
            <span class="visually-hidden">...</span>
          </div>
        );
    }

}
export default LoadingPage;