import {createStore} from 'redux'

let cartAmount = JSON.parse(localStorage.getItem('cart'))

const counterReducer = (state = { amount: cartAmount !== null ? cartAmount.length : 0  }, action) => {
    if(action.type === 'increase_cart_amount'){
        return {
            amount: state.amount += 1
        }
    }
    if(action.type === 'decrease_cart_amount'){
        return {
            amount: state.amount -= 1
        }
    }
    return state
}

const store = createStore(counterReducer)

store.subscribe(() => {
    console.log(store.getState())
})



export default store;
