import React, { useEffect, useState } from "react";
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
        <main id="shop">
            <h2 id="category">{props.category[0].toUpperCase() + props.category.substring(1)}</h2>
            <div id="products">
            {products !== undefined && products.category.products.map(product => {
                const price = product.prices.map(value => {
                    if(value.currency.label === currentCurrency){
                        return `${value.currency.symbol}${value.amount}`
                    }
                })
                if(product.category === props.category || props.category === 'all'){
                    return <Link key={product.id} to={`/${product.id}`}><Product image={product.gallery[0]} title={product.name} price={price}></Product></Link>
                }
            })}
            </div>
        </main>
    )
};

export default ProductList;