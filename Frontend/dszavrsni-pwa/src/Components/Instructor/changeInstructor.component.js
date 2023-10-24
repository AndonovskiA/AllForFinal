import React, { Component } from "react";
import instructorDataService from "../Services/instructor.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class changeInstructor extends Component {

  constructor(props) {
    super(props);

    this.instructor = this.getInstructor();
    this.changeInstructor = this.changeInstructor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.state = {
      instructor: {}
    };
  }



  async getInstructor() {
 
    let href = window.location.href;
    let niz = href.split('/'); 
    await instructorDataService.getByID(niz[niz.length-1])
      .then(response => {
        this.setState({
          instructor: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async changeInstructor(instructor) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const answer = await instructorDataService.put(niz[niz.length-1],instructor);
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
   
    this.changeInstructor({
      FIRST_NAME: datainfo.get('FIRST_NAME'),
      LAST_NAME: datainfo.get('LAST_NAME'),
      DRIVER_LICENSE_NUMBER: datainfo.get('DRIVER_LICENSE_NUMBER'),
      EMAIL: datainfo.get("EMAIL"),
      CONTACT_NUMBER: datainfo.get('CONTACT_NUMBER'),
    });
    
  }


  render() {
    
    const {instructor} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="FIRST_NAME">
                <Form.Label>FIRST_NAME</Form.Label>
                <Form.Control type="text" name="FIRST_NAME" placeholder="Petak" 
                defaultValue={instructor.FIRST_NAME} maxLength={30}/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="LAST_NAME">
                <Form.Label>LAST_NAME</Form.Label>
                <Form.Control type="text" name="LAST_NAME" placeholder="Petakić"
                 defaultValue={instructor.LAST_NAME} />
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="DRIVER_LICENSE_NUMBER">
                <Form.Label>DRIVER_LICENSE_NUMBER</Form.Label>
                <Form.Control type="text" name="DRIVER_LICENSE_NUMBER" placeholder="6546464 "
                 defaultValue={instructor.DRIVER_LICENSE_NUMBER}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="EMAIL">
                <Form.Label>EMAIL</Form.Label>
                <Form.Control type="text" name="EMAIL" placeholder="abcd.pet@gmail.com"
                defaultValue={instructor.EMAIL} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="CONTACT_NUMBER">
                <Form.Label>CONTACT_NUMBER</Form.Label>
                <Form.Control type="text" name="CONTACT_NUMBER" placeholder="1234567890"
                defaultValue={instructor.CONTACT_NUMBERs} />
              </Form.Group>
        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/instructors`}>Cancel</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Change instructor
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

