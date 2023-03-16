import { useEffect, useState } from 'react'
import { userRequest } from '../../../requestMethods'
import './widgetLarge.css'
import {format} from 'timeago.js'

const WidgetLarge = () => {
  const [orders, setOrders] = useState([])
  
  useEffect(()=>{
    const getOrders = async ()=>{
      const res = await userRequest.get('/orders')
      setOrders(res.data)
    }
    getOrders()
  }, [])
  const Button = ({type}) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widhgetLgTh">Customer</th>
          <th className="widhgetLgTh">Date</th>
          <th className="widhgetLgTh">Amount</th>
          <th className="widhgetLgTh">Status</th>
        </tr>
        {
          orders.map(order=> (
            <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <img src="images/noAvatar.png" alt="" className="widgetLgImg" />
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td> 
            <td className="widgetLgAmount">$ {order.amount}</td> 
            <td className="widgetLgStatus">
              <Button type={order.status}/>
            </td> 
          </tr>
          ))
        }
      </table>
    </div>
  )
}

export default WidgetLarge