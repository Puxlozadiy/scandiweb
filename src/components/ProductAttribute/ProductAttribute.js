import React, {useEffect} from "react";

const ProductAttribute = (props) => {
    let attribute = props.attribute
    console.log(attribute)
    const attributeSelectHandler = (event) => {
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

    

    return (
        <div className="product-attr">
            <div className={`product-attr-title`}>{attribute.name.toUpperCase()}:</div>
            <div className={attribute.name === 'Color' ? 'product-color-select' : 'product-attr-select'}>
                {attribute.items.map((item, itemIndex) => 
                    <div id={`${attribute.name.toLowerCase()}-${itemIndex}`} key={item.id} style={attribute.name === 'Color' ? {backgroundColor: `${item.value}`} : {}} onClick={attributeSelectHandler}>
                        {attribute.name !== 'Color' && item.displayValue}
                    </div>)
                }
            </div>
        </div>
    )
}

export default ProductAttribute;