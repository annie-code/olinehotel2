import axios from 'axios';
import React, { Component } from 'react';  
import { Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';  
  
class Hotel extends Component {  
  
  constructor() {  
    super();  
  
    this.state = {  
      HotelName: "",  
      HotelAddress: "",  
      City:"",
      State:"",
      Pincode: "",
      IsActive:"Available",
      isEdit:false
    }  
    
    this.HotelName = this.HotelName.bind(this);  
    this.HotelAddress = this.HotelAddress.bind(this);  
    this.City = this.City.bind(this);  
    this.State = this.State.bind(this);  
    this.Pincode = this.Pincode.bind(this); 
    this.IsActive = this.IsActive.bind(this); 
    this.register = this.register.bind(this);  
  }  
  componentDidMount() {
    var condition =  new URLSearchParams(this.props.location.search).get("HotelName");
    
    if(condition){
      this.editRoom();
    console.log(condition,"checking");
    }
  }
  HotelName(event) {  
    this.setState({ HotelName: event.target.value })  
  }  
  HotelAddress(event) {  
    this.setState({ HotelAddress: event.target.value })  
  } 
  City(event) {  
    this.setState({ City: event.target.value })  
  } 
  State(event) {  
    this.setState({ State: event.target.value })  
  } 
  Pincode(event) {  
    this.setState({ Pincode: event.target.value })  
  }  
  IsActive(event) {  
    this.setState({ IsActive: event.target.value })  
  };
  editRoom(){
    this.setState({ isEdit: true});
    this.setState({ HotelId: new URLSearchParams(this.props.location.search).get("HotelId") })
    this.setState({ HotelName: new URLSearchParams(this.props.location.search).get("HotelName") })    
    this.setState({ HotelAddress: new URLSearchParams(this.props.location.search).get("HotelAddress") })    
    this.setState({ City: new URLSearchParams(this.props.location.search).get("City") })     
    this.setState({ State: new URLSearchParams(this.props.location.search).get("State") })     
    this.setState({ Pincode: new URLSearchParams(this.props.location.search).get("Pincode") })     
    this.setState({ IsActive: new URLSearchParams(this.props.location.search).get("IsActive") })  
 }
  validate(){
    let nameError = "";
    let addressError = "";
    let cityError = "";
    let stateError = "";
    let pincodeError = "";
  
  if(!this.state.HotelName)
    {
      alert("Hotel Name is required");
    }
    if(!this.state.HotelAddress)
    {
      alert("Hotel address is required");
    }
    if(!this.state.City)
    {
      alert("City is required");
    }
    if(!this.state.State)
    {
      alert("State is required");
    }
    if(!this.state.Pincode)
    {
      alert("PinCode is required");
    }
    if( nameError || addressError || cityError || stateError || pincodeError){
      this.setState({nameError,addressError,cityError,stateError,pincodeError});
      return false;
    }
    return true;
  }
  register(event) {  
    if(this.validate())
  {
    fetch('https://localhost:44348/api/hotels', {  
      method: 'post',  
      headers: { 
        'Accept': 'application/jsnpm on',  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({    
        HotelName: this.state.HotelName,  
        HotelAddress: this.state.HotelAddress,  
        City: this.state.City,
        State:this.state.State,
        Pincode:this.state.Pincode,
        IsActive:this.state.IsActive
      })  
    }).then((response) =>{
        if (response.status === 201)  
        this.props.history.push("/AdminDashboard");
        }); 
  }  
}
update(event) {     
  const id = new URLSearchParams(this.props.location.search).get("HotelId")
      fetch('https://localhost:44348/api/hotels/'+id, {

      method: 'PUT',
      
      body: JSON.stringify({   
        HotelId:this.state.HotelId, 
        HotelName: this.state.HotelName,  
        HotelAddress: this.state.HotelAddress,  
        City: this.state.City,
        State:this.state.State,
        Pincode:this.state.Pincode,
        IsActive:this.state.IsActive
      }) ,
      headers: { 
        'Accept': 'application/jsnpm on',  
        'Content-Type': 'application/json'  
      }     
    }).then((response) =>{
        if (response.status === 204)  
            this.props.history.push("/AdminDashboard");
        }); 
    //console.log(this.state?.RoomType,"floor");    
  }  
  render() {   
    return (  
      <div className="app flex-row align-items-center">  
        <Container>  
          <Row className="justify-content-center">  
            <Col md="9" lg="7" xl="6">  
              <Card className="mx-4 w-100">  
                <CardBody className="p-4">  
                  <Form>  
                    <div class="row" className="mb-2 pageheading">  
                      <div class="col-sm-12">                           
                        </div>  
                    </div>  
                    <InputGroup className="mb-3">  
                    <Input className="w-100" type="text"  onChange={this.HotelName} placeholder="Enter Hotel Name" value={this.state.HotelName}/>  
                    </InputGroup>  
                    <InputGroup className="mb-3">  
                    <Input className="w-100" type="text"  onChange={this.HotelAddress} placeholder="Enter Hotel Address" value={this.state.HotelAddress}/>
                    </InputGroup>
                    <InputGroup className="mb-3">  
                    <Input className="w-100" type="text"  onChange={this.City} placeholder="Enter City" value={this.state.City}/>
                    </InputGroup>
                    <InputGroup className="mb-3">  
                    <Input className="w-100" type="text"  onChange={this.State} placeholder="Enter State" value={this.state.State}/>  
                    </InputGroup>
                    <InputGroup className="mb-3">  
                    <Input className="w-100" type="number"  onChange={this.Pincode} placeholder="Enter Pincode" value={this.state.Pincode}/> 
                    </InputGroup>
                    <InputGroup className="mb-3 mh-50">  
                    <select className="w-100" onChange={this.IsActive} value={this.state.IsActive}>
                      <option value="Available">Available</option>
                        <option value="Unavailable">UnAvailable</option>
                        </select>  
                    </InputGroup>     
                    {this.state.isEdit&&<Button  onClick={(e)=>this.update(e)}  color="success" block>Update Hotel</Button>}
                    {!this.state.isEdit&&<Button  onClick={this.register}  color="success" block>Add Hotel</Button>}
                  </Form>  
                </CardBody>  
              </Card>  
            </Col>  
          </Row>  
        </Container>  
      </div>  
    );  
  }  
}  
  
export default Hotel;