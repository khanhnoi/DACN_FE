import React, { Component } from 'react';
import icon from './icon.png';

export class ProductElement extends Component {
    
    //id, product name, description, resource, thumbnails, rating,

    getRating(){
        let a = this.props.product.rating;
        let ratings = a.split(":").map(r => Number(r));
        return (ratings.reduce((total, rating, index) => total + rating * index) / ratings.reduce((total, rating) => total + rating));
    }

    componentDidMount() {
        console.log(this.getRating());
    }

    render(){
        let p = this.props.product;
        return <div className="col mb-2" >
            <div className="card overflow-hidden" onClick={ () => {window.open(p.product_url)} } >
                <img src={p.thumbnails} alt={icon} />
                <div className="d-block px-2">
                    <p className="mt-1">{ p.product_name }</p>
                    <p className=" mycard-text mt-1">{ p.description }</p>
                    <p className="mt-1">{ p.resource }</p>
                    <p className="float-left mb-025 price"><i class="fa text-warning fa-star"></i>{p.avg_rating}</p>
                </div>
            </div>
        </div>
    }
}