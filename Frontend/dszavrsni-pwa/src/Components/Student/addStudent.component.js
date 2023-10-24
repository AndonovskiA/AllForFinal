import React, { Component } from "react";
import studentDataService from "../Services/student.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class addStudent extends Component {

    constructor(props) {
      super(props);
      this.addStudent = this.addStudent.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    async addStudent(students) {
      const answer = await studentDataService.post(students);
      if(answer.ok){
        // routing na tecaj
        window.location.href='/students';
      }else{
        // pokaži grešku
        console.log(answer);
      }
    }
  
  
  
    handleSubmit(e) {
      e.preventDefault();
      const datainfo = new FormData(e.target);
  
      this.addStudent({
        FIRST_NAME: datainfo.get('FIRST_NAME'),
        LAST_NAME: datainfo.get('LAST_NAME'),
        ADDRESS: datainfo.get('ADDRESS'),
        OIB: datainfo.get('OIB'),
        Contact_Number: datainfo.get('CONTACT_NUMBER'),
        Date_of_Enrollment: datainfo.get('DATE_OF_ENROLLMENT')
      });
      
    }

    render() { 
        return (
        <Container>
            <Form onSubmit={this.handleSubmit}>
    
            

            
              <Form.Group className="mb-3" controlId="FIRST_NAME">
                <Form.Label>FIRST_NAME</Form.Label>
                <Form.Control type="text" name="FIRST_NAME" placeholder="Anja" maxLength={255} required/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="LAST_NAME">
                <Form.Label>LAST_NAME</Form.Label>
                <Form.Control type="text" name="LAST_NAME" placeholder="Petakić" required />
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="ADDRESS">
                <Form.Label>ADDRESS</Form.Label>
                <Form.Control type="text" name="ADDRESS" placeholder="somewhat street " />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="OIB">
                <Form.Label>OIB</Form.Label>
                <Form.Control type="text" name="OIB" placeholder="" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="CONTACT_NUMBER">
                <Form.Label>CONTACT_NUMBER</Form.Label>
                <Form.Control type="text" name="CONTACT_NUMBER" placeholder="99999999999" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="DATE_OF_ENROLLMENT">
                <Form.Label>DATE_OF_ENROLLMENT</Form.Label>
                <Form.Control type="text" name="DATE_OF_ENROLLMENT" placeholder="05.08.2023" />
              </Form.Group>


              <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/students`}>Cancel</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  Add Student
                </Button>
                </Col>
              </Row>
             
              
            </Form>
    
    
          
        </Container>
        );
      }
    }
    
    