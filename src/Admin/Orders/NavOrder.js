import React, { Component } from 'react';
import { OrderStatus } from "./OrderStatus";

export class NavOrder extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: "2020-01-01"
        }
    }

    handleChangeDate = (event) => {
        this.setState({ date: event.target.value })
    }

    render(){
        return <div className="d-flex mx-2">
            <select id="cars" name="cars" className="rounded border border-dark" onChange={ this.props.callback } >
                {
                    Object.keys(OrderStatus).map(i => 
                        <option key={i} value={i}>{OrderStatus[i]}</option>    
                    )
                }
            </select>

            <div className="d-flex align-items-center">           
                <label className="mx-3 mb-0">Bắt đầu từ</label>
                <input type="date" value={ this.state.date } className="form-control-plaintext border border-secondary rounded text-center w-auto" onChange={ this.handleChangeDate } id="startDate" />
                <button className="btn btn-light ml-1" onClick={ () => this.props.callback2(this.state.date) }><i className="fa fa-search"></i></button>
                
            </div> 
        </div>
    }
}