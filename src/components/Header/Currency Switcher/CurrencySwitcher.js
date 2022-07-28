import React, { useState, useRef, useEffect, Fragment } from "react";
import arrow from '../../../assets/arrow.svg'
import { useQuery, gql } from '@apollo/client';
import './CurrencySwitcher.css'
import ReactDOM from "react-dom";

const CurrencySwitcher = () => {
    const GET_CURRENCIES = gql`
        {
            currencies{
                label
                symbol
            }
        }
        `;

    const [isSwitcherDisplayed, setIsSwitcherDisplayed] = useState(false)
    const dropdown = useRef()
    
    useEffect(() => {
        document.addEventListener('click', closeSwitcher, true)
        
        return () => {document.removeEventListener('click', closeSwitcher, true)}
    }, [isSwitcherDisplayed])

    const closeSwitcher = (e) => {
        if(isSwitcherDisplayed === true){
            let clickMissedSwitcher = true
            e.composedPath().map(value => {
                if(value.id === dropdown.current.id  || value.id === 'currency'){
                    clickMissedSwitcher = false
                }
            })
            console.log(clickMissedSwitcher)
            if(clickMissedSwitcher === true) setIsSwitcherDisplayed(false)
        }
    }

    const selectCurrencyHandler = (event) => {
        console.log('currency clicked')
        localStorage.setItem('current-currency', event.target.childNodes[0].innerHTML)
        window.location.reload()
    }

    const DisplayCurrencies = () => {
        const { loading, error, data } = useQuery(GET_CURRENCIES);

        if (loading) {
            console.log('loading') 
            return
        };
        if (error){
            console.log(error)
            return
        };
        
        return data.currencies.map(value => <div className="currency-option" key={value.label} onClick={selectCurrencyHandler}><span>{value.symbol} {value.label}</span></div>)
    }

    

    const toggleCurrencySwitcher = () => {
        setIsSwitcherDisplayed(!isSwitcherDisplayed)
    }

    if(!isSwitcherDisplayed){
        return (
            <div id="currency" ref={dropdown}>
                <div id="currency-actual" onClick={toggleCurrencySwitcher}>
                    <div id="currency-symbol">{localStorage.getItem('current-currency').split(' ')[0]}</div>
                    <div id="arrow"><img src={arrow} alt=""></img></div>
                </div>
            </div>
        )
    }

    

    return (    
        <div id="currency" onClick={toggleCurrencySwitcher}>
            <div id="currency-actual" onClick={toggleCurrencySwitcher}>
                <div id="currency-symbol">{localStorage.getItem('current-currency')[0]}</div>
                <div id="arrow"><img src={arrow} alt=""></img></div>
            </div>
            {ReactDOM.createPortal(<div id="currency-select-dropdown" ref={dropdown}><DisplayCurrencies/></div>, document.getElementsByTagName('main')[0])}
        </div>
    )
}

export default CurrencySwitcher;