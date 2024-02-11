import LinkButton from '../components/LinkButton.jsx';
import Button from  '../components/Button.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import EmptyCart from '../components/cart/EmptyCart.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { getCart, clearCart } from '../store/slices/cart.slice.js';

const Cart = () => {
  const username = useSelector(state => state.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if(!cart.length) return <EmptyCart />
  
  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu"> 
        &larr; Back to menu
      </LinkButton>

      <h2 className='text-xl font-semibold capitalize mt-7'>Your cart, {username}</h2>
      
      <ul className='mt-3 border-b divide-y divide-stone-200'>
        {cart.map(item => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button type="primary" to="/order/new">Order Pizzas</Button>

        <Button type="secondary" onClick={handleClearCart}>Cleart Cart</Button>
      </div>
    </div>
  );
};

export default Cart;
