import React, {useEffect} from "react";
import './ProductAttribute.css'
const ProductAttribute = (props) => {
    let attribute = props.attribute
    let attrValues = props.attrValues

    let styleClasses = {
        container: props.type === 'cart-overlay' ? 'overlay-product-attr' : 'product-attr',
        title: props.type === 'cart-overlay' ? 'overlay-product-attr-title' : 'product-attr-title',
        options: props.type === 'cart-overlay' ? attribute.name === 'Color' ? 'overlay-product-color-select' : 'overlay-product-attr-select' : attribute.name === 'Color' ? 'product-color-select' : 'product-attr-select',
        optionId: props.type === 'cart' || props.type === 'cart-overlay'? `${props.index}-${attribute.name.toLowerCase()}-` : `${attribute.name.toLowerCase()}-`
    }

    const attributeSelectHandler = (event) => {
        if(props.type === 'product-page'){
            let product = JSON.parse(localStorage.getItem('current-product'))
            let attrName = attribute.name.toLowerCase()
            let index = event.target.id.split('-')[1]
            product.attributes.map(value => {
                if(value.name === attrName) value.value = index
                return
            })
            localStorage.setItem('current-product', JSON.stringify(product))
            for(let i = 0; i < attribute.items.length; i++){
                const elem = document.getElementById(`${attrName}-${i}`)
                elem.classList.remove('selected-color')
                elem.classList.remove('selected-attr')
            }
            document.getElementById(`${attrName}-${index}`).classList.add(attrName === 'color' ? 'selected-color' : 'selected-attr')
        }
    }

    useEffect(() => {
        if(props.type === 'cart' || props.type === 'cart-overlay'){
            attrValues.map(attr => {
                if (attr.name === attribute.name.toLowerCase()){
                    let target = document.getElementById(`${props.index}-${attr.name}-${attr.value}`)
                    target.classList.add(attr.name === 'color' ? 'selected-color' : 'selected-attr')
                }
            })
        }
    }, [])

    return (
        <div className={styleClasses.container}>
            <div className={styleClasses.title}>{props.type === 'cart-overlay' ? attribute.name : attribute.name.toUpperCase()}:</div>
            <div className={styleClasses.options}>
                {attribute.items.map((item, itemIndex) => 
                    <div id={`${styleClasses.optionId}${itemIndex}`} key={item.id} style={attribute.name === 'Color' ? {backgroundColor: `${item.value}`} : {}} onClick={attributeSelectHandler}>
                        {attribute.name !== 'Color' && item.displayValue}
                    </div>)
                }
            </div>
        </div>
    )
}

export default ProductAttribute;