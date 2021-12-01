import React from "react";

import Loader from "./Loader";
import AppContext from "./Context";

const Card = ({
                  isLoading, img, name, price, onplus, id, addToFavorite,

              }) => {

    const {isItemInCart} = React.useContext(AppContext)
    const {isOnFavorite} = React.useContext(AppContext)




    const addToFavorites = () => {
        addToFavorite({img, name, price, id});
    }

    const onclickPlus = () => {
        onplus({img, name, price, id})
    }
    return (
        <>
            {isLoading ? <Loader/> :
                <div className="card">
                    {addToFavorite && <div className='favorite' onClick={addToFavorites}>
                        {
                            isOnFavorite(id) ? <img src="/img/liked.svg" alt="liked"/> : <img src="/img/unliked.svg" alt="unliked"/>
                        }
                    </div>}
                    <div className='itemsCenter'>
                        <img height={112} width={133} src={img} alt="sneakers"/>
                    </div>
                    <h5 className='itemsCenter'>{name}</h5>
                    <div className='containerCard'>
                        <div className='innerCard'>
                            <span>Цена:</span>
                            <b>{price}</b>
                        </div>
                        {addToFavorite && <button className='button itemsCenter'>
                            {isItemInCart(id)?
                                <img onClick={onclickPlus} height={32} width={32} src="/img/btn-checked.svg" alt="button"/>
                                : <img onClick={onclickPlus} height={32} width={32} src="/img/btn-plus.svg" alt="button"/>}
                        </button>}

                    </div>
                </div>
            }



        </>
    )
}
export default Card;