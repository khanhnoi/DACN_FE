import React, { Component } from 'react';
import { ValidationContext } from "./ValidationContext";

export class ValidationMessage extends Component {
    static contextType = ValidationContext;
    render(){
        return this.context.getMessagesForField(this.props.field).map(err => 
            <div className="small bg-danger text-white mb-2 p-1" key={ err }>
                { err }
            </div>    
        )
    }
}