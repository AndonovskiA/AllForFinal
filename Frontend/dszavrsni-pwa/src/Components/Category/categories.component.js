import React, { Component } from "react";
import categoryDataService from "../Services/category.service";
import {Button, Container, Table} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { NumericFormat } from "react-number-format";



export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.getCategories = this.getCategories.bind(this);

    this.state = {
      categories: [],
    };
  }

  
  componentDidMount() {
      this.getCategories();
    }
    async getCategories() {
      await categoryDataService.get()
        .then(response => {
          this.setState({
            categories: response.data
          });
          console.log(response.data);
          // u inspectu dohvati array al ne prikazuje
        })
        .catch(e => {
          console.log(e);
        });
    }

    async deleteCategory(ID){
  
      const answer = await categoryDataService.delete(ID);
      if(answer.ok){
       this.getCategories();
      }else{
      
        alert(answer.message);
      }
      
     }

     render() {
      const {categories} = this.state;
      return (
  
      <Container>
        <a href="/categories/add" className="btn btn-success gumb">
          ADD NEW CATEGORY
          </a>

        <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>NUMBER_OF_TR_LECTURES</th>
                        <th>NUMBER_OF_DRIVING_LECTURES</th>
                        <th>Action</th>


                    </tr>
                </thead>
                <tbody>
                   { categories && categories.map((category,index) => (

                    <tr key={index}>
                        <td>{category.NAME}</td>
                        <td>{category.NUMBER_OF_TR_LECTURES}</td>
                        <td>{category.NUMBER_OF_DRIVING_LESSONS}</td>
                        <td className="number">{category.PRICE }</td>
                        <td className="number">
                            <NumericFormat
                                value={category.PRICE}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2} 
                                fixedDecimalScale/>
                        </td>
                        
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/categories/${category.ID}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.deleteCategory(category.ID)}>
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