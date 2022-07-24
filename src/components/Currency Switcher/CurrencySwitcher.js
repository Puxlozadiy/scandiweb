import React, { useState, useRef, useEffect } from "react";
import arrow from '../../assets/arrow.svg'
import dollar from '../../assets/currencies-logos/dollar.svg'
import { useQuery, gql } from '@apollo/client';
import './CurrencySwitcher.css'
import { resolveReadonlyArrayThunk } from "graphql";

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
            e.path.map(value => {
                if(value.id === dropdown.current.id){
                    clickMissedSwitcher = false
                }
            })
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

    

    const showCurrencySwitcher = () => {
        setIsSwitcherDisplayed(!isSwitcherDisplayed)
    }

    const onblur = () => {
        console.log('blured')
    }

    return (    
        <div id="currency" onClick={showCurrencySwitcher} onBlur={onblur}>
            <div id="currency-actual">
                <div id="currency-symbol">{localStorage.getItem('current-currency')[0]}</div>
                <div id="arrow"><img src={arrow} alt=""></img></div>
            </div>
            <div id="currency-select-dropdown" style={{display: `${isSwitcherDisplayed ? 'block' : 'none'}`}} ref={dropdown}><DisplayCurrencies/></div>
        </div>
    )
}

export default CurrencySwitcher;