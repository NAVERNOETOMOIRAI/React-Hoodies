import React from "react";
import AppContext from "./Context";
const Info = ({description,img,title}) => {
    const {openCart} =React.useContext(AppContext);
    return(

        <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
        <img className='mb-20' width='120px'  src={img} alt='empty'/>
        <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={openCart} className='greenButton'>
                <img src="/img/arrow.svg" alt="Arrow"/>
                Вернуться назад
            </button>
        </div>
    )
}
export default Info