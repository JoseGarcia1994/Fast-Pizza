import { useSelector } from "react-redux";
import CreateUser from "../components/user/CreateUser.jsx";
import Button from '../components/Button.jsx';

const Home = () => {
  const username = useSelector(state => state.user.username);
  
  return (
    <div className="px-4 my-10 text-center sm:my-16">
      <h1 className="mb-8 font-semibold tex8t-xl md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {
        username === "" ? <CreateUser /> : <Button to="/menu" type="primary">Continue ordering, {username}</Button>
      }
      
    </div>
  );
};

export default Home;