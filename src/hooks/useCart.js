import AppContext from "../components/Context";
import React from "react";

export const useCart = () => {
    const {cartItems,setCartItems} = React.useContext(AppContext);
    const total = cartItems.reduce((prev, obj) => Number(obj.price.split(' ').join('')) + Number(prev), 0);
    return {cartItems,setCartItems,total};
}