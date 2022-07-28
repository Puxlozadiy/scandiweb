import React, {useEffect, useState} from 'react'
import './Header.css'
import logo from '../../assets/logo.svg'
import CurrencySwitcher from './Currency Switcher/CurrencySwitcher'
import CartOverlay from './Cart Overlay/CartOverlay'
import { Link } from 'react-router-dom'


const Header = (props) => {
    const [selectedNavItem, setSelectedNavItem] = useState(0)


    const selectCategoryHandler = (event) => {
        setSelectedNavItem(+event.target.attributes.meta.value)
    }

    return (
        <header>
            <div id="nav-bar">
                {props.categories !== undefined && props.categories.categories.map((category, index) => {
                return (<Link to={`/${category.name}`} key={category.name}>
                    <span className={`nav-item ${index === selectedNavItem ? 'nav-item-selected' : ''}`} onClick={selectCategoryHandler} meta={index}>{category.name}</span>
                    </Link>)
                })}
            </div>
            <Link to={`/`}>
                <div id="logo" onClick={selectCategoryHandler}>
                    <img src={logo} meta={'0'}></img>
                </div>
            </Link>
            <div id="actions">
                <CurrencySwitcher/>
                <CartOverlay products={props.products}/>
            </div>
        </header>
    )
};
export default Header;


            