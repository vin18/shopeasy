import heroImage from '../assets/home-hero.jpg';
import { useNavigate } from 'react-router-dom';
import RightArrow from '../components/icons/RightArrow';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center pt-32">
      <div className="w-100 md:w-2/3 md:mr-32">
        <h1 className="text-3xl md:text-6xl text-gray-900 mb-4">
          Shop your favorite products easily
        </h1>
        <p className="text-lg text-gray-500">
          ShopEasy - The one stop Shopping Destination. E-commerce is
          revolutionizing the way we all shop in India. Checkout latest
          products, happy shopping!
        </p>

        <button
          className={`mt-4 flex items-center bg-blue-500 text-indigo-100 py-2 px-4 shadow-md rounded text-lg tracking-wide hover:opacity-90`}
          onClick={() => navigate('/products')}
        >
          <span className="mr-2">Buy Products</span> <RightArrow />
        </button>
      </div>
      <div className="hidden md:block w-3/5">
        <img src={heroImage} alt="home" />
      </div>
    </div>
  );
};

export default StartPage;
