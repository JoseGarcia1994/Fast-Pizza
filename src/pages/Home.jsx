import CreateUser from "../components/user/CreateUser.jsx";

const Home = () => {
  return (
    <div className="px-4 my-10 text-center sm:my-16">
      <h1 className="mb-8 font-semibold tex8t-xl md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
};

export default Home;