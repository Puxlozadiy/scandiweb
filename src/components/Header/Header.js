import './Header.css'
import logo from '../../assets/logo.svg'
import CurrencySwitcher from '../Currency Switcher/CurrencySwitcher'
import CartOverlay from '../Cart Overlay/CartOverlay'
import { Link } from 'react-router-dom'

const Header = (props) => {
    return (
        <header>
            <div id="nav-bar">
                {props.categories !== undefined && props.categories.categories.map(value => <Link to={`/${value.name}`} key={value.name}><span className="nav-item">{value.name}</span></Link>)}
            </div>
            <div id="logo">
                <img src={logo}></img>
            </div>
            <div id="actions">
                <CurrencySwitcher/>
                <CartOverlay/>
            </div>
        </header>
    )
};
export default Header;


            