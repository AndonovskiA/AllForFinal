import React, { Component } from "react";
import categoryDataService from "../../services/Category.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class changeCategory extends Component {

  constructor(props) {
    super(props);

    this.category = this.getCategory();
    this.changeCategory = this.changeCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      categories: {}
    };
  }


  async getCategory() {
    
    let href = window.location.href;
    let niz = href.split('/'); 
    await categoryDataService.getByID(niz[niz.length-1])
      .then(response => {
        this.setState({
          category: response.data
        });
      
      })
      .catch(e => {
        console.log(e);
      });
  }

  async changeCategory(category) {
    
    let href = window.location.href;
    let niz = href.split('/'); 
    const answer = await categoryDataService.put(niz[niz.length-1],student);
    if(answer.ok){
      window.location.href='/categories';
    }else{
      
      console.log(answer);
    }
  }


  handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const datainfo = new FormData(e.target);
    //Object.keys(formData).forEach(fieldName => {
    // console.log(fieldName, formData[fieldName]);
    //})
    
    //console.log(podaci.get('verificiran'));
    // You can pass formData as a service body directly:

    this.changeCategory({
      NAME: datainfo.get('NAME'),
      PRICE: datainfo.get('PRICE'),
      NUMBER_OF_TR_LECTURES: datainfo.get('NUMBER_OF_TR_LECTURES'),
      NUMBER_OF_DL: datainfo.get('NUMBER_OF_DL')
    });
    
  }


  render() {
    
    const {category} = this.state;

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
              CHANGE CATEGORY
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}

