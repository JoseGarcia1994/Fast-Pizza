import { getCurrentQtyById } from '../../store/slices/cart.slice.js';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers.js';
import DeleteItem from './DeleteItem.jsx';
import UpdateItemQty from './UpdateItemQty.jsx';

const CartItem = ({ item }) => {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQtyById(pizzaId));

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        
        <UpdateItemQty pizzaId={pizzaId} currentQuantity={currentQuantity}/>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
};

export default CartItem;

