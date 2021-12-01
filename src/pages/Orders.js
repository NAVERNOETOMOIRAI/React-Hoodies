import React from "react";
import Card from "../components/Card";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {

           (async () => {
               try {
                   const {data} = await axios.get('https://6193fcc20b39a70017b156ae.mockapi.io/order');
                   setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));

               }catch (err){
            alert('Что-то пошло не так при отображении заказов');
            console.log(err);
        }
           })()

        setIsLoading(false)

    }, [])
    const renderOrders =() => {

        return (isLoading ? [...Array(8)] : orders).map((item, index) =><Card
            key = {index}
            isLoading={isLoading}


            {...item} />)


    }

    return (
        <div>
            <div className="content">
                <h1>Мои Покупки</h1>

            </div>
            <div className="indexCard">
                {
                   renderOrders()
                }
            </div>
        </div>
    )

}
export default Orders;