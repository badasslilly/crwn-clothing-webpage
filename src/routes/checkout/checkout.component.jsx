import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import './checkout.styles.scss'



const Checkout = () => {
const cartItems = useSelector(selectCartItems)
const cartTotal = useSelector(selectCartTotal)

return (
  <div className='checkout-container'>
    <div className='checkout-header'>
      <div header-block>
        <span>Product</span>
      </div>
      <div header-block>
        <span>Description</span>
      </div>
      <div header-block>
        <span>Quantity</span>
      </div>
      <div header-block>
        <span>Price</span>
      </div>
      <div header-block>
        <span>Remove</span>
      </div>
    </div>
      {cartItems.map((cartItem) => { 

          return (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          )
        })
      }
      <span className='total'>Total: ${cartTotal}</span>
  </div>
)
}

export default Checkout