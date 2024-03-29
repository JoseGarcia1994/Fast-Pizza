import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from './components/AppLayout.jsx';
import Error from './components/Error.jsx';
import Home from './pages/Home.jsx';
import Menu, {loader as menuLoader} from './pages/Menu.jsx';
import Cart from "./pages/Cart.jsx";
import CreateOrder, {action as createOrderAction} from './pages/CreateOrder.jsx';
import Order, {loader as orderLoader} from "./pages/Order.jsx";
import {action as updateOrderAction} from './components/order/UpdateOrder.jsx';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu />, errorElement: <Error />, loader: menuLoader },
      { path: "/cart", element: <Cart />, },
      { path: '/order/new', element: <CreateOrder />, action: createOrderAction },
      { 
        path: '/order/:orderId', 
        element: <Order />, 
        loader: orderLoader, 
        errorElement: <Error />,
        action: updateOrderAction
      }
    ]
  },

])

const App = () => {
  return <RouterProvider router={router} />
};

export default App;
