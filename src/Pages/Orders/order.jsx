import React from 'react'
import './order.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { status } from 'init'

const order = ({ url }) => {

  const [order, setOrder] = useState([])

  const fetchAllOrder = async (req, res) => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.data) {
      setOrder(response.data.data)
      console.log(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const orderStatus = async (event,orderId)=>{
  const response = await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value 
  })
  if (response.data.success) {
    await fetchAllOrder()
  }
  }

  useEffect(() => {
    fetchAllOrder()
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" srcset="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "  x  " + item.quantity
                  } else {
                    return item.name + "  x  " + item.quantity + ","
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName+"  "+ order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipCode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items :  {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>{orderStatus(event,order._id)}} value={order.status}>
              <option value="Food Proccessing">Food Proccessing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default order