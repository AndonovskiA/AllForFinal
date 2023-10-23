import React, { Component } from "react";
import studentDataService from "../Services/student.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class changestudent extends Component {

  constructor(props) {
    super(props);

    this.student = this.getStudent();
    this.changeStudent = this.changeStudent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      student: {}
    };
  }


  async getStudent() {
   
    let href = window.location.href;
    let niz = href.split('/'); 
    await studentDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          student: response.data
        });
      
      })
      .catch(e => {
        console.log(e);
      });
  }

  async changeStudent(student) {
    
    let href = window.location.href;
    let niz = href.split('/'); 
    const answer = await studentDataService.put(niz[niz.length-1],student);
    if(answer.ok){
      window.location.href='/students';
    }else{
      
      console.log(answer);
    }
  }


  handleSubmit(e) {

    e.preventDefault();


    const datainfo = new FormData(e.target);


    this.changeStudent({
      FIRST_NAME: datainfo.get('FIRST_NAME'),
      LAST_NAME: datainfo.get('LAST_NAME'),
      ADDRESS: datainfo.get('ADDRES'),
      OIB: datainfo.get('OIB'),
      CONTACT_NUMBER: datainfo.get('CONTACT_NUMBER'),
      DATE_OF_ENROLLMENT: datainfo.get('DATE_OF_ENROLLMENT')
    });
    
  }


  render() {
    
const { student}= this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="FIRST_NAME">
                <Form.Label>FIRST_NAME</Form.Label>
                <Form.Control type="text" name="FIRST_NAME" placeholder="Anja" maxLength={30}
                defaultValue={student.FIRST_NAME} required/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="LAST_NAME">
                <Form.Label>LAST_NAME</Form.Label>
                <Form.Control type="text" name="LAST_NAME" placeholder="Petakić" 
                defaultValue={student.LAST_NAME} required />
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="ADDRESS">
                <Form.Label>ADDRESS</Form.Label>
                <Form.Control type="text" name="ADDRESS" placeholder="somewhat street "
                defaultValue={student.ADDRESS} required />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="OIB">
                <Form.Label>OIB</Form.Label>
                <Form.Control type="text" name="OIB" placeholder="" required
                 defaultValue={student.OIB} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="CONTACT_NUMBER">
                <Form.Label>CONTACT_NUMBER</Form.Label>
                <Form.Control type="text" name="CONTACT_NUMBER" placeholder="99999999999"required
                defaultValue={student.CONTACT_NUMBER} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="DATE_OF_ENROLLMENT">
                <Form.Label>DATE_OF_ENROLLMENT</Form.Label>
                <Form.Control type="text" name="DATE_OF_ENROLLMENT" placeholder="05.08.2023" required
                defaultValue={student.DATE_OF_ENROLLMENT} />
              </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/students`}>Cancel</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Change student 
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

