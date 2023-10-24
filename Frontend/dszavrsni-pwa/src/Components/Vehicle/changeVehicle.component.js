import React, { Component } from "react";
import vehicleDataService from "../Services/vehicle.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class changeVehicle extends Component {

  constructor(props) {
    super(props);

    this.vehicles = this.getVehicles();
    this.changeVehicle = this.changeVehicle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      vehicle: {}
    };
  }


  async getVehicles() {
   
    let href = window.location.href;
    let niz = href.split('/'); 
    await vehicleDataService.getByID(niz[niz.length-1])
      .then(response => {
        this.setState({
          vehicle: response.data
        });
       console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async changeVehicle(vehicle) {

    let href = window.location.href;
    let niz = href.split('/'); 
    const answer = await vehicleDataService.put(niz[niz.length-1],vehicle);
    if(answer.ok){
      window.location.href='/vehicles';
    }else{
      
      console.log(answer);
    }
  }


  handleSubmit(e) {

    e.preventDefault();

    const datainfo = new FormData(e.target);

    this.changeVehicle({
      TYPE: datainfo.get('TYPE'),
      BRAND: datainfo.get('BRAND'),
      MODEL: datainfo.get('MODEL'),
      PURCHASE_DATE: datainfo.get('PURCHASE_DATE'),
      DATE_OF_REGISTRATION: datainfo.get('DATE_OF_REGISTRATION')
    });
    
  }


  render() {
    
    const { vehicle} = this.state;
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        <Form.Group className="mb-3" controlId="TYPE">
                <Form.Label>TYPE</Form.Label>
                <Form.Control type="text" name="TYPE" placeholder="karavan" 
                 maxLength={50} defaultValue={vehicle.TYPE} required/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="BRAND">
                <Form.Label>BRAND</Form.Label>
                <Form.Control type="text" name="BRAND"
                defaultValue={vehicle.BRAND} placeholder="310B" />
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="MODEL">
                <Form.Label>MODEL</Form.Label>
                <Form.Control type="text" name="MODEL" 
                defaultValue={vehicle.MODEL} placeholder="50-1" />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="PURCHASE_DATE">
                <Form.Label>PURCHASE_DATE</Form.Label>
                <Form.Control type="text" name="PURCHASE_DATE" placeholder="" 
                defaultValue={vehicle.PURCHASE_DATE} required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="DATE_OF_REGISTRATION">
                <Form.Label>DATE_OF_REGISTRATION</Form.Label>
                <Form.Control type="text" name="DATE_OF_REGISTRATION" placeholder="12.12.2023." 
                defaultValue={vehicle.DATE_OF_REGISTRATION} required />
              </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/vehicles`}>Cancel</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Change vehicle 
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

