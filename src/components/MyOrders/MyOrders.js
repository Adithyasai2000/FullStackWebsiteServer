import React from 'react';
import firebaseConfig from '../LoginPage/config';
import './MyOrders.css';
class MyOrders extends React.Component{
    constructor(){
        super();
        this.state={
            userid:'',
            orders:[],
            sortedorders:[],
            
        };
    }
    search_users() { 
       // alert("jdgc");
       

        var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchbar');
  filter = input.value.toUpperCase();
  alert(filter);
  
  li = document.getElementsByClassName('cardpo');
  console.log(li) ;
  console.log("ikkada");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('h6')[0];

    
    console.log(a);
    console.log("ikkada ra");
    
    txtValue = a.textContent||a.innerText;
    
   
    if (txtValue.toUpperCase().indexOf(filter) > -1 && txtValue!=null ) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }

    }
    componentDidMount(){
        //alert(firebaseConfig.auth().currentUser.uid);
        let f=firebaseConfig.database().ref('Orders').child('UserOrders').child(firebaseConfig.auth().currentUser.uid);
        f.on('value',(snapshot)=>{
            let s=snapshot.val();
            let orders1=[];
            
            //alert(s);
            for(let i in s){
                orders1.push({
                    orderkey:s[i].orderkey,
                    orderid:s[i].orderid,
                    orderstate:s[i].orderstate,
                    serviceid:s[i].serviceid,
                    servicetitle:s[i].servicetitle,
                    servicedesc:s[i].servicedesc,
                    specifications:s[i].specifications,
                    ordernumber:s[i].ordernumber,
                    attachments:s[i].attachments,
                    useruid:s[i].useruid,


                });
              
                
            }
            this.setState({
                orders:orders1,
                sortedorders:orders1,
        }
        );
        });
       // this.search_users();
    }
    render=()=>{
        return(
            
                <div class="scrollbar scrollbar-primary">
                        <div class="force-overflow" id="scroll">
                            <input type="text" id="searchbar" onChange={this.search_users}></input>
                            <div class="row">
                            
                            {this.state.sortedorders.map((ordd)=>{
                                return(
                                    <div class="cardpo">
                            <div class="card-header">
                        <div className="progress">
                            
                            <div class="progress-bar" role="progressbar" style={{width:ordd.orderstate+"%",}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">
                                <h6>{ordd.orderstate=='n'?"Waiting..to Accept Order":ordd.orderstate=='25'?"Order Accepeted":ordd.orderstate=='50'?"In Progress":ordd.orderstate=='75'?"Out For Delivery":ordd.orderstate=='100'?"Delivered":"Accepted Order"}</h6>
                            </div>
</div>
                        </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <img src="https://www.framestr.com/wp-content/uploads/2017/08/Work-Order-Forms.png"></img>
                            </div>
                            <div class="col">
                                <table class="table table-bordered">
                                    <thead>
                                        <th>ORDERID</th>
                                        <th>ORDERNUMBER</th>
                                        <th>SERVICEID</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>{ordd.orderkey}</td>
                                        <td>{ordd.ordernumber}</td>
                                        <td>{ordd.serviceid}</td>
                                        
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered">
                                    <thead>
                                        <th>SPECIFICATIONS</th>
                                        <th>ADDRESS</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>{ordd.specifications}</td>
                                        <td>{ordd.address}</td>
                                        
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <alert class="alert alert-danger">The Order will be delivered to above address</alert>
                                </div>

                            </div>
                            

                        </div>
                        <div class="row">
                            <table class="table table-bordered">
                                    <thead>
                                        <th>SERVICENAME</th>
                                        <th>SERVICEDESC</th>
                                        <th>AMOUNT($)</th>
                                        <th>TRANSACTIONID</th>
                                        <th>COPIES</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>{ordd.servicetitle}</td>
                                        <td>{ordd.servicedesc}</td>
                                        <td>{ordd.amount}</td>
                                        <td>4666</td>
                                        <td>4666</td>
                                        </tr>
                                    </tbody>
                                </table>

                        </div>
                        

                    </div>
                    
                </div>


                                );
                                
                                
                            })}
                            </div>
                            <div class="row">

                        
                {this.state.orders.map((ord)=>{
                   
                    return(
                        <div class="cardli">
                            <div class="card-header">
                        <div class="progress">
                            
                            <div class="progress-bar" role="progressbar" style={{width:ord.orderstate+"%",}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">
                                {ord.orderstate=='n'?"Waiting..to Accept Order":ord.orderstate=='25'?"Order Accepeted":ord.orderstate=='50'?"In Progress":ord.orderstate=='75'?"Out For Delivery":ord.orderstate=='100'?"Delivered":"Accepted Order"}
                            </div>
</div>
                        </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <img src="https://www.framestr.com/wp-content/uploads/2017/08/Work-Order-Forms.png"></img>
                            </div>
                            <div class="col">
                                <table class="table table-bordered">
                                    <thead>
                                        <th>ORDERID</th>
                                        <th>ORDERNUMBER</th>
                                        <th>SERVICEID</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>{ord.orderkey}</td>
                                        <td>{ord.ordernumber}</td>
                                        <td>{ord.serviceid}</td>
                                        
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="table table-bordered">
                                    <thead>
                                        <th>SPECIFICATIONS</th>
                                        <th>ADDRESS</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>{ord.specifications}</td>
                                        <td>{ord.address}</td>
                                        
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <alert class="alert alert-danger">The Order will be delivered to above address</alert>
                                </div>

                            </div>
                            

                        </div>
                        <div class="row">
                            <table class="table table-bordered">
                                    <thead>
                                        <th>SERVICENAME</th>
                                        <th>SERVICEDESC</th>
                                        <th>AMOUNT($)</th>
                                        <th>TRANSACTIONID</th>
                                        <th>COPIES</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>{ord.servicetitle}</td>
                                        <td>{ord.servicedesc}</td>
                                        <td>{ord.amount}</td>
                                        <td>4666</td>
                                        <td>4666</td>
                                        </tr>
                                    </tbody>
                                </table>

                        </div>
                        

                    </div>
                    
                </div>

                    )
                })}
                </div>
              </div>
                </div>
         
        )
    }

}
export default MyOrders;