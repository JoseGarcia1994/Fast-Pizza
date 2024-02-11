import { useDispatch } from "react-redux";
import Button from "../Button.jsx";
import { deleteItem } from "../../store/slices/cart.slice.js";

const DeleteItem = ({pizzaId}) => {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>Remove</Button>
  );
};

export default DeleteItem;