import React, { Component } from "react";
import instructorDataService from "../Services/instructor.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class addInstructor extends Component {

    constructor(props) {
      super(props);
      this.addInstructor = this.AddInstructor.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    async AddInstructor(course) {
      const answer = await instructorDataService.post(course);
      if(answer.ok){
        
        window.location.href='/instructors';
      }else{
        // pokaži grešku
        console.log(answer);
      }
    }
  
  
  
    handleSubmit(e) {
      e.preventDefault();
      const datainfo = new FormData(e.target);
  
      this.AddInstructor({
      First_Name: datainfo.get('First name'),
      Last_Name: datainfo.get('Last name'),
      Driver_License_Number: datainfo.get('Driver licence number'),
      EMAIL:datainfo.get("e-mail"),
      Contact_Number: datainfo.get('Contact number'),
      });
      
    }

    render() { 
        return (
        <Container>
            <Form onSubmit={this.handleSubmit}>
    
            <Form.Group className="mb-3" controlId="FIRST_NAME">
                <Form.Label>First_Name</Form.Label>
                <Form.Control type="text" name="FIRST_NAME" placeholder="Petak" maxLength={30}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="LAST_NAME">
                <Form.Label>Last_Name</Form.Label>
                <Form.Control type="text" name="LAST_NAME" placeholder="Petakić"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="DRIVES_LICENSE_NUMBER">
                <Form.Label>Driver_License_Number</Form.Label>
                <Form.Control type="text" name="DRIVER_LICENSE_NUMBER"placeholder="6546464 "/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="EMAIL">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="EMAIL" placeholder="abcd.pet@gmail.com"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="CONTACT_NUMBER">
                <Form.Label>Contact_Number</Form.Label>
                <Form.Control type="text" name="CONTACT_NUMBER" placeholder="1234567890"/>
            </Form.Group>
        
              
            <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/instructors`}>Cancel</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  Add instrctor
                </Button>
                </Col>
            </Row>
             
              
            </Form>
    
          
        </Container>
        );
    }
}
    
    