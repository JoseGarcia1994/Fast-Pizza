import { useLoaderData } from "react-router-dom";
import { getMenu } from "../services/apiRestaurant.js";
import  MenuItem from "../components/menu/MenuItem.jsx";

const Menu = () => {
  const menu = useLoaderData();
  return (
    <ul>
      {
        menu.map(pizza => (
          <MenuItem key={pizza.id} pizza={pizza}/> 
        ))
      }
    </ul>
  );
};

export const loader = async () => {
  const menu = await getMenu();
  return menu;
}

export default Menu;
