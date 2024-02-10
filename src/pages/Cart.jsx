import { Link } from 'react-router-dom';
import LinkButton from '../components/LinkButton.jsx';
import Button from  '../components/Button.jsx';
import CartItem from '../components/cart/CartItem.jsx';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

const Cart = () => {
  const cart = fakeCart
  
  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu"> 
        &larr; Back to menu
      </LinkButton>

      <h2 className='text-xl font-semibold mt-7'>Your cart, %NAME%</h2>
      
      <ul className='mt-3 border-b divide-y divide-stone-200'>
        {cart.map(item => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button type="primary" to="/order/new">Order Pizzas</Button>

        <Button type="secondary">Cleart Cart</Button>
      </div>
    </div>
  );
};

export default Cart;
