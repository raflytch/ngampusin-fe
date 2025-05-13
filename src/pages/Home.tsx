import { JSX } from "react";

const Home = (): JSX.Element => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      <p>This is the home page of our application.</p>
    </div>
  );
};

export default Home;
