import React, {useState} from "react";
import './ProductInCart.css'
import ProductAttribute from "../ProductAttribute/ProductAttribute";

const ProductInCart = (props) => {
    const product = props.product
    console.log(product)
    const [currentCurrency, setCurrenctCurrency] = useState(localStorage.getItem('current-currency').split(' ')[1])
    const price = product.prices.map(value => {
        if(value.currency.label === currentCurrency){
            return `${value.currency.symbol}${value.amount}`
        }
    })
    console.log(product)
    return (
        <div className="cartpage-product">
            <div className="cartpage-product-line"></div>
            <div className="cartpage-product-brand">{product.brand}</div>
            <div className="cartpage-product-name">{product.name}</div>
            <div className="cartpage-product-price">{price}</div>
            <div className="cartpage-product-attributes">
                {product.attributes.length > 0 ? product.attributes.map((attr, attrIndex) => {
                        return (<ProductAttribute attribute={attr} attrValues={props.attributes} type="cart" index={props.index} key={attr.id}></ProductAttribute>)
                    }) : ''}
            </div>
            <div className="cartpage-product-images">
                <img src={product.gallery[0]} alt=""></img>
            </div>
        </div>
    )
}

export default ProductInCart;