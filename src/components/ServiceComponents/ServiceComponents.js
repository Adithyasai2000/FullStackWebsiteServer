import React from 'react';
import firebase from 'firebase';
import backimg from '../Logos/backbtnlogo.jpg';
import { Toast } from 'bootstrap';
import firebaseConfig from '../LoginPage/config';
import GooglePayButton  from '@google-pay/button-react';



const canMakePaymentCache = 'canMakePaymentCache';
/** Launches payment request flow when user taps on buy button. */
function onBuyClicked() {
    if (!window.PaymentRequest) {
      console.log('Web payments are not supported in this browser.');
      return;
    }
  
    // Create supported payment method.
    const supportedInstruments = [
      {
        supportedMethods: ['https://tez.google.com/pay'],
        data: {
          pa: 'audittyasae@oksbi',
          pn: 'Merchant Name Adi',
          tr: '1234ABCD',  // Your custom transaction reference ID
          url: 'http://localhost:3001/services#gzEejbcdi6d3pUQkiISb4qFLtdi1',
          mc: '1234', //Your merchant category code
          tn: 'Purchase in Merchant',
        },
      }
    ];
  
    // Create order detail data.
    const details = {
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: '10.01', // sample amount
        },
      },
      displayItems: [{
        label: 'Original Amount',
        amount: {
          currency: 'INR',
          value: '10.01',
        },
      }],
    };
  
    // Create payment request object.
    let request = null;
    try {
      request = new PaymentRequest(supportedInstruments, details);
    } catch (e) {
      console.log('Payment Request Error: ' + e.message);
      return;
    }
    if (!request) {
      console.log('Web payments are not supported in this browser.');
      return;
    }
  
    var canMakePaymentPromise = checkCanMakePayment(request);
    canMakePaymentPromise
        .then((result) => {
            alert(request);
            alert(result);
          showPaymentUI(request, result);
        })
        .catch((err) => {
          console.log('Error calling checkCanMakePayment: ' + err);
        });
  }

  // Global key for canMakepayment cache.



 function checkCanMakePayment(request) {
  // Check canMakePayment cache, use cache result directly if it exists.
  if (sessionStorage.hasOwnProperty(canMakePaymentCache)) {
    return Promise.resolve(JSON.parse(sessionStorage[canMakePaymentCache]));
  }

  // If canMakePayment() isn't available, default to assume the method is
  // supported.
  var canMakePaymentPromise = Promise.resolve(true);

  // Feature detect canMakePayment().
  if (request.canMakePayment) {
    canMakePaymentPromise = request.canMakePayment();
  }

  return canMakePaymentPromise
      .then((result) => {
        // Store the result in cache for future usage.
        sessionStorage[canMakePaymentCache] = result;
        return result;
      })
      .catch((err) => {
        console.log('Error calling canMakePayment: ' + err);
      });
}
  
function showPaymentUI(request, canMakePayment) {
    if (!canMakePayment) {
      //handleNotReadyToPay();
      alert("Cant mak payments");
      return;
    }
   
    // Set payment timeout.
    let paymentTimeout = window.setTimeout(function() {
      window.clearTimeout(paymentTimeout);
      request.abort()
          .then(function() {
            console.log('Payment timed out after 20 minutes.');
          })
          .catch(function() {
            console.log('Unable to abort, user is in the process of paying.');
          });
    }, 20 * 60 * 1000); /* 20 minutes */
   
    request.show()
        .then(function(instrument) {
   
          window.clearTimeout(paymentTimeout);
          processResponse(instrument); // Handle response from browser.
        })
        .catch(function(err) {
          console.log(err);
        });
   }

   

 function processResponse(instrument) {
    var instrumentString = this.instrumentToJsonString(instrument);
    console.log(instrumentString);
   
    fetch('/buy', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: instrumentString,
    })
        .then(function(buyResult) {
          if (buyResult.ok) {
            return buyResult.json();
          }
          console.log('Error sending instrument to server.');
        })
        .then(function(buyResultJson) {
          completePayment(instrument, buyResultJson.status, buyResultJson.message);
   
        })
        .catch(function(err) {
          console.log('Unable to process payment. ' + err);
        });
   }
   
 
   function completePayment(instrument, result, msg) {
    instrument.complete(result)
        .then(function() {
          console.log('Payment succeeds.');
          console.log(msg);
        })
        .catch(function(err) {
          console.log(err);
        });
   }
