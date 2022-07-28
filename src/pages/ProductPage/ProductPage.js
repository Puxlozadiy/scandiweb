import React, {useState, useEffect, useSyncExternalStore} from "react";
import './ProductPage.css'
import ProductAttribute from "../../components/ProductAttribute/ProductAttribute";


const ProductPage = (props) => {
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
        let currentProduct = JSON.parse(localStorage.getItem('current-product'))
        let productIsDublicator = false
        if(cart === null){
            localStorage.setItem('cart', JSON.stringify([{...currentProduct, count: 1}]))
            return
        }
        cart.map(cartItem => {
            let {count, ...tempCartItem} = cartItem
            if(JSON.stringify(currentProduct) == JSON.stringify(tempCartItem)){
                cartItem.count += 1
                productIsDublicator = true
            }
        })
        if(!productIsDublicator){
            cart.push({...currentProduct, count: 1}) 
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    const htmlString = props.product.description

    if(props.product !== undefined){
        return(
            <div id="blackout-background">
                <main id="product-page">
                    <div id="blackout-overlay"></div>
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
                            return (<ProductAttribute attribute={attr} type="product-page" key={attr.id}></ProductAttribute>)
                        }) : ''}

                        <div id="product-price">
                            <div id="product-price-title">PRICE:</div>
                            <div id="product-price-value">{price}</div>
                        </div>
                        <div id="add-to-cart" onClick={addProductToCart}>ADD TO CART</div>
                        <div id="product-description" dangerouslySetInnerHTML={{__html: htmlString}}></div>
                    </div>
                </main>
            </div>
        )
    }
    return <span>Loading</span>
}

export default ProductPage;