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
    async addCategory(category) {
      const answer = await categoryDataService.post(category);
      if(answer.ok){
        
        window.location.href='/categories';
      }else{
       // pokaži grešku
     // console.log(odgovor.poruka.errors);
      let messages = '';
      for (const key in answer.message.errors) {
        if (answer.message.errors.hasOwnProperty(key)) {
          messages += `${answer.message.errors[key]}` + '\n';
         // console.log(`${key}: ${odgovor.poruka.errors[key]}`);
        }
      }

      alert(messages);
    }
    }
  
  
  
  handleSubmit(e) {
    e.preventDefault();


    const datainfo = new FormData(e.target);
  
      this.addCategory({
        NAME: datainfo.get('NAME'),
        PRICE: datainfo.get('PRICE'),
        NUMBER_OF_TR_LECTURES: datainfo.get('NUMBER_OF_TR_LECTURES'),
        NUMBER_OF_DRIVING_LECTURES: datainfo.get('NUMBER_OF_DRIVING_LECTURES')
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
    
              <Form.Group className="mb-3" controlId="NUMBER_OF_DRIVING_LECTURES">
                <Form.Label>NUMBER_OF_DRIVING_LECTURES</Form.Label>
                <Form.Control type="text" name="NUMBER_OF_DRIVING_LECTURES" placeholder="50" required />
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
    
    