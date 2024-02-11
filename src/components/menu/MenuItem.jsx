import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers.js";
import { addItem, getCurrentQtyById } from "../../store/slices/cart.slice.js";
import Button from '../Button.jsx';
import DeleteItem from "../cart/DeleteItem.jsx";
import UpdateItemQty from "../cart/UpdateItemQty.jsx";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQtyById(id));
  const isInCart = currentQuantity > 0;

  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    }

    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-2">
      <img className={`h-24 ${soldOut ? "opacity-40 grayscale" : ""}`} src={imageUrl} alt={name} />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium ">{name}</p>
        <p className="text-sm italic capitalize text-stone-500">{ingredients.join(', ')}</p>
        <div className="flex items-center justify-between mt-auto">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">Sold out</p>
          )}
          {isInCart &&
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQty pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          }
          {!soldOut && !isInCart && <Button type="small" onClick={handleAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
