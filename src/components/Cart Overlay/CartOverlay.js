import React, { Fragment, useState } from "react";
import './CartOverlay.css'
import cart from '../../assets/cart.svg'

const CartOverlay = () => {
    const [isCartOverlayDisplayed, setIsCartOverlayDisplayed] = useState(false)
    
    const showCartOverlay = () => {
        setIsCartOverlayDisplayed(!isCartOverlayDisplayed)
    }

    return (
        <Fragment>
            <div id="cart" onClick={showCartOverlay}><img src={cart} alt=""></img></div>
            {isCartOverlayDisplayed && 
            <div id="cart-overlay">

            </div>}
        </Fragment>

    )
}

export default CartOverlay;