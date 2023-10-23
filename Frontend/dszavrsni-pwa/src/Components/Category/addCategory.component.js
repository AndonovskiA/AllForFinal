import React, { Component } from "react";
import categoryDataService from "../Services/category.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class addCategory extends Component {

    constructor(props) {
      super(props);
      this.addCategory = this.addCategory.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    async addCategory(course) {
      const answer = await categoryDataService.post(course);
      if(answer.ok){
        
        window.location.href='/categories';
      }else{
        
        console.log(answer);
      }
    }
  
  
  
  handleSubmit(e) {
    e.preventDefault();


    const datainfo = new FormData(e.target);
  
      this.addCategory({
        NAME: datainfo.get('NAME'),
        PRICE: parseFloat(datainfo.get('PRICE')),
        NUMBER_OF_TR_LECTURES: parseInt(datainfo.get('NUMBER_OF_TR_LECTURES')),
        NUMBER_OF_DL: parseInt(datainfo.get('NUMBER_OF_DL'))
      });
      
    }

    render() { 
        return (
        <Container>
            <Form onSubmit={this.handleSubmit}>
    
    
              <Form.Group className="mb-3" controlId="NAME">
                <Form.Label>NAME</Form.Label>
                <Form.Control type="text" name="NAME" placeholder="something" maxLength={255} required/>
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="PRICE">
                <Form.Label>PRICE</Form.Label>
                <Form.Control type="decimal" name="PRICE" placeholder="350.50" required />
              </Form.Group>
    
    
              <Form.Group className="mb-3" controlId="NUMBER_OF_TR_LECTURES">
                <Form.Label>NUMBER_OF_TR_LECTURES</Form.Label>
                <Form.Control type="text" name="NUMBER_OF_TR_LECTURES" placeholder="50" required />
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="NUMBER_OF_DL">
                <Form.Label>NUMBER_OF_DL</Form.Label>
                <Form.Control type="text" name="NUMBER_OF_DL" placeholder="50" required />
              </Form.Group>



              <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/categories`}>Cancel</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  Add Category
                </Button>
                </Col>
              </Row>
             
              
            </Form>
    
    
          
        </Container>
        );
      }
    }
    
    