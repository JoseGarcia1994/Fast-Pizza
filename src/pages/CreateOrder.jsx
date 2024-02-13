import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant.js";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../store/slices/cart.slice.js";
import { formatCurrency } from '../utils/helpers.js';
import { useState } from "react";
import Button from "../components/Button.jsx";
import EmptyCart from '../components/cart/EmptyCart.jsx';
import store from '../store';
import { fetchAddress } from "../store/slices/user.slice.js";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const CreateOrder = () => {
  const [withPriority, setWithPriority] = useState(false);
  
  const username = useSelector(state => state.user.username);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice

  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <button onClick={() => dispatch(fetchAddress())}>Get Position</button>
      <Form method="POST">
        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">
            First Name
          </label>
          <input 
            type="text" 
            name="customer" 
            className="input grow"
            defaultValue={username}
            required 
          />
        </div>

        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input 
              type="tel" 
              name="phone" 
              className="w-full input" 
              required 
            />
            {formErrors?.phone && <p className="p-2 mt-2 text-xs text-red-700 bg-red-100 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-5 sm:flex-row sm:items-center">
          <label className="sm:basis-40">
            Address
          </label>
          <div className="grow">
            <input 
              type="text" 
              name="address" 
              className="w-full input" 
              required 
            />
          </div>
        </div>

        <div className="flex items-center gap-5 mb-12">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-6 h-6 accent-yellow-400 focus:outline-none focus:ring-yellow-400 focus:ring focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? 'Placing order...' : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const action = async ({request}) => {
  //Reading data from form
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  
  // Handaling errors
  const errors = {}
  if (!isValidPhone(order.phone)) errors.phone = 'Please give us your correct phone.'
  if (Object.keys(errors).length > 0) return errors;

  // if everything is correct create order & redirect user
  const newOrder = await createOrder(order);

  // Do not overuse
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

//yz6zxx
