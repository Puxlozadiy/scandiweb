import React from "react";
import './CartPage.css'
import ProductInCart from "../../components/ProductInCart/ProductInCart";

const CartPage = (props) => {
    if(props.products !== undefined){
    
        const products = props.products.category.products
        console.log(products)
        const cart = JSON.parse(localStorage.getItem('cart'))

        const product1 = products[0]

        return(
            <main id="cartpage">
                <div id="cartpage-title">CART</div>
                <div id="cartpage-products">
                    {cart.map((cartItem, index) => {
                        return products.map(product => {
                            if(cartItem.id === product.id){
                                return <ProductInCart product={product} attributes={cartItem.attributes} index={index} key={index}></ProductInCart>
                            }
                        })
                    })}
                </div>
            </main>
        )

    } else{
        return <span>Loading</span>
    }
}

export default CartPage;