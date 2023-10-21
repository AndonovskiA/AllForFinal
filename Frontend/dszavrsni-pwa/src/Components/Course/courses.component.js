import React, { Component } from "react";
import courseDataService from "../../services/Course.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import moment from 'moment';
import { Modal } from 'react-bootstrap';


export default class Grupe extends Component {
  constructor(props) {
    super(props);
    this.getCourses = this.getCourses.bind(this);

    this.state = {
      courses: [],
      showModal: false
    };
  }

  openModal = () => this.setState({ showModal: true });
  closeModal = () => this.setState({ showModal: false });


  componentDidMount() {
    this.getCourses();
  }
  getCourses() {
    courseDataService.getAll()
      .then(response => {
        this.setState({
          courses: response.data
        });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async deleteCourse(ID){
    
    const answer = await courseDataService.delete(ID);
    if(answer.ok){
     this.getCourses();
    }else{
     this.openModal();
    }
    
   }

  render() {
    const {courses} = this.state;
    return (

    <Container>
      <a href="/courses/add" className="btn btn-success gumb">  ADD NEW COURSE  </a>
      <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>startDate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {courses && courses.map((c,index) => (
                
                <tr key={index}>
                  <td> 
                    <p className="naslovSmjer">{g.naziv} ({g.brojPolaznika})</p>
                    {g.smjer}
                  </td>
                  <td className="naslovSmjer">
                    {c.startDate==null ? "Start date and time are not defined" :
                    moment.utc(g.datumPocetka).format("DD. MM. YYYY. HH:mm")}
                  </td>
                  <td>
                    <Row>
                      <Col>
                        <Link className="btn btn-primary gumb" to={`/grupe/${g.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                        { g.brojPolaznika===0 &&
                             <Button variant="danger"  className="gumb" onClick={() => this.obrisiGrupa(g.sifra)}><FaTrash /></Button>
                        }
                      </Col>
                    </Row>
                    
                  </td>
                </tr>
                ))
              }
              </tbody>
            </Table>     

             <Modal show={this.state.showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Error has occured while deleting</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

    </Container>


    );
    
        }
}
