import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from './components/AppLayout.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Cart from "./pages/Cart.jsx";
import CreateOrder from './pages/CreateOrder.jsx';
import Order from "./pages/Order.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
      { path: "/cart", element: <Cart />, },
      { path: './order/new', element: <CreateOrder /> },
      { path: './order/orderId', element: <Order /> }
    ]
  },

])

const App = () => {
  return <RouterProvider router={router} />
};

export default App;
