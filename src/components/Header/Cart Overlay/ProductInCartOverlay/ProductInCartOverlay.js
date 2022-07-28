import React, {useState} from "react";
import ProductAttribute from '../../../ProductAttribute/ProductAttribute'
import './ProductInCartOverlay.css'
import COProductAmountChanger from '../CartOverlayProductAmountChanger/COProductAmountChanger'

const ProductInCartOverlay = (props) => {
    const product = props.product
    const currentCurrency = localStorage.getItem('current-currency')
    const [amount, setAmount] = useState(props.amount)
    let productPrice
    product.prices.map(price => {
        if(price.currency.label === currentCurrency.split(' ')[1]){
            productPrice = price.amount
        }
        return
    })
    const increaseAmount = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart[props.index].count = amount + 1
        localStorage.setItem('cart', JSON.stringify(cart))
        setAmount(amount + 1)
        props.onAmountChange()

    }

    const reduceAmount = () => {
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
            props.onAmountChange()
            localStorage.setItem('cart', JSON.stringify(cart))
            return
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        setAmount(amount - 1)
        props.onAmountChange()
    }
    
    
    
    return (
    <div className="cart-overlay-product">
        <div className="cart-overlay-product-brand">{product.brand}</div>
        <div className="cart-overlay-product-name">{product.name}</div>
        <div className="cart-overlay-product-price">{currentCurrency.split(' ')[0]}{productPrice}</div>
        <div className="cart-overlay-product-attributes">
            {product.attributes.length > 0 ? product.attributes.map((attr, attrIndex) => {
                        return (<ProductAttribute attribute={attr} attrValues={props.attributes} type="cart-overlay" index={props.index} key={attr.id}></ProductAttribute>)
                    }) : ''}
        </div>
        <COProductAmountChanger amount={amount} onAmountIncrease={increaseAmount} onAmountReduce={reduceAmount}></COProductAmountChanger>
        <div className="cart-overlay-product-image">
            <img src={product.gallery[0]} alt=""></img>
        </div>
    </div>)
}

export default ProductInCartOverlay;