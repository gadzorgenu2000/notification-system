import React, {Component} from 'react';
import {connect } from 'react-redux';
import './Header.css' ;
import MainHeader from './MainHeader';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import TableRow from '@material-ui/core/TableRow';


class History extends Component{

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            purchases: []
        }     

        this.handleSearch = this.handleSearch.bind(this);
        this.updateInput = this.updateInput.bind(this);
        
    }

    componentDidMount() {
        fetch("http://localhost:5000/orders")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                purchases: result.data
              });
            },
          )
        }


        
    updateInput(event) {
        this.setState({
            search: event.target.value
        });
    }

    handleSearch() {
        fetch("http://localhost:5000/purchases/" + this.state.search)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            purchases: result.data
          });
        },
      )
    }


    render(){
        return(
            <div>
                <MainHeader/>
                <div className="history_cont">            
                <div className="row">
                    <div className="col m4">   
                        <h3 className="history">History</h3>
                    </div>                    
                    <div className="col m4">                              
                        <input onChange={this.updateInput}  id="icon_prefix" type="text" className="validate" ></input>
                    </div>
                    <div className="col m3 searchbtn">
                        <button onClick={this.handleSearch} className="btn">
                            <i className="material-icons prefix">search </i>
                        </button>
                    </div>                                 
                </div>
                <h2 className="filter_order">Filter orders by :</h2>      
                <div className="row">
                    <div className="sortOptions">
                        <label> Show:  </label>
                        <div className="input-field col s12 sort">                                         
                            <select>
                                <option value="" disabled selected>Choose your option</option>
                                <option value="1">Most recent</option>
                                <option value="1">last month</option>
                                <option value="2">Earlier this year</option>
                                <option value="3">Last year</option>
                            </select>                                                          
                        </div> 
                    </div>               
                </div>
                    <div className="card-history" >       
                        <div className="row">
                            <div className="order_table">
                            <TableContainer component={Paper}>
                            <Table className="table" aria-label="caption table">
                                <TableHead>
                                <TableRow>
                                    <TableCell> Products</TableCell>
                                    <TableCell >Status</TableCell>
                                    <TableCell >Price</TableCell>
                                    <TableCell >Date</TableCell>
                                    <TableCell >Time</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.state.purchases.map((purchase) => (
                                    <TableRow key={purchase.productID}>

                                    <TableCell >{purchase.product_name}</TableCell>
                                    <TableCell >{ purchase.product_status}</TableCell>
                                    <TableCell >{purchase.price}</TableCell>
                                    <TableCell >{purchase.date}</TableCell>                 
                                    <TableCell >{purchase.time}</TableCell>
                                    
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                            </div>
                        </div>
                    </div>
               </div>
            </div> 
        )
    }

}
function mapStateToProps({auth}){
    return{auth}
};
export default connect(mapStateToProps)(History);

