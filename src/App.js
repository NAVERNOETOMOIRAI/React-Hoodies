import React, {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import Home from "./pages/Home";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import AppContext from "./components/Context";
import Orders from "./pages/Orders";
import Cart from "./components/Cart";


function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [addFavorites, setAddFavorites] = React.useState([]);
    const [isLoading,setIsLoading] = React.useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);



    React.useEffect(() => {
        async function fetchData() {

            try {
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('https://6193fcc20b39a70017b156ae.mockapi.io/cart'),
                    axios.get('https://6193fcc20b39a70017b156ae.mockapi.io/favorites'),
                    axios.get('https://6193fcc20b39a70017b156ae.mockapi.io/items'),
                ]);

                setIsLoading(false);

                setCartItems(cartResponse.data);
                setAddFavorites(favoritesResponse.data);
                setItems(itemsResponse.data)

            } catch (error) {
                alert('Ошибка при запросе данных ;(');
                console.log(error);
            }
        }

        fetchData();

    }, []);
    const openCart = () => {
        setIsCartOpen(!isCartOpen);
    };


    const addToCart = async (obj) => {

        if (cartItems.some((item) => Number(item.id) === Number(obj.id))) {
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
            axios.delete(`https://6193fcc20b39a70017b156ae.mockapi.io/cart/${(cartItems.find((item) => Number(item.id) === Number(obj.id))).cartID}`)

        } else {
            const {data} = await axios.post('https://6193fcc20b39a70017b156ae.mockapi.io/cart', obj)
            setCartItems(prev => [...prev, data])
        }
    }


    const removeItemCart = (id, cartID) => {
        try{
            axios.delete(`https://6193fcc20b39a70017b156ae.mockapi.io/cart/${cartID}`);
            setCartItems((prev) => prev.filter((item) => item.id !== id))
        }catch (err){
            alert('Ошибка при удалении из Корзины :(')
        }

    }
    const addToFavorite = async (obj) => {

        try {
            if (addFavorites.some((favobj) => favobj.id === obj.id)) {
                axios.delete(`https://6193fcc20b39a70017b156ae.mockapi.io/favorites/${(addFavorites.find((favobj) => favobj.id === obj.id)).favID}`);
                setAddFavorites((prev) => prev.filter((item) => item.id !== obj.id))
            } else {
                const {data} = await axios.post('https://6193fcc20b39a70017b156ae.mockapi.io/favorites', obj)
                setAddFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Ну удалось добавить в фавориты')
        }
    }
    const isItemInCart = (id) => {
        return cartItems.some(item => Number(item.id) === Number(id))
    }
    const isOnFavorite = (id) => {
        return addFavorites.some(item => Number(item.id) === Number(id))
    }


    return (
        <AppContext.Provider value={{isCartOpen,openCart,addFavorites,isItemInCart,isOnFavorite,cartItems,setCartItems,setAddFavorites,setIsCartOpen}}>
        <BrowserRouter>
            <div className='wrapper'>
                <Cart items={cartItems} removeBtnItem={removeItemCart}/>
                <Header/>
                <Routes>
                    <Route exact path='/' element={<Home items={items} cartItems={cartItems}
                                                         addToCart={addToCart}
                                                         removeItemCart={removeItemCart}
                                                         addToFavorite={addToFavorite}
                                                         isLoading={isLoading}
                                                         />
                    }/>


                    <Route exact path='favorites'
                           element={<Favorites addToFavorite={addToFavorite}/>}/>
                    <Route exact path='orders'
                           element={<Orders/>}/>

                </Routes>

            </div>
        </BrowserRouter>
        </AppContext.Provider>
    )
        ;
}

export default App;
