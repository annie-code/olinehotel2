 import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Input,
 } from "reactstrap";

class Reg extends Component {
  constructor() {
    super();

  this.state = {
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    AadharNumber: "",
    EmailId: "",
   Gender: "Male",
   Password: "",
 };

 
   this.FirstName = this.FirstName.bind(this);
   this.LastName = this.LastName.bind(this);
   this.PhoneNumber = this.PhoneNumber.bind(this);
  this.AadharNumber = this.AadharNumber.bind(this);
  this.EmailId = this.EmailId.bind(this);
  this.Password = this.Password.bind(this);
  this.Gender = this.Gender.bind(this);
 this.register = this.register.bind(this);
}


  FirstName(event) {
   this.setState({ FirstName: event.target.value });
  }
 LastName(event) {
    this.setState({ LastName: event.target.value });
  }
  PhoneNumber(event) {
    this.setState({ PhoneNumber: event.target.value });
   }
   AadharNumber(event) {
    this.setState({ AadharNumber: event.target.value });
  }
  EmailId(event) {
    this.setState({ EmailId: event.target.value });
  }
  Password(event) {
   this.setState({ Password: event.target.value });
 }
 Gender(event) {
   this.setState({ Gender: event.target.value });
 };
  validate(){
    let fnameError = "";
    let lnameError = "";
    let emailError = "";
   let passwordError = "";
   let phoneError = "";
   let aadharError = "";
   let genderError = "";
   const namereg =  /^[A-Za-z]+$/;
    if(!this.state.FirstName || (namereg.test(this.state.FirstName) === false))
    {
      alert("First name should contains letters only");
    }
    if(!this.state.LastName || (namereg.test(this.state.LastName) === false))
    {
      alert("Last name should contains letters only");
    }
    const emailreg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if(!this.state.EmailId || (emailreg.test(this.state.EmailId) === false))
    {
      alert("Email is required");
    }
    const phonereg =/[0-9]{10}/;
    if(!this.state.PhoneNumber || (phonereg.test(this.state.PhoneNumber) === false))
    {
        alert("Phone number should be 10 digits number only");
    }
    const aadharreg =/[0-9]{12}/;
    if(!this.state.AadharNumber || (aadharreg.test(this.state.AadharNumber) === false))
    {
        alert("Aadhar number should be 12 digits number only");
    }
    if(!this.state.Password)
    {
      alert("Password field is required");
    }
    if(!this.state.Gender)
    {
      alert("Gender is required");
    }
    if(emailError || fnameError || lnameError || passwordError || phoneError || aadharError || genderError){
      this.setState({fnameError,lnameError,emailError,passwordError,phoneError,aadharError,genderError});
      return false;
    }
    return true;
  }
 register(event) {
   
  if (this.validate()) {
    fetch("https://localhost:44348/api/customers", {
      method: "post",
    headers: {
        Accept: "application/jsnpm on",
      "Content-Type": "application/json",
    },
   body: JSON.stringify({
         FirstName: this.state.FirstName,
         LastName: this.state.LastName,
        EmailId: this.state.EmailId,
        Password: this.state.Password,
      PhoneNumber: this.state.PhoneNumber,
     AadharNumber: this.state.AadharNumber,
  Gender: this.state.Gender,
  }),
}).then((response) => {
    if (response.status === 201)
      this.props.history.push('/UserLogin');
    else{
      console.log("Please try again");
    }
 });
}
 }
   render() {
     return (      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
           <Col md="9" lg="7" xl="6">
             <Card className="mx-4 w-100">
              <CardBody className="p-4">
                <Form>
                  <div class="row" className="mb-2 pageheading">
                   <div class="col-sm-12"></div>
                 </div>
               <InputGroup className="mb-3">
                  <Input
                   className="w-100"
                   type="text"
                   onChange={this.FirstName}
                   placeholder="Enter First Name"
                 />
               </InputGroup>
               <InputGroup className="mb-3">
                    <Input
                     className="w-100"
                     type="text"
                     onChange={this.LastName}
                     placeholder="Enter LastName"
                      />
                     </InputGroup>               
                     <InputGroup className="mb-3">
                       <Input
                         className="w-100"
                         type="email"
                         onChange={this.EmailId}
                         placeholder="Enter Email"
                       />
                    </InputGroup>
                     <InputGroup className="mb-3">
                       <Input
                         className="w-100"
                         maxLength={15}
                         type="password"
                         onChange={this.Password}
                         placeholder="Enter Password"
                       />
                     </InputGroup>
                     <InputGroup className="mb-3">
                       <Input
                       maxLength={10}
                       minLength={10}
                         className="w-100"
                         type="tel"
                         onChange={this.PhoneNumber}
                         placeholder="Enter Phone Number"
                       />
                     </InputGroup>                     
                     <InputGroup className="mb-3">
                       <Input
                         maxLength={12}
                         minLength={12}
                         className="w-100"
                         type="text"
                         // onKeyPress={(e) => validationInput(e)}
                        onChange={this.AadharNumber}
                         placeholder="Enter Aadhar Number"
                       />
                     </InputGroup>                     
                     <InputGroup className="mb-3 mh-50">
                       <select
                         name="gender"
                         className="w-100"
                         onChange={this.Gender}
                         placeholder="Enter Gender"
                       >
                        <option value="Male">Male</option>
                        <option value="Female">FeMale</option>
                       </select>
                     </InputGroup>
                     <Button onClick={this.register} color="success" block>
                       Create Account
                     </Button>
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

export default Reg;