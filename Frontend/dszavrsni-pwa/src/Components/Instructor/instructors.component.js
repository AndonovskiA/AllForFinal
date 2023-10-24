import React, { Component } from "react";
import instructorDataService from "../Services/instructor.service";
import {Button, Container, Table} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';




export default class Instructors extends Component {

  constructor(props) {
    super(props);
    this.getInstructors = this.getInstructors.bind(this);

    this.state = {
      instructors: [],
    };
  }

  
  componentDidMount() {
      this.getInstructors();
    }
    async getInstructors() {
      await instructorDataService.get()
        .then(response => {
          this.setState({
            instructors: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    async deleteInstructor(ID){
  
      const answer = await instructorDataService.delete(ID);
      if(answer.ok){
       this.getInstructors();
      }else{
      
        alert(answer.message);
      }
      
     }

     render() {
      const {instructors} = this.state;
      return (
  
      <Container>
        <a href="/instructors/add" className="btn btn-success gumb">
          ADD NEW INSTRUCTOR
          </a>

        <Table striped bordered hover responsive>
                <thead>

                    <tr>
                        <th>FIRST_NAME</th>
                        <th>LAST_NAME</th>
                        <th>DRIVER_LICENSE_NUMBER</th>
                        <th>EMAIL</th>
                        <th>CONTACT_NUMBER</th>
                        <th>Action</th>
                    </tr>
                    
                </thead>
                <tbody>
                   { instructors && instructors.map((instructor,index) => (

                    <tr key={index}>
                        <td>{instructor.FIRST_NAME}</td>

                        <td>{instructor.LAST_NAME}</td>

                        <td>{instructor.DRIVER_LICENSE_NUMBER}</td>

                        <td>{instructor.EMAIL}</td>

                        <td>{instructor.CONTACT_NUMBER}</td>

                        <td>
                        
                        

                        
                            <Link className="btn btn-primary gumb"
                            to={`/instructors/${instructor.ID}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.deleteInstructor(instructor.ID)}>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>

                   ))}
                </tbody>
               </Table>
  
        

  </Container>


  );
  
  }
}