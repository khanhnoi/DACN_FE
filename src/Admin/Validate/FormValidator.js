import React, { Component } from 'react';
import { ValidateData } from "./validation";
import { ValidationContext } from "./ValidationContext";

export class FormValidator extends Component{

    constructor(props){
        super(props);
        this.state = {
            errors: {},
            change: {},
            formSubmitted: false,
            getMessagesForField: this.getMessagesForField
        }
    }

    static getDerivedStateFromProps(props, state){
        state.errors = ValidateData(props.data, props.rules);
        if(state.formSubmitted && Object.keys(state.errors).length === 0){
            let formErrors = props.validateForm(props.data);
            if(formErrors.length > 0){
                state.errors.form = formErrors;
            }
        }
        return state;
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
          this.setState({ 
                errors: {},
                change: {},
                formSubmitted: false,
            })
        }
      }

    get FormValid(){
        return Object.keys(this.state.errors).length === 0;
    }

    handleChange = (ev) => {
        let name = ev.target.name;
        this.setState(state => state.change[name] = true);
    }

    getMessagesForField = (field) => {
        return (this.state.formSubmitted || this.state.change[field]) ? this.state.errors[field] || [] : [];
    }

    render(){
        return <React.Fragment>
            <ValidationContext.Provider value={ this.state }>
                <div onChange={ this.handleChange }>
                    { this.props.children }
                </div>
            </ValidationContext.Provider>
        </React.Fragment>
    }
}