class ServiceComponents extends React.Component{
    constructor(props){
        super(props);
        this.state={
            attachments:[],
            servicetitle:'',
            servicedesc:'',
            serviceimg:'',
            serviceid:'',
            serviceprice:'',
            copies:'1',
            filename:"Choose File",
            btntext:"Upload",
            filevalue:[],
            orderid:'',
            specifications:'',
            address:'',
            coins:'',
            username:'',
            paymentmode:'',
            
        };
        this.handleEvent=this.handleEvent.bind(this);
        this.handleEvent1=this.handleEvent1.bind(this);
        this.uploadbtnclick=this.uploadbtnclick.bind(this);
        //this.somefunction=this.somefunction.bind(this);
        this.updatingurl=this.updatingurl.bind(this);
        //this.j=this.j.bind(this);
        this.placingorder=this.placingorder.bind(this);
       /* this.handleChange=this.handleChange.bind(this);
        this.onBuyClicked=this.onBuyClicked.bind(this);
        this.checkCanMakePayment=this.checkCanMakePayment.bind(this);
        this.showPaymentUI=this.showPaymentUI.bind(this);
        this.handleNotReadyToPay=this.handleNotReadyToPay.bind(this);
        this.processResponse=this.processResponse.bind(this);
        this.completePayment=this.completePayment.bind(this);*/
        

    }
    placingorder(){
        let f=firebaseConfig.database().ref('Orders').child('UserOrders').child(firebaseConfig.auth().currentUser.uid);
        let f1=firebaseConfig.database().ref('Orders').child('AdminOrders').child(this.props.serviceuserid);
        let orderkey=f.push().key;
        f.child(orderkey).set({orderkey:orderkey,servicetitle:this.state.servicetitle,serviceid:this.state.serviceid,servicedesc:this.state.servicedesc,attachments:this.state.filevalue,orderstate:"n",ordernumber:this.state.orderid,specifications:this.state.specifications,useruid:firebaseConfig.auth().currentUser.uid,address:this.state.address,username:this.state.username});
       f1.child(orderkey).set({orderkey:orderkey,servicetitle:this.state.servicetitle,serviceid:this.state.serviceid,servicedesc:this.state.servicedesc,attachments:this.state.filevalue,orderstate:"n",ordernumber:this.state.orderid,specifications:this.state.specifications,useruid:firebaseConfig.auth().currentUser.uid,address:this.state.address,username:this.state.username});
       alert("Order Placed");

    }
    handleChange(event){
       // var a=parseInt(this.state.serviceprice)*parseInt(this.state.copies==''?'0':this.state.copies);
        this.setState({
            [event.target.name]:event.target.value,
           // totalco:a,
        });
        
         

    }
    
   
    uploadbtnclick(){
       
        

    }
    updatingurl(t){
        
        //let t=[];
        //t.push({attachmentid:attchmentid,filevalue:downloadurl});
        this.setState({
            filevalue:t
        });
        window.alert("HI");
        alert(this.state.filevalue);

    }
    handleEvent1(filename,attchmentid,attachmenttype,event){
        let t=[];
        t.push({attachmentid:attchmentid,attachmentname:filename,filevalue:event.target.value});
                this.setState({
                    filevalue:t

                });

    }
    handleEvent(filename,attchmentid,attachmenttype,event){
        let l;
        let u;
       // alert(attachmenttype);
        
        if(event.target.files!=null){
        let h=event.target.files[0];
        window.alert(this.props.serviceuserid+"isdfh");
        const r=firebase.storage().ref('Orders').child(this.props.serviceuserid).child(this.state.orderid).child(filename);
        document.getElementById('idprogressbtn'+attchmentid).innerHTML='uploading...';
        r.put(h)
        .then((value)=>{
            document.getElementById('idprogressbtn'+attchmentid).innerHTML='uploaded';
              document.getElementById(attchmentid).innerHTML=event.target.files[0].name;
              r.getDownloadURL().then((ur)=>{
                let t=this.state.filevalue;
                t.push({attachmentid:attchmentid,attachmentname:filename,filevalue:ur});
                this.setState({
                    filevalue:t

                });
                //alert(this.state.filevalue);
                 
                //k(ur);
            });

        });
        function j(urlo){
            //alert(urlo);
            let t=[];
            t.push({attachmentid:attchmentid,filevalue:urlo});
            //this.updatingurl.bind(this,t);
       
        //  alert(this.state.filevalue);

        }

        //alert(l);
        //this.updatingurl();
        
        
       
        
        
    }
        

    }
    componentDidMount(){
      
        let orderid=firebase.database().ref('Services').push().key;
        
        this.setState({
            orderid:orderid,
        });
        firebase.database().ref('Users').child(firebaseConfig.auth().currentUser.uid).once('value',(snapshot)=>{
            let f=snapshot.val();
            this.setState({
                username:f.fname,
                coins:f.coins,
            });
        });
        firebase.database().ref('Services').child(this.props.locationide).child(this.props.serviceuserid).child(this.props.serviceid).once('value',(snapshot)=>{
            let dtata=snapshot.val();
            this.setState({
                serviceid:dtata.serviceid,
                servicedesc:dtata.servicedesc,
                serviceimg:dtata.serviceimg,
                servicetitle:dtata.servicetitle,
                serviceprice:dtata.serviceprice,
            })
            
        }).then(()=>{
            this.setState({
                totalco:this.state.serviceprice,
            })
        });
        firebase.database().ref('Attachments').child(this.props.serviceid).child('attachments').once('value',(snapshot)=>{
            let data=snapshot.val();
            let newstate=[];
            for(let i in data){
                newstate.push({
                    attachmentid:i,
                    attachmenttitle:data[i].attachmenttitle,
                    attachmenttype:data[i].attachmenttype,
                    attachmentdesc:data[i].attachmentdesc,
                })
            }
            this.setState({
                attachments:newstate,
            })
        });
    }
    render=()=>{
        return(
            <div class="containersd">
                <div class="con"> 
                    <img onClick={this.props.handleServiceComponentBack} src={backimg} height="50" width="50"></img>
                </div>
                <div class="btn btn-light">
                    <div class="row">
                        <div class="col-xl-4">
                            <label class="bt"><span class="glyphicon glyphicon-envelope"></span>Order Number:</label>
                        </div>
                        <div class="col-xl-8">
                            <label class="btn btn-light"><strong>{this.state.orderid}</strong></label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4">
                            <label class="bt"><span class="glyphicon glyphicon-envelope"></span>Service Name:</label>
                        </div>
                        <div class="col-xl-8">
                            <label class="btn btn-light"><strong>{this.state.servicetitle}</strong></label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4">
                            <label class="btn">Service Description:</label>
                        </div>
                        <div class="col-xl-8">
                            <label class="btn btn-light"><strong>{this.state.servicedesc}</strong></label>
                        </div>
                    </div>
                   
                </div>
                <div class="row">
                    <alert class="alert alert-primary">
                        The Uploaded File will be Transfered with End to End Cryptograpy Encrption<br></br>
                        The Uploaded File is automatically deleted once the order delivered to you successfully
                    </alert>
                </div>
                
                <div >
                    {this.state.attachments.map((att)=>{
                        return(
                            <div class="card padding">
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">{att.attachmenttitle}</span>
                                        </div>
                                        {att.attachmenttype=='file'?
                                        <div class="custom-file md-12">
                                        <div class="custom-file md-12"> 
                                            <input type={att.attachmenttype} class="custom-file-input" id="inputGroupFile01" onChange={this.handleEvent.bind(this,att.attachmenttitle,att.attachmentid,att.attachmenttype)}/>
                                            <label class="custom-file-label" id={att.attachmentid} for="inputGroupFile01">{this.state.filename}</label>  
                                        </div>-
                                        <div>
                                            <button class="btn btn-info"  id={"idprogressbtn"+att.attachmentid}>Upload</button>
                                        </div>
                                        </div>:
                                        <div class="custom-file xl-12">
                                            <input class="form-control" type={att.attachmenttype}  onChange={this.handleEvent1.bind(this,att.attachmenttitle,att.attachmentid,att.attachmenttype)}></input>

                                        </div>
                                        }
                                        
                                    </div>
                                    <div class="alert alert-danger">
                                        {att.attachmentdesc}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleFormControlTextarea3">Specifications</label>
                        <textarea name="specifications" placeholder="Customize your Order by providing specifications" onChange={this.handleChange.bind(this)} value={this.state.specifications} class="form-control" id="exampleFormControlTextarea3" cols="52" rows="7"></textarea>
                    </div>
                    <div class="col">
                        <label for="exampleFormControlTextarea3">Address</label>
                        <textarea name="address" placeholder="Delivery Address" onChange={this.handleChange.bind(this)} value={this.state.address} class="form-control" id="exampleFormControlTextarea3" cols="52" rows="7"></textarea>
                    </div> 
                    <div class="col">
                    <label for="exampleFormControlTextarea3">Copies</label>
                        <input  value={this.state.copies} class="form-control" name="copies" onChange={this.handleChange.bind(this)} type="number" id="exampleFormControlTextarea3" rows="7"></input>
                        
                    </div>  
                </div>
                <div class="row">
                    <div class="col">
                    <label for="exampleFormControlTextarea3">Amount</label>
                    <hr></hr>
                    <text>Price:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;({this.state.serviceprice} * {this.state.copies} Copies)&emsp;&emsp;&emsp;&emsp;<b color="#FFFFFF">${parseInt(this.state.copies)*parseInt(this.state.serviceprice)}</b></text>
                    <hr></hr>
                    <text>You have Coins:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;@{this.state.coins}</text>
                    <hr></hr>
                    <text>Discount:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;-${parseInt(this.state.coins)/1000}</text>
                    <hr></hr>
                    <text>Total amount:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<b>${(parseInt(this.state.copies)*parseInt(this.state.serviceprice))-(parseInt(this.state.coins)/1000)}</b></text>
                    <hr></hr>
                    </div>
                    <div class="col">
                        <label for="exampleFormControlTextarea3">Transaction Mode</label>
                        <div class="row" onChange={this.handleChange.bind(this)}>
                            <div class="col">
                                <label name="paymode">
                            <input type="radio" name="paymentmode" value='cash'></input>
                                CASH</label>
                            </div>
                            <div class="col">
                                <label name="paymode">
                                <input type="radio" name="paymentmode" value='gpay'></input>
                                GPAY</label>
                            </div>
                        </div>
                        <div class="row">
                            {this.state.paymentmode!=''?this.state.paymentmode=='cash'?
                            <button type="button" class="btn btn-dark" onClick={this.placingorder}>Place Order</button>
                        :
                        <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '1',
            currencyCode: 'INR',
            countryCode: 'IN',
          },
          shippingAddressRequired: true,
          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
            console.log('Payment Authorised Success', paymentData)
            return { transactionState: 'SUCCESS'}
          }
        }
        onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData)
            return { }
          }
        }
        existingPaymentMethodRequired='false'
        buttonColor='black'
        buttonType='Buy'
      />
                        :<div></div>}
                        </div>
                    </div>
                    
                   
                </div>
                
                <div>
                
                </div>
            
            </div>

        )
    }
}

export default ServiceComponents;