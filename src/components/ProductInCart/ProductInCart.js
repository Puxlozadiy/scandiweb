import React, {useState} from "react";
import './ProductInCart.css'
import ProductAttribute from "../ProductAttribute/ProductAttribute";
import ProductAmountChanger from "../ProductAmountChanger/ProductAmountChanger";
import CartCarousel from "../CartCarousel/CartCarousel";
import { Link } from "react-router-dom";

const ProductInCart = (props) => {
    const product = props.product
    console.log(product)
    const [currentCurrency, setCurrenctCurrency] = useState(localStorage.getItem('current-currency'))
    const [amount, setAmount] = useState(props.amount)
    let productPrice
    product.prices.map(price => {
        if(price.currency.label === currentCurrency.split(' ')[1]){
            productPrice = price.amount
        }
        return
    })

    const increaseAmountHandler = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart[props.index].count = amount + 1
        localStorage.setItem('cart', JSON.stringify(cart))
        setAmount(amount + 1)
        props.onAmountChange(productPrice, 1)
    }

    const reduceAmountHandler = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart[props.index].count = amount - 1
        if(amount === 1){
            let cart = JSON.parse(localStorage.getItem('cart'))
            cart[props.index].count = amount - 1
            cart = cart.filter((cartItem, index) => {
                if(index !== props.index){
                    return cartItem
                }
            })
            props.onAmountChange(-productPrice, -1)
            localStorage.setItem('cart', JSON.stringify(cart))
            return
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        setAmount(amount - 1)
        props.onAmountChange(-productPrice, -1)
        
    }

    console.log(product)
    return (
        <div className="cartpage-product">
            <Link to={`${product.id}`}>
                <div className="cartpage-product-brand">{product.brand}</div>
                <div className="cartpage-product-name">{product.name}</div>
                <div className="cartpage-product-price">{currentCurrency.split(' ')[0]}{productPrice}</div>
                <div className="cartpage-product-attributes">
                    {product.attributes.length > 0 ? product.attributes.map((attr, attrIndex) => {
                            return (<ProductAttribute attribute={attr} attrValues={props.attributes} type="cart" index={props.index} key={attr.id}></ProductAttribute>)
                        }) : ''}
                </div>
            </Link>
            <ProductAmountChanger amount={amount} onAmountIncrease={increaseAmountHandler} onAmountReduce={reduceAmountHandler}></ProductAmountChanger>
            <CartCarousel images={product.gallery}></CartCarousel>
        </div>
    )
}

export default ProductInCart;