import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import CartOverview from './cart/CartOverview.jsx';

const AppLayout = () => {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
};

export default AppLayout;