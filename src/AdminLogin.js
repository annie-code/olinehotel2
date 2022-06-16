import React, { Component } from 'react';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
class AdminLogin extends Component{
    constructor() {
        super();
        this.state = {
            EmailId : '',
            Password : ''
        }
        this.Password = this.Password.bind(this);
        this.EmailId = this.EmailId.bind(this);
        this.login = this.login.bind(this);      
    }   
 EmailId(event) {

  this.setState({ EmailId: event.target.value })

    }
 Password(event) {

        this.setState({ Password: event.target.value })

    }
    login(event) {
        fetch('https://localhost:44348/api/adminauth', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmailId: this.state.EmailId,
                Password: this.state.Password
            })
        }).then((response) =>  {
                if (response.status === 200){
                  this.props.history.push("/AdminDashboard");
                  sessionStorage.setItem("AdminId","1");
                  window.location.reload();
                }
                else
                  alert('Invalid User');  
            })
    }
    
    render() {
    return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <CardGroup>
                                <Card className="p-2">
                                    <CardBody>
                                        <Form>
                                            <div class="row" className="mb-2 pageheading">
                                                <div class="col-sm-12">                                                   
                                                </div>
                                            </div>
                                            <InputGroup className="mb-3">
                                            <Input type="text" onChange={this.EmailId} placeholder="Enter Email" />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <Input type="password" onChange={this.Password} placeholder="Enter Password" />
                                            </InputGroup>
                                              
                                            <Button onClick={this.login} color="success" block>Login</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default AdminLogin;
