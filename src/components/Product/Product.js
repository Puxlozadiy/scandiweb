import React from "react";
import './Product.css'

const Product = (props) => {
    return (
        <div className="product">
            <img src={props.image} className="product-image" alt=""></img>
            <div className="product-title">{props.title}</div>
            <div className="product-price">{props.price}</div>
        </div>
    )
};

export default Product;