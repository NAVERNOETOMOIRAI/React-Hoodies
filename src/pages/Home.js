import Card from "../components/Card";
import React, {useState} from "react";


const Home = ({ items, addToCart, removeItemCart, addToFavorite,isLoading}) => {
    const [searchInput, setSearchInput] = React.useState('');
    const [inputDown, setInputDown] = useState(false);
    const [inputUp, setInputUp] = useState(false);





    const changeInput = (event) => {
        setSearchInput(event.target.value);
    }

    const deleteInput = () => {
        setSearchInput('')
    }

    const checkboxInputDown = () => {
        if (inputUp) {
            setInputUp(!inputUp)
        }

        setInputDown(!inputDown);

    }

    const checkboxInputUp = () => {
        if (inputDown) {
            setInputDown(!inputDown)
        }
        setInputUp(!inputUp);

    }
    const changeItemCheckbox = (a, b) => {

        if (inputDown) {
            return +(b.price.split(" ").join("")) - +(a.price.split(" ").join(""))
        } else if (inputUp) {
            return +(a.price.split(" ").join("")) - +(b.price.split(" ").join(""))
        }
    }
    const changeItem = (item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase())
    }
    const renderItems =() => {
        const filtredItems = items.filter(item => changeItem(item)).sort(changeItemCheckbox);

        return (isLoading ? [...Array(12)] : filtredItems).map((item, index) =><Card
            key = {index}
            onplus={addToCart}
            removeItemCart={removeItemCart}
            addToFavorite={addToFavorite}
            isLoading={isLoading}
            {...item} />)


    }
    return (
        <div>

            <div className="content">
                <h1>{searchInput.trim() ? `Поиск по запросу: ${searchInput}` : 'Все толстовки'}</h1>
                <div className='search-block'>
                    {
                        <div className="checkbox-first mr-20">
                            <label htmlFor="checkbox-one" className="checkbox-first__label">
                                <input id="checkbox-one" type="checkbox" className="checkbox-first__input"
                                       checked={inputUp} onChange={checkboxInputUp}/>
                                <div className="checkbox">
                                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                                        <path
                                            d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                                        <polyline points="4 11 8 15 16 6"></polyline>
                                    </svg>
                                </div>
                                <span>По возростанию</span>
                            </label>
                        </div>
                    }
                    <div className="checkbox-first mr-20">
                        <label htmlFor="checkbox-two" className="checkbox-first__label" onChange={checkboxInputDown}>
                            <input id="checkbox-two" type="checkbox" className="checkbox-first__input"
                                   checked={inputDown} onChange={checkboxInputDown}/>
                            <div className="checkbox">
                                <svg width="20px" height="20px" viewBox="0 0 20 20">
                                    <path
                                        d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                                    <polyline points="4 11 8 15 16 6"></polyline>
                                </svg>
                            </div>
                            <span>По убыванию</span>
                        </label>
                    </div>
                    <img height={13} width={13} src="/img/search.svg" alt="search"/>
                    <input onChange={changeInput} value={searchInput} placeholder='Поиск...'/>
                    {searchInput && <div onClick={deleteInput} className='btnRemove'>
                        <img className='inputDelete' src="/img/btn-remove.svg" alt="remove"/>
                    </div>}


                </div>
            </div>
            <div className="indexCard">
                {

                    renderItems()
                }
            </div>
        </div>
    )
}
export default Home;