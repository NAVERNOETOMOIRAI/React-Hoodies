import logo from "../sneaker.svg";
import AppContext from './Context';
import {Link} from "react-router-dom";
import React from "react";
import {useCart} from "../hooks/useCart";

const Header = () => {
    const {openCart} = React.useContext(AppContext);
    const {total} = useCart();

    return (
        <header>
            <Link to='/'>
                <div className='headerLeft'>
                    <img width={40} height={40} src={logo} alt="logo"/>
                    <div className='headerIndo'>
                        <h3>REACT HOODIES</h3>
                        <p>Магазин лучших толстовок</p>
                    </div>
                </div>
            </Link>
            <div className='headerRight '>
                <ul>

                    <li className='itemsCenter' onClick={openCart}>
                        <img height={20} width={20} src='../img/basket.png' alt="basket"/>
                        <span>{total + ' руб.'}</span>
                    </li>
                    <Link to='/favorites'>
                        <li className='itemsCenter'>
                            <img height={20} width={20} src='../img/heart.svg' alt="heart"/>
                        </li>
                    </Link>
                    <Link to='/orders'>
                    <li className='itemsCenter'>
                        <img height={20} width={20} src="../img/user.png" alt="user"/>
                    </li>
                    </Link>
                </ul>
            </div>
        </header>
    )
}
export default Header;