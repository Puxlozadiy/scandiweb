import React, { Fragment, useEffect, useState } from "react";
import './ProductList.css'
import Product from "../../components/Product/Product";
import { Link } from "react-router-dom";


const ProductList = (props) => {
    const [products, setProducts] = useState(props.products)
    useEffect(() => {
        setProducts(props.products)
    }, [props.products])

    const currentCurrency = localStorage.getItem('current-currency').split(' ')[1]

    return (
        <Fragment>
            <div id="blackout-background">
                <main id="product-list">
                    <div id="blackout-overlay"></div>
                    <h2 id="category">{props.category[0].toUpperCase() + props.category.substring(1)}</h2>
                    <div id="products">
                    {products.category.products.map(product => {
                        const price = product.prices.map(value => {
                            if(value.currency.label === currentCurrency){
                                return `${value.currency.symbol}${value.amount}`
                            }
                        })
                        if(product.category === props.category || props.category === 'all'){
                            return <Product image={product.gallery[0]} price={price} product={product} key={product.id}></Product>
                        }
                    })}
                    </div>
                </main>
                
            </div>
        </Fragment>
    )
};

export default ProductList;