import plus from '../../assets/plus-l.svg'
import minus from '../../assets/minus-l.svg'
import './ProductAmountChanger.css'

const ProductAmountChanger = (props) => {
    console.log(props)
    const increaseAmount = () => {
        props.onAmountIncrease()
    }

    const reduceAmount = () => {
        props.onAmountReduce()
    }

    return (
        <div className="cartpage-product-amount">
            <div className="cartpage-product-amount-button unselectable" onClick={increaseAmount}>
                <img src={plus} alt=""></img>
            </div>
            <div className="cartpage-product-amount-value">{props.amount}</div>
            <div className="cartpage-product-amount-button unselectable" onClick={reduceAmount}>
                <img src={minus} alt=""></img>
            </div>
        </div>
    )
}

export default ProductAmountChanger;