import React from "react";
import Card from "../components/Card";
import AppContext from "../components/Context";

const Favorites = ({addToFavorite}) => {
    const {addFavorites} = React.useContext(AppContext);

    return (
        <div>
            <div className="content">
                <h1>Мои Закладки</h1>

            </div>
            <div className="indexCard">
                {
                    addFavorites.map((item, index) => <Card name={item.name}
                                                     img={item.img}
                                                     price={item.price}
                                                     key={index}
                                                     id={item.id}
                                                     addToFavorite={addToFavorite}
                                                     favID = {item.favID}

                    />
                    )
                }
            </div>
        </div>
    )

}
export default Favorites;