import React, {useState, useEffect, useSyncExternalStore} from "react";
import './ProductPage.css'
import ProductAttribute from "../../components/ProductAttribute/ProductAttribute";


const ProductPage = (props) => {
    console.log(props.product)
    const [selectedImage, setSelectedImage] = useState(0)
    const [currentCurrency, setCurrenctCurrency] = useState(localStorage.getItem('current-currency').split(' ')[1])
    const selectImage = (event) => {
        setSelectedImage(event.target.attributes.meta.value)
    }
    const price = props.product.prices.map(value => {
        if(value.currency.label === currentCurrency){
            return `${value.currency.symbol}${value.amount}`
        }
    })
    
    useEffect(() => {
        let currentProduct = JSON.parse(localStorage.getItem('current-product'))
        if(currentProduct === null || currentProduct.id !== props.product.id){
            localStorage.setItem('current-product', JSON.stringify({
                id: props.product.id,
                brand: props.product.brand,
                name: props.product.name,
                price: props.product.prices,
                images: props.product.gallery

            }))
            let product = JSON.parse(localStorage.getItem('current-product'))
            product.attributes = []
            props.product.attributes.map((attr, index) => {
                product.attributes.push({name: attr.name.toLowerCase(), value: 0})
                localStorage.setItem('current-product', JSON.stringify(product))
            })
        }
        props.product.attributes.map((attr, index) => {
            let currentProduct = JSON.parse(localStorage.getItem('current-product'))
            for(let attribute of currentProduct.attributes){
                document.getElementById(`${attribute.name}-${attribute.value}`).classList.add(attribute.name === 'color' ? 'selected-color' : 'selected-attr')
            }
        })
    }, [])



    const addProductToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(cart === null){
            localStorage.setItem('cart', JSON.stringify([]))
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        console.log(cart)
        cart.push(JSON.parse(localStorage.getItem('current-product')))
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    if(props.product !== undefined){
        return(
            <main>
                <div id="images">
                    <div id="images-preview">
                        {props.product.gallery.map((value, index) => <img src={value} key={index} meta={index} onClick={selectImage} alt=""></img>)}
                    </div>
                    <div id="image-bigview">
                        <img src={props.product.gallery[selectedImage]} alt=""></img>
                    </div>
                </div>
                <div id="product-properties">
                    <div id="product-brand">{props.product.brand}</div>
                    <div id="product-name">{props.product.name}</div>
                    
                    {props.product.attributes.length > 0 ? props.product.attributes.map((attr, attrIndex) => {
                        return (<ProductAttribute attribute={attr} inCart={true} key={attr.id}></ProductAttribute>)
                    }) : ''}

                    <div id="product-price">
                        <div id="product-price-title">PRICE:</div>
                        <div id="product-price-value">{price}</div>
                    </div>
                    <div id="add-to-cart" onClick={addProductToCart}>ADD TO CART</div>
                    <div id="product-description">{props.product.description.substring(3).substring(0, props.product.description.substring(3).length - 4)}</div>
                </div>
            </main>
        )
    }
    return <span>Loading</span>
}

export default ProductPage;