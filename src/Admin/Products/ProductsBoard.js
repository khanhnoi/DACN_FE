import React, { Component } from 'react';
import { ProductElement } from "./ProductElement";

export class ProductsBoard extends Component {

    render(){
        return <div className="row row-cols-1 row-cols-md-5 pt-3">
            {
                this.props.products.map((p, index) => 
                    <ProductElement key={ index } product={ p } />    
                )
            }
        </div>
    }
}