import React, {useEffect, useState} from "react";
import './CartPage.css'
import ProductInCart from "../../components/ProductInCart/ProductInCart";

const CartPage = (props) => {
    let products;
    if(props.products !== undefined){
        products = props.products.category.products
    }

    const cart = JSON.parse(localStorage.getItem('cart'))
    const currentCurrency = localStorage.getItem('current-currency')
    const [summary, setSummary] = useState({
        tax: 0,
        quantity: 0,
        total: 0
    })

    useEffect(() => {
        if(props.products !== undefined){
            let tempSummary = {...summary}
            cart.map(cartProduct => {
                tempSummary.quantity+= cartProduct.count
                products.map(product => {
                    if(cartProduct.id == product.id){
                        product.prices.map(price => {
                            if(price.currency.label == currentCurrency.split(' ')[1]){
                                tempSummary.total += (price.amount * cartProduct.count)
                            }
                        })
                    }
                })
            })
            setSummary(tempSummary)
        }
    }, [props.products])

    const changeAmountHandler = (itemPrice, amountChange) => {
        setSummary({...summary, total: summary.total + itemPrice, quantity: summary.quantity + amountChange})
    }

    if(props.products !== undefined){
        console.log(products)

        return(
            <main id="cartpage">
                <div id="cartpage-title">CART</div>
                <div id="cartpage-products">
                    {cart.map((cartItem, index) => {
                        return products.map(product => {
                            if(cartItem.id === product.id){
                                return <ProductInCart product={product} attributes={cartItem.attributes} index={index} amount={cartItem.count} key={index} onAmountChange={changeAmountHandler}></ProductInCart>
                            }
                        })
                    })}
                </div>
                <div id="cartpage-summary">
                    <div id="cartpage-summary-titles">
                        <p>Tax 21%:</p>
                        <p>Quantity:</p>
                        <p>Total:</p>
                    </div>
                    <div id="cartpage-summary-values">
                        <p>{currentCurrency.split(' ')[0]}{(summary.total * 0.21).toFixed(2)}</p>
                        <p>{summary.quantity}</p>
                        <p>{currentCurrency.split(' ')[0]}{summary.total.toFixed(2)}</p>
                    </div>
                </div>
                <div id="order">ORDER</div>
            </main>
        )

    } else{
        return
    }
}

export default CartPage;