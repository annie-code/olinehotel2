import axios from 'axios';
import React, { Component,useLocation } from 'react';  
import { Button, Card, CardFooter, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';  
  
class Room extends Component {  
  
  constructor() {  
    
    super();    
    this.state = {  
      FloorNumber:'',  
      RoomNumber:'',
      RoomType: 'A/C',  
      RoomCapacity:'',
      CostPerDay:'',
      RoomStatus: 'Available',
      HotelId:'',
      isEdit:false
    }  
    this.FloorNumber = this.FloorNumber.bind(this);
    this.RoomNumber = this.RoomNumber.bind(this);  
    this.RoomType = this.RoomType.bind(this);  
    this.RoomCapacity = this.RoomCapacity.bind(this);  
    this.CostPerDay = this.CostPerDay.bind(this);  
    this.RoomStatus = this.RoomStatus.bind(this);
    this.register = this.register.bind(this);  
  }  
  componentDidMount() {
    var condition =  new URLSearchParams(this.props.location.search).get("RoomNumber");
    
    if(condition){
      this.editRoom();
    console.log(condition,"checking");
    }
  }
  
  FloorNumber(event) {  
    this.setState({ FloorNumber: event.target.value })  
  }
  RoomNumber(event) { 
    this.setState({ RoomNumber: event.target.value })  
  }  
  RoomType(event) {  
    this.setState({ RoomType: event.target.value })  
  } 
  RoomCapacity(event) {  
    this.setState({ RoomCapacity: event.target.value })  
  } 
  CostPerDay(event) {  
    this.setState({ CostPerDay: event.target.value })  
  } 
  RoomStatus(event) {  
    this.setState({ RoomStatus: event.target.value })  
  }
  
   editRoom(){
      this.setState({ isEdit: true});
      this.setState({ RoomId: new URLSearchParams(this.props.location.search).get("RoomId") })
      this.setState({ FloorNumber: new URLSearchParams(this.props.location.search).get("FloorNumber") })    
      this.setState({ RoomNumber: new URLSearchParams(this.props.location.search).get("RoomNumber") })    
      this.setState({ RoomType: new URLSearchParams(this.props.location.search).get("RoomType") })     
      this.setState({ RoomCapacity: new URLSearchParams(this.props.location.search).get("RoomCapacity") })     
      this.setState({ CostPerDay: new URLSearchParams(this.props.location.search).get("CostPerDay") })     
      this.setState({ RoomStatus: new URLSearchParams(this.props.location.search).get("RoomStatus") })  
   }

  validate(){
    
  if(!this.state.FloorNumber)
    {
      alert("Enter Floor Number");
    }
    if(!this.state.RoomNumber)
    {
      alert("Enter Room Number");
    }
    if(!this.state.RoomCapacity)
    {
      alert("Enter capacity of room");
    }
    if(!this.state.CostPerDay)
    {
      alert("Enter Cost Per Day");
    }    
    return true;    
  }
  
 
  register(event) {  
    if(this.validate())
    {      
      fetch('https://localhost:44348/api/rooms', {  
      method: 'post',  
      headers: { 
        'Accept': 'application/jsnpm on',  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({    
        FloorNumber: this.state.FloorNumber,
        RoomNumber : this.state.RoomNumber,  
        RoomType: this.state.RoomType,  
        RoomCapacity: this.state.RoomCapacity,
        CostPerDay:this.state.CostPerDay,
        RoomStatus:this.state.RoomStatus,
        HotelId:new URLSearchParams(this.props.location.search).get("HotelId")
      })  
    }).then((response) =>{
        if (response.status === 201)  
            this.props.history.push("/AdminDashboard");
        });
      } 
  }  
 
update(event) {     
  const id = new URLSearchParams(this.props.location.search).get("RoomId")
      fetch('https://localhost:44348/api/rooms/'+id, {

      method: 'PUT',
      
      body: JSON.stringify({    
        FloorNumber: this.state.FloorNumber,
        RoomNumber : this.state.RoomNumber,  
        RoomType: this.state.RoomType,  
        RoomCapacity: this.state.RoomCapacity,
        CostPerDay:this.state.CostPerDay,
        RoomStatus:this.state.RoomStatus,      
      }) , 
      headers: { 
        'Accept': 'application/jsnpm on',  
        'Content-Type': 'application/json'  
      }     
    }).then((response) =>{
        if (response.status === 200)  
            this.props.history.push("/AdminDashboard");
        }); 
    //console.log(this.state?.RoomType,"floor");    
  }  

  render() {  
    console.log(this.state.isEdit);
    return (  
      <div className="app flex-row align-items-center">  
        <Container>  
          <Row className="justify-content-center">  
            <Col md="9" lg="7" xl="6">  
              <Card className="mx-44 w-100">  
                <CardBody className="p-4">  
                  <Form>  
                    <div class="row" className="mb-2 pageheading">  
                      <div class="col-sm-12">  
                          
                        </div>  
                    </div>  
                    <InputGroup className="mb-3">  
                      <Input className="w-100" type="number"  onChange={this.FloorNumber} placeholder="Enter Floor Number" value={this.state.FloorNumber}/>  
                      </InputGroup>
                    <InputGroup className="mb-3">  
                      <Input className="w-100" type="number"  onChange={this.RoomNumber} placeholder="Enter Room Number" value={this.state.RoomNumber}/> 
                  
                    </InputGroup>  
                    <InputGroup className="mb-3 mh-50">  
                    <select className="w-100" onChange={this.RoomType} value={this.state.RoomType}>
                      <option value="A/C">A/C</option>
                      <option value="Non A/C">Non A/C</option>
                    </select>  
                     
                    </InputGroup> 
                    <InputGroup className="mb-3">  
                      <Input className="w-100" type="number"  onChange={this.RoomCapacity} placeholder="Enter Room Capacity" value={this.state.RoomCapacity}/> 
                      
                    </InputGroup>
                    <InputGroup className="mb-3">  
                      <Input className="w-100" type="number"  onChange={this.CostPerDay} placeholder="Enter Cost Per Day" value={this.state.CostPerDay}/>  
                      
                    </InputGroup>
                    <InputGroup className="mb-3 mh-50">  
                    <select className="w-100" onChange={this.RoomStatus} value={this.state.RoomStatus}>
                      <option value="Available">Available</option>
                      <option value="Unavailable">UnAvailable</option>
                    </select>                       
                    </InputGroup> 
                        
                    {this.state.isEdit&&<Button  onClick={(e)=>this.update(e)}  color="success" block>Update Room</Button>}
                    {!this.state.isEdit&&<Button  onClick={this.register}  color="success" block>Add Room</Button>}
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
  
export default Room;
