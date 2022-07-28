import React from "react";
import plus from '../../../../assets/plus-s.svg'
import minus from '../../../../assets/minus-s.svg'
import './COProductAmountChanger.css'
import { useSelector, useDispatch } from 'react-redux'

const COProductAmountChanger = (props) => {
    const dispatch = useDispatch()

    const increaseAmount = () => {
        props.onAmountIncrease()
        dispatch({type: 'increase_cart_amount'})
    }

    const reduceAmount = () => {
        props.onAmountReduce()
        dispatch({type: 'decrease_cart_amount'})
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