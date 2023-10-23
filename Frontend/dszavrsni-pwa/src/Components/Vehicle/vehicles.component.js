import React, { Component } from "react";
import vehicleDataService from "../Services/vehicle.service";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';


export default class Vehicless extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        vehicles: [],
      };
    }
    
    componentDidMount() {
        this.getVehicles();
      }
      async getVehicles() {
        await vehicleDataService.get() //mozda bez all
          .then(response => {
            this.setState({
              vehicles: response.data
            });
          })
          .catch(e => {
            console.log(e);
          });
      }

      async deleteVehicle(ID){
    
        const answer = await vehicleDataService.delete(ID);
        if(answer.ok){
         this.getVehicles();
        }else{
          alert(answer.message);
        }
        
       }

       render() {
        const {vehicles} = this.state;
        return (
    
        <Container>
          <a href="/vehicles/add" className="btn btn-success gumb">
            Add new vehicle</a>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>BRAND</th>
                        <th>MODEL</th>
                        <th>PURCHASE_DATE</th>
                        <th>DATE_OF_REGISTRATION</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                   { vehicles && vehicles.map((vehicle,index) => (

                    <tr key={index}>
                        <td>{vehicle.BRAND}</td>
                        <td>
                            <Link className="btn btn-primary gumb"
                            to={`/vehicles/${vehicle.ID}`}>
                                <FaEdit />
                            </Link>

                            <Button variant="danger" className="gumb"
                            onClick={()=>this.deleteVehicle(vehicle.ID)}>
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
