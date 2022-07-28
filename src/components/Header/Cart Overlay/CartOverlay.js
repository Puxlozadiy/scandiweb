import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import './CartOverlay.css'
import cartLogo from '../../../assets/cart.svg'
import ProductInCartOverlay from './ProductInCartOverlay/ProductInCartOverlay'
import { Link } from "react-router-dom";

const CartOverlay = (props) => {
    let products = props.products.category.products
    const [isCartOverlayDisplayed, setIsCartOverlayDisplayed] = useState(false)
    let cart = JSON.parse(localStorage.getItem('cart'))
    const currentCurrency = localStorage.getItem('current-currency')
    const dropdown = useRef()
    const [rendered, rerenderComponent] = useState(0);
    let cartAmount = cart?.length


    const toggleCartOverlay = () => {
        if(cart !== undefined && cart !== null && window.location.href.search('cart') < 0){
            setIsCartOverlayDisplayed(!isCartOverlayDisplayed)
            if(isCartOverlayDisplayed){
                document.getElementById('blackout-background').classList.remove('blackout')
                document.getElementById('blackout-overlay').classList.remove('blackout')
            } else {
                document.getElementById('blackout-background').classList.add('blackout')
                document.getElementById('blackout-overlay').classList.add('blackout')
            }
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeCartOverlay, true)
        
        return () => {document.removeEventListener('click', closeCartOverlay, true)}
    }, [isCartOverlayDisplayed])

    const closeCartOverlay = (e) => {
        if(isCartOverlayDisplayed === true){
            let clickMissedOverlay = true
            e.composedPath().map(value => {
                if(value.id === dropdown.current.id || value.id === 'cart-logo'){
                    clickMissedOverlay = false
                }
            })
            if(clickMissedOverlay === true) {
                setIsCartOverlayDisplayed(false)
                document.getElementById('blackout-background').classList.remove('blackout')
                document.getElementById('blackout-overlay').classList.remove('blackout')
            }
        }
    }

    const amountChangeHandler = () => {
        rerenderComponent(!rendered)
    }

    if(!isCartOverlayDisplayed){
        return (
            <div id="cart">
                <div id="cart-logo" onClick={toggleCartOverlay}>
                    <img src={cartLogo} alt=""></img>
                    {cartAmount > 0 && <div id="cart-logo-amount">{cartAmount}</div>}
                </div>
            </div>
        )
    }


    let tempTotalPrice = 0
    if(cart !== null){
        cart.map(cartItem => {
            products.map(productItem => {
                if(productItem.id === cartItem.id){
                    productItem.prices.map(priceItem => {
                        if(priceItem.currency.label === currentCurrency.split(' ')[1]){
                            tempTotalPrice += (priceItem.amount * cartItem.count)
                        }
                    })
                }
            })
        })
    }

    return (
        <div id="cart">
            <div id="cart-logo" onClick={toggleCartOverlay}>
                <img src={cartLogo} alt=""></img>
                {cartAmount > 0 && <div id="cart-logo-amount">{cartAmount}</div>}
            </div>
            {ReactDOM.createPortal(
                <div id="cart-overlay" ref={dropdown}>
                    <div id="cart-overlay-title">My Bag, <span id="product-amount">{`${cart.length} items`}</span></div>
                    <div id="cart-overlay-products">
                        {cart.map((cartItem, index) => {
                            return products.map(product => {
                                if(cartItem.id === product.id){
                                    return <ProductInCartOverlay product={product} attributes={cartItem.attributes} amount={cartItem.count} index={index} key={index} onAmountChange={amountChangeHandler}></ProductInCartOverlay>
                                }
                            })
                        })}
                    </div>
                    <div id="cart-overlay-total">
                        <span id="cart-overlay-total-title">Total</span>
                        <span id="cart-overlay-total-value">{`${currentCurrency.split(' ')[0]}${tempTotalPrice.toFixed(2)}`}</span>
                    </div>
                    <div id="cart-overlay-buttons">
                        <Link to="/cart" onClick={toggleCartOverlay}><div id="button-viewbag" className="cart-overlay-button">VIEW BAG</div></Link>
                        <div id="button-checkout" className="cart-overlay-button">CHECK OUT</div>
                    </div>
                </div>, document.getElementsByTagName('main')[0])}
        </div>

    )
    
}

export default CartOverlay;