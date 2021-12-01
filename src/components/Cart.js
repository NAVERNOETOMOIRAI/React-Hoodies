import React from "react";
import AppContext from "./Context";
import Info from "./Info";
import axios from "axios";
import {useCart} from "../hooks/useCart";

const delay = (ms) => new Promise((resolve => setTimeout(resolve, ms)))

const Cart = ({items = [], removeBtnItem}) => {
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const {isCartOpen, openCart, setAddFavorites, setIsCartOpen} = React.useContext(AppContext);
    const {total, cartItems, setCartItems} = useCart();
    const [isLoading, setIsLoading] = React.useState(false);

    const orderDone = async () => {
        try {
            setIsLoading(true)
            await axios.post('https://6193fcc20b39a70017b156ae.mockapi.io/order',
                {items: cartItems})
            setCartItems([]);
            setAddFavorites([])

            setIsOrderComplete(true)
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://6193fcc20b39a70017b156ae.mockapi.io/cart/${item.cartID}`);
                await delay(1000)

            }

        } catch (err) {
            console.log(err);
            alert('Ошибка при создании заказа :(');

        }
        setIsLoading(false)


    }
    const closeCart = (event) => {
        const tag = event.target.classList.contains('overlay');
        if (tag) setIsCartOpen(false);
    }

    return (
        <div>
            <div className={` ${"overlay"} ${isCartOpen ? 'cartOpen' : ''}`} onClick={closeCart}>
                <div className="drawer">
                    <div className='cartHeader'>
                        <h2>Корзина</h2>
                        <button className='btnHeader' onClick={openCart}>
                            <img className='btnRemove' src="/img/btn-remove.svg" alt="remove"/>
                        </button>
                    </div>
                    {items.length > 0 ?
                        <>
                            <div className="item">
                                {
                                    items.map((item) => {

                                        return (<div className="cartItem" key={item.id}>
                                            <img className='mr-20' width={70} height={70} src={item.img} alt="sneaker"/>
                                            <div className='mr-20  ' key={item.id}>
                                                <p className='mb-5'>{item.name}</p>
                                                <b>{`${item.price} руб.`}</b>
                                            </div>
                                            <img onClick={() => {

                                                removeBtnItem(item.id, item.cartID)
                                            }} className='btnRemove'
                                                 src="/img/btn-remove.svg" alt="remove"/>
                                        </div>)
                                    })}

                            </div>
                            <div className='cartTotalBlock'>
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{total + 'руб.'} </b>
                                    </li>
                                    <li>
                                        <span>Налог:</span>
                                        <div></div>
                                        <b>{Math.round(total * 0.05) + 'руб.'}</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={orderDone} className='greenButton'>Оформить
                                    заказ <img
                                        src="/img/arrow.svg" alt="arrow"/>
                                </button>
                            </div>
                        </>
                        : <Info img={isOrderComplete ? '/img/complete-order.jpg' : "/img/empty-cart.jpg"}
                                title={isOrderComplete ? `Заказ Оформлен` : 'Корзина Пустая'
                                }
                                description={isOrderComplete ? `Ваш заказ #18 передан в курьерскую доставку` : 'Вы не добавили ни одного товара'
                                }
                        />
                    }
                </div>
            </div>
        </div>

    )
}
export default Cart;

