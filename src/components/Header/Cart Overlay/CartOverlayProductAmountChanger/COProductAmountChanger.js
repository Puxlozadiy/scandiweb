import React from "react";
import plus from '../../../../assets/plus-s.svg'
import minus from '../../../../assets/minus-s.svg'
import './COProductAmountChanger.css'

const COProductAmountChanger = (props) => {

    const increaseAmount = () => {
        props.onAmountIncrease()
    }

    const reduceAmount = () => {
        props.onAmountReduce()
    }

    return (
        <div className="cart-overlay-product-amount">
            <div className="cart-overlay-product-amount-button unselectable" onClick={increaseAmount}>
                <img src={plus} alt=""></img>
            </div>
            <div className="cart-overlay-product-amount-value">{props.amount}</div>
            <div className="cart-overlay-product-amount-button unselectable" onClick={reduceAmount}>
                <img src={minus} alt=""></img>
            </div>
        </div>
    )
}

export default COProductAmountChanger;