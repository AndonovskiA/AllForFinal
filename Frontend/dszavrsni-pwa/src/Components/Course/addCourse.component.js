import React, { Component } from "react";
import courseDataService from "../../services/Course.service";
import instructorDataService from "../../services/Instructor.service";
import vehicleDataService from "../../services/Vehhicle.service";
import studentDataService from "../../services/Student.service";
import categoryDataService from "../../services/Category.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';



export default class addCourse extends Component {

  constructor(props) {
    super(props);
    this.addCourse = this.addCourse.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addStudent = this.getStudents.bind(this);
    this.getCategory= this.getCategories.bind(this);
    this.getInstructor= this.getInstructors.bind(this);
    this.getVehicle= this.getVehicle.bind(this);
    this.state = {
      smjerovi: [],
      sifraSmjer:0,
      IDStudents:0,
      students
    };
  }


  async addCourse(course) {
    const answer = await courseDataService.post(course);
    if(answer.ok){
     
      window.location.href='/courses';
    }else{
      
      console.log(answer);
    }
  }


  async getInstructors() {

    await instructorDataService.get()
      .then(response => {
        this.setState({
          instructors: response.data,
          IDInstructor: response.data[0].ID
        });

      })
      .catch(e => {
        console.log(e);
      });
  }

  async getVehicles() {

    await vehicleDataService.get()
      .then(response => {
        this.setState({
          vehicles: response.data,
          IDVehicle: response.data[0].ID
        });

      })
      .catch(e => {
        console.log(e);
      });
  }

  async getCategories() {

    await categoryDataService.get()
      .then(response => {
        this.setState({
          categories: response.data,
          IDCategory: response.data[0].ID
        });

      })
      .catch(e => {
        console.log(e);
      });
  }


  handleSubmit(e) {
    e.preventDefault();
    const dataInfo = new FormData(e.target);
    console.log(dataInfo.get('startDate'));
    console.log(dataInfo.get('Time'));
    let datetime = moment.utc(dataInfo.get('startDate') + ' ' + dataInfo.get('Time'));
    console.log(datetime);

    this.addCourse({
      startDate: datetime,
    });
    
  }


  render() { 
    const { smjerovi} = this.state;
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

         
        <Form.Group className="mb-3" controlId="VEHICLE">
            <Form.Label>VEHICLE</Form.Label>
            <Form.Select onChange={e => {
              this.setState({ IDVehicle: e.target.value});
            }}>
            {vehicles && vehicles.map((vehicle,index) => (
                  <option key={index} value={vehicle.ID}>{vehicle.BRAND}</option>

            ))}
            </Form.Select>
          </Form.Group>




          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>startDate</Form.Label>
            <Form.Control type="date" name="startDate" placeholder=""  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="TIME">
            <Form.Label>TIME</Form.Label>
            <Form.Control type="time" name="TIME" placeholder=""  />
          </Form.Group>

         



          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/courses`}>Cancel</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Add course
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}

