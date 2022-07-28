import React, {useEffect} from "react";
import './Product.css'
import cartLogo from '../../assets/cart-white.svg'
import { Redirect, useHistory } from "react-router-dom";

const Product = (props) => {
    const history = useHistory();
    const addToCard = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let productIsDublicator = false
        let newProduct = {
            id: props.product.id,
            brand: props.product.brand,
            name: props.product.name,
            prices: props.product.prices,
            images: props.product.gallery
            
        }
        newProduct.attributes = []
        props.product.attributes.map((attr, index) => {
            newProduct.attributes.push({name: attr.name.toLowerCase(), value: 0})
        })
        
        if(cart === null){
            localStorage.setItem('cart', JSON.stringify([{...newProduct, count: 1}]))
            return
        }
        cart.map(cartItem => {
            let {count, ...tempCartItem} = cartItem
            if(JSON.stringify(newProduct) == JSON.stringify(tempCartItem)){
                cartItem.count += 1
                productIsDublicator = true
            }
        })
        if(!productIsDublicator){
            cart.push({...newProduct, count: 1}) 
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const openProductPage = () => {
        history.push(`/${props.product.id}`);
    }

    return (
        <div className="product">
            <img src={props.image} className="product-image" alt="" onClick={openProductPage}></img>
            <div className="product-title" onClick={openProductPage}>{props.product.brand} {props.product.name}</div>
            <div className="product-price" onClick={openProductPage}>{props.price}</div>
            <div className="product-add-to-cart" onClick={addToCard}>
                <img src={cartLogo} alt=""></img>
            </div>
        </div>
    )
};

export default Product;