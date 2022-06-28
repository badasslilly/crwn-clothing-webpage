import './checkout-item.styles.scss'
import { useDispatch, useSelector } from 'react-redux'

import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart
} from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'




const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem

const dispatch = useDispatch()
const cartItems = useSelector(selectCartItems)

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'> {name} </span>
      <span className='quantity'>
        <button className='arrow' onClick={removeItemHandler}>-</button>
      {quantity} 
        <button className='arrow' onClick={addItemHandler}>+</button>
      </span>
      <span className='price'> {price} </span>
      <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>

    </div>
  )
}

export default CheckoutItem