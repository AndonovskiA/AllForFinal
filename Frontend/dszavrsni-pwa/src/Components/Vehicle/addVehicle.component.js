import React, { Component } from "react";
import vehicleDataService from "../Services/vehicle.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class addVehicle extends Component {

    constructor(props) {
      super(props);
      this.addVehicle = this.addVehicle.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    async addVehicle(vehicles) {
      const answer = await vehicleDataService.post(vehicles);
      if(answer.ok){
        window.location.href='/vehicles';
      }else{
        console.log(answer);
      }
    } // mislim da fali ruta za dodavanje u corse
  
  
  
    handleSubmit(e) {
      e.preventDefault();
      const datainfo = new FormData(e.target);
  
      this.addVehicle({
        TYPE: datainfo.get('TYPE'),
        BRAND: datainfo.get('BRAND'),
        MODEL: datainfo.get('MODEL'),
        PURCHASE_DATE: datainfo.get('PURCHASE_DAT'),
        DATE_OF_REGISTRATION: datainfo.get('DATE_OF_REGISTRATION')
      });
      
    }

    render() { 
            return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="type">
                <Form.Label>TYPE</Form.Label>
                <Form.Control type="text" name="type" placeholder="karavan" maxLength={50} required/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>BRAND</Form.Label>
                <Form.Control type="text" name="brand" placeholder="310B" />
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="model">
                <Form.Label>MODEL</Form.Label>
                <Form.Control type="text" name="model" placeholder="50-1" />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="purchase date">
                <Form.Label>PURCHASE_DATE</Form.Label>
                <Form.Control type="text" name="purchase date" placeholder="" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="date of registration">
                <Form.Label>DATE_OF_REGISTRATION</Form.Label>
                <Form.Control type="text" name="date_of_registration" placeholder="12.12.2023."required />
              </Form.Group>
        
              
            <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/vehicles`}>Cancel</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  Add vehicle
                </Button>
                </Col>
            </Row>
             
              
            </Form>
    
          
        </Container>
        );
    }
}
    
